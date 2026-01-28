// Check available sheets in the spreadsheet
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
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        process.env[key] = value;
      }
    }
  });
}

async function checkSheets() {
  try {
    const { google } = require('googleapis');
    
    const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS);
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    
    const sheets = google.sheets({ version: 'v4', auth });
    
    console.log('\n=== Checking Spreadsheet ===\n');
    console.log('Spreadsheet ID:', process.env.GOOGLE_SHEETS_ID);
    
    const response = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    });
    
    console.log('\n✅ Spreadsheet Title:', response.data.properties.title);
    console.log('\nAvailable sheets:');
    response.data.sheets.forEach((sheet, index) => {
      console.log(`  ${index + 1}. "${sheet.properties.title}"`);
    });
    
    console.log('\nCurrent GOOGLE_SHEETS_NAME in .env:', process.env.GOOGLE_SHEETS_NAME);
    
    const sheetNames = response.data.sheets.map(s => s.properties.title);
    if (!sheetNames.includes(process.env.GOOGLE_SHEETS_NAME)) {
      console.log('\n❌ ERROR: Sheet "' + process.env.GOOGLE_SHEETS_NAME + '" not found!');
      console.log('\nTo fix this, either:');
      console.log('1. Update GOOGLE_SHEETS_NAME in .env to match one of the available sheets above');
      console.log('2. Or create a new sheet named "' + process.env.GOOGLE_SHEETS_NAME + '" in your Google Spreadsheet');
      console.log('\nSuggested fix:');
      console.log('GOOGLE_SHEETS_NAME=' + sheetNames[0]);
    } else {
      console.log('\n✅ Sheet "' + process.env.GOOGLE_SHEETS_NAME + '" found!');
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Details:', error.response.data);
    }
  }
}

checkSheets();
