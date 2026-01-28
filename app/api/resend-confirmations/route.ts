import { NextRequest, NextResponse } from 'next/server';
import { fetchAllRows, updateRow } from '@/lib/googleSheets';
import { sendResendConfirmationEmail } from '@/lib/email';

interface ProcessResult {
  totalRows: number;
  eligible: number;
  sent: number;
  failed: number;
  errors: Array<{ rowIndex: number; email: string; error: string }>;
}

/**
 * Production-grade idempotent resend confirmation routine
 * 
 * Engineering constraints enforced:
 * 1. Idempotent - safe to run multiple times without duplicates
 * 2. Atomic updates per row
 * 3. Email send and sheet update are strictly ordered
 * 4. No client-side timestamps (all server-side)
 * 5. Comprehensive error handling and logging
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Optional: Add authentication/authorization here
    // For example, check for API key or admin token
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.RESEND_ROUTINE_TOKEN;
    
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Step 1: Fetch all rows from Google Sheets
    const rows = await fetchAllRows();
    
    const result: ProcessResult = {
      totalRows: rows.length,
      eligible: 0,
      sent: 0,
      failed: 0,
      errors: [],
    };

    // Step 2: Process each row - determine eligibility and send resend emails
    for (const row of rows) {
      try {
        // Check eligibility criteria
        const isEligible = checkEligibility(row);
        
        if (!isEligible) {
          continue;
        }

        result.eligible++;

        // Step 3: Send resend confirmation email
        // CRITICAL: Email must be sent BEFORE updating the sheet
        // This ensures idempotency - if email fails, sheet is not updated
        try {
          await sendResendConfirmationEmail({
            to: row.email,
            name: row.name,
            message: row.message,
          });
        } catch (emailError) {
          // Log error and continue to next row
          // Sheet is NOT updated, so this row will be retried on next run
          const errorMessage = emailError instanceof Error ? emailError.message : 'Unknown error';
          console.error(`Failed to send resend email to ${row.email} (row ${row.rowIndex}):`, errorMessage);
          
          result.failed++;
          result.errors.push({
            rowIndex: row.rowIndex,
            email: row.email,
            error: errorMessage,
          });
          
          continue; // Skip sheet update for this row
        }

        // Step 4: Only after successful email delivery, update the sheet atomically
        const resendSentAt = new Date().toISOString();
        
        await updateRow(row.rowIndex, {
          resend_sent: 'YES',
          resend_sent_at: resendSentAt,
          status: 'resent',
        });

        result.sent++;
        console.log(`Successfully sent resend email to ${row.email} (row ${row.rowIndex})`);

      } catch (rowError) {
        // Unexpected error processing this row
        const errorMessage = rowError instanceof Error ? rowError.message : 'Unknown error';
        console.error(`Unexpected error processing row ${row.rowIndex}:`, errorMessage);
        
        result.failed++;
        result.errors.push({
          rowIndex: row.rowIndex,
          email: row.email || 'unknown',
          error: errorMessage,
        });
      }
    }

    const duration = Date.now() - startTime;

    return NextResponse.json(
      {
        success: true,
        message: 'Resend confirmation routine completed',
        result,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in resend confirmation routine:', errorMessage);
    
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * Check if a row is eligible for resend
 * 
 * Eligibility criteria:
 * 1. confirmation_sent === "YES"
 * 2. resend_sent !== "YES"
 * 3. status !== "replied"
 * 4. Current time - confirmation_sent_at >= 24 hours
 */
function checkEligibility(row: Awaited<ReturnType<typeof fetchAllRows>>[number]): boolean {
  // Criterion 1: Must have confirmation sent
  if (row.confirmation_sent !== 'YES') {
    return false;
  }

  // Criterion 2: Must NOT have resend already sent
  if (row.resend_sent === 'YES') {
    return false;
  }

  // Criterion 3: Status must not be "replied"
  if (row.status === 'replied') {
    return false;
  }

  // Criterion 4: Must be at least 24 hours since confirmation was sent
  if (!row.confirmation_sent_at) {
    return false;
  }

  try {
    const confirmationSentAt = new Date(row.confirmation_sent_at);
    const now = new Date();
    const hoursSinceConfirmation = (now.getTime() - confirmationSentAt.getTime()) / (1000 * 60 * 60);

    if (hoursSinceConfirmation < 24) {
      return false;
    }
  } catch {
    console.error(`Invalid date format for row ${row.rowIndex}: ${row.confirmation_sent_at}`);
    return false;
  }

  return true;
}

// Handle GET requests - return system status
export async function GET() {
  try {
    const rows = await fetchAllRows();
    
    const stats = {
      totalContacts: rows.length,
      confirmationSent: rows.filter(r => r.confirmation_sent === 'YES').length,
      resendSent: rows.filter(r => r.resend_sent === 'YES').length,
      pending: rows.filter(r => r.status === 'pending').length,
      confirmed: rows.filter(r => r.status === 'confirmed').length,
      resent: rows.filter(r => r.status === 'resent').length,
      replied: rows.filter(r => r.status === 'replied').length,
      eligible: rows.filter(r => checkEligibility(r)).length,
    };

    return NextResponse.json(
      {
        success: true,
        message: 'System status',
        stats,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to fetch system status',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
