import { google } from 'googleapis';

// Define the shape of our contact form data
export interface ContactRow {
  email: string;
  name: string;
  message: string;
  submitted_at: string;
  confirmation_sent: 'YES' | 'NO' | '';
  confirmation_sent_at: string;
  resend_sent: 'YES' | 'NO' | '';
  resend_sent_at: string;
  status: 'pending' | 'confirmed' | 'resent' | 'replied' | '';
}

// Initialize Google Sheets API client
function getAuthClient() {
  // Support both service account JSON string and individual credentials
  const credentials = process.env.GOOGLE_SHEETS_CREDENTIALS 
    ? JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS)
    : {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      };

  return new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

function getSheets() {
  const auth = getAuthClient();
  return google.sheets({ version: 'v4', auth });
}

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
const SHEET_NAME = process.env.GOOGLE_SHEETS_NAME || 'ContactForm';

/**
 * Fetch all rows from Google Sheets
 * @returns Array of contact rows with their row indices (1-based, including header)
 */
export async function fetchAllRows(): Promise<Array<ContactRow & { rowIndex: number }>> {
  if (!SPREADSHEET_ID) {
    throw new Error('GOOGLE_SHEETS_ID environment variable is not set');
  }

  const sheets = getSheets();
  
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:I`, // email, name, message, submitted_at, confirmation_sent, confirmation_sent_at, resend_sent, resend_sent_at, status
    });

    const rows = response.data.values || [];
    
    // Skip header row (index 0)
    if (rows.length <= 1) {
      return [];
    }

    return rows.slice(1).map((row, index) => ({
      email: row[0] || '',
      name: row[1] || '',
      message: row[2] || '',
      submitted_at: row[3] || '',
      confirmation_sent: (row[4] as 'YES' | 'NO') || '',
      confirmation_sent_at: row[5] || '',
      resend_sent: (row[6] as 'YES' | 'NO') || '',
      resend_sent_at: row[7] || '',
      status: (row[8] as ContactRow['status']) || '',
      rowIndex: index + 2, // +2 because: +1 for header, +1 for 1-based indexing
    }));
  } catch (error) {
    console.error('Error fetching rows from Google Sheets:', error);
    throw new Error('Failed to fetch data from Google Sheets');
  }
}

/**
 * Append a new contact submission to Google Sheets
 * @param data Contact form data
 * @returns Row index of the newly added row
 */
export async function appendRow(data: Omit<ContactRow, 'rowIndex'>): Promise<number> {
  if (!SPREADSHEET_ID) {
    throw new Error('GOOGLE_SHEETS_ID environment variable is not set');
  }

  const sheets = getSheets();
  
  try {
    const values = [
      [
        data.email,
        data.name,
        data.message,
        data.submitted_at,
        data.confirmation_sent,
        data.confirmation_sent_at,
        data.resend_sent,
        data.resend_sent_at,
        data.status,
      ]
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:I`,
      valueInputOption: 'RAW',
      requestBody: { values },
    });

    // Extract row number from the update range (e.g., "Sheet1!A2:I2" -> 2)
    const updatedRange = response.data.updates?.updatedRange || '';
    const match = updatedRange.match(/!A(\d+)/);
    const rowIndex = match ? parseInt(match[1], 10) : -1;

    return rowIndex;
  } catch (error) {
    console.error('Error appending row to Google Sheets:', error);
    throw new Error('Failed to append data to Google Sheets');
  }
}

/**
 * Update a specific row atomically
 * Only updates the specified fields, leaves others unchanged
 * @param rowIndex 1-based row index (including header row)
 * @param updates Partial row data to update
 */
export async function updateRow(
  rowIndex: number,
  updates: Partial<ContactRow>
): Promise<void> {
  if (!SPREADSHEET_ID) {
    throw new Error('GOOGLE_SHEETS_ID environment variable is not set');
  }

  const sheets = getSheets();
  
  try {
    // Fetch current row to preserve existing values
    const currentRowResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A${rowIndex}:I${rowIndex}`,
    });

    const currentRow = currentRowResponse.data.values?.[0] || [];
    
    // Merge updates with existing values
    const updatedRow = [
      updates.email ?? currentRow[0] ?? '',
      updates.name ?? currentRow[1] ?? '',
      updates.message ?? currentRow[2] ?? '',
      updates.submitted_at ?? currentRow[3] ?? '',
      updates.confirmation_sent ?? currentRow[4] ?? '',
      updates.confirmation_sent_at ?? currentRow[5] ?? '',
      updates.resend_sent ?? currentRow[6] ?? '',
      updates.resend_sent_at ?? currentRow[7] ?? '',
      updates.status ?? currentRow[8] ?? '',
    ];

    // Update the row atomically
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A${rowIndex}:I${rowIndex}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [updatedRow],
      },
    });
  } catch (error) {
    console.error(`Error updating row ${rowIndex} in Google Sheets:`, error);
    throw new Error(`Failed to update row ${rowIndex} in Google Sheets`);
  }
}

/**
 * Initialize the Google Sheet with headers if it doesn't exist
 * Safe to call multiple times - will not overwrite existing data
 */
export async function initializeSheet(): Promise<void> {
  if (!SPREADSHEET_ID) {
    throw new Error('GOOGLE_SHEETS_ID environment variable is not set');
  }

  const sheets = getSheets();
  
  try {
    // Check if sheet exists and has headers
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1:I1`,
    });

    const hasHeaders = response.data.values && response.data.values.length > 0;
    
    if (!hasHeaders) {
      // Add headers
      const headers = [
        'email',
        'name',
        'message',
        'submitted_at',
        'confirmation_sent',
        'confirmation_sent_at',
        'resend_sent',
        'resend_sent_at',
        'status'
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1:I1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [headers],
        },
      });

      console.log('Sheet initialized with headers');
    }
  } catch (error) {
    console.error('Error initializing sheet:', error);
    throw new Error('Failed to initialize Google Sheet');
  }
}
