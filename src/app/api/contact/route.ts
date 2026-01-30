import { NextRequest, NextResponse } from 'next/server';
import { appendRow, initializeSheet } from '@/lib/googleSheets';
import { sendConfirmationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Ensure sheet is initialized
    await initializeSheet();

    // Get current timestamp (server-side)
    const submittedAt = new Date().toISOString();

    // Step 1: Send confirmation email first (before updating sheet)
    // This ensures we don't mark as sent if email fails
    try {
      await sendConfirmationEmail({
        to: email,
        name,
        message,
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      
      // Still save to sheet even if email fails, but mark as not sent
      const rowData = {
        email,
        name,
        message,
        submitted_at: submittedAt,
        confirmation_sent: 'NO' as const,
        confirmation_sent_at: '',
        resend_sent: '' as const,
        resend_sent_at: '',
        status: 'pending' as const,
      };

      await appendRow(rowData);

      return NextResponse.json(
        { 
          success: true,
          message: 'Form submitted but confirmation email failed. Our team will contact you directly.',
          emailSent: false,
        },
        { status: 200 }
      );
    }

    // Step 2: Only after successful email, save to Google Sheets with confirmation marked as sent
    const confirmationSentAt = new Date().toISOString();
    
    const rowData = {
      email,
      name,
      message,
      submitted_at: submittedAt,
      confirmation_sent: 'YES' as const,
      confirmation_sent_at: confirmationSentAt,
      resend_sent: '' as const,
      resend_sent_at: '',
      status: 'confirmed' as const,
    };

    const rowIndex = await appendRow(rowData);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! We have received your message and sent you a confirmation email.',
        emailSent: true,
        rowIndex,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return NextResponse.json(
      {
        error: 'Internal server error. Please try again later.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit the contact form.' },
    { status: 405 }
  );
}
