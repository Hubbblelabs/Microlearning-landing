// Test script to check Google Sheets and Resend connectivity
const fs = require('fs');
const path = require('path');

// Load .env file manually
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const match = trimmedLine.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        let value = match[2].trim();
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        process.env[key] = value;
      }
    }
  });
}

console.log('\n=== Environment Variables Check ===\n');

// Check Google Sheets configuration
console.log('Google Sheets Configuration:');
console.log('✓ GOOGLE_SHEETS_CREDENTIALS:', process.env.GOOGLE_SHEETS_CREDENTIALS ? 'SET (length: ' + process.env.GOOGLE_SHEETS_CREDENTIALS.length + ')' : '❌ NOT SET');
console.log('✓ GOOGLE_SHEETS_ID:', process.env.GOOGLE_SHEETS_ID || '❌ NOT SET');
console.log('✓ GOOGLE_SHEETS_NAME:', process.env.GOOGLE_SHEETS_NAME || '❌ NOT SET');

// Check Resend configuration
console.log('\nResend Configuration:');
console.log('✓ RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'SET (starts with: ' + process.env.RESEND_API_KEY.substring(0, 5) + '...)' : '❌ NOT SET');
console.log('✓ RESEND_FROM_EMAIL:', process.env.RESEND_FROM_EMAIL || '❌ NOT SET');

// Try to parse Google credentials
console.log('\n=== Testing Google Sheets Credentials ===\n');
try {
  const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS || '{}');
  console.log('✅ Credentials JSON is valid');
  console.log('   - type:', credentials.type);
  console.log('   - project_id:', credentials.project_id);
  console.log('   - client_email:', credentials.client_email);
  console.log('   - has private_key:', !!credentials.private_key);
} catch (error) {
  console.error('❌ Failed to parse credentials JSON:', error.message);
}

// Test Google Sheets API
console.log('\n=== Testing Google Sheets API ===\n');
async function testGoogleSheets() {
  try {
    const { google } = require('googleapis');
    
    const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS);
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    
    const sheets = google.sheets({ version: 'v4', auth });
    
    console.log('Attempting to read from sheet:', process.env.GOOGLE_SHEETS_ID);
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: `${process.env.GOOGLE_SHEETS_NAME}!A1:I1`,
    });
    
    console.log('✅ Successfully connected to Google Sheets!');
    console.log('   Headers:', response.data.values?.[0] || 'No headers found');
    
  } catch (error) {
    console.error('❌ Google Sheets API Error:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Details:', error.response.data);
    }
  }
}

// Test Resend API
console.log('\n=== Testing Resend API ===\n');
async function testResend() {
  try {
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    console.log('✅ Resend client initialized successfully');
    console.log('   API Key starts with:', process.env.RESEND_API_KEY.substring(0, 5));
    console.log('   From email:', process.env.RESEND_FROM_EMAIL);
    
    // Note: We're not actually sending an email here, just checking the setup
    console.log('\n⚠️  To test email sending, you need to manually trigger the contact form');
    
  } catch (error) {
    console.error('❌ Resend API Error:', error.message);
  }
}

// Run tests
(async () => {
  await testGoogleSheets();
  await testResend();
  console.log('\n=== Test Complete ===\n');
})();
