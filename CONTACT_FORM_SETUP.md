# Contact Form & Resend Email System - Setup Guide

This guide will help you set up the production-grade contact form system with Google Sheets integration and automated resend confirmation emails.

## Overview

The system provides:
- ✅ Contact form with Google Sheets as data store
- ✅ Automatic confirmation emails via Resend
- ✅ Automated resend emails after 24 hours
- ✅ Idempotent and atomic operations
- ✅ Production-grade error handling

## Prerequisites

1. **Google Cloud Project** with Google Sheets API enabled
2. **Resend Account** with API key
3. **Google Sheet** prepared for contact data

---

## Step 1: Set Up Google Sheets

### 1.1 Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Contact Form" or your preferred name
4. Copy the spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```

### 1.2 Set Up Column Headers (Optional)

The system will auto-initialize headers, but you can manually add them:

| email | name | message | submitted_at | confirmation_sent | confirmation_sent_at | resend_sent | resend_sent_at | status |
|-------|------|---------|--------------|-------------------|---------------------|-------------|----------------|--------|

### 1.3 Create Google Cloud Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable the **Google Sheets API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

4. Create a **Service Account**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Fill in the details and click "Create"
   - Skip optional steps and click "Done"

5. Create and Download **Service Account Key**:
   - Click on the created service account
   - Go to "Keys" tab
   - Click "Add Key" > "Create New Key"
   - Choose "JSON" format
   - Click "Create" (file will download)

6. **Share your Google Sheet** with the service account email:
   - Open your Google Sheet
   - Click "Share"
   - Paste the service account email (e.g., `your-service@your-project.iam.gserviceaccount.com`)
   - Give "Editor" permissions
   - Uncheck "Notify people"
   - Click "Share"

---

## Step 2: Set Up Resend

### 2.1 Create Resend Account

1. Go to [Resend](https://resend.com)
2. Sign up for an account
3. Verify your email

### 2.2 Add Your Domain

1. Go to "Domains" in Resend dashboard
2. Click "Add Domain"
3. Enter your domain (e.g., `micro-learning.app`)
4. Add the DNS records shown to your domain provider
5. Wait for verification (usually 1-5 minutes)

### 2.3 Get API Key

1. Go to "API Keys" in Resend dashboard
2. Click "Create API Key"
3. Give it a name (e.g., "Production")
4. Copy the API key (starts with `re_`)

---

## Step 3: Configure Environment Variables

### 3.1 Create `.env.local` File

Create a `.env.local` file in your project root:

```bash
# Copy from .env.example
cp .env.example .env.local
```

### 3.2 Add Google Sheets Configuration

**Option 1: Service Account JSON (Recommended)**

Open the downloaded JSON file and copy its entire contents into a single line:

```env
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"your-project","private_key_id":"xxx",...}
GOOGLE_SHEETS_ID=your_spreadsheet_id_from_url
GOOGLE_SHEETS_NAME=ContactForm
```

**Option 2: Individual Credentials (Alternative)**

```env
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_ID=your_spreadsheet_id_from_url
GOOGLE_SHEETS_NAME=ContactForm
```

**Important for Private Key:**
- Keep the quotes around the private key
- Ensure newlines are represented as `\n`
- If copying from JSON, the key should already have `\n` characters

### 3.3 Add Resend Configuration

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=hello@micro-learning.app
```

Replace `hello@micro-learning.app` with your verified domain email.

### 3.4 Add Security Token (Recommended)

Generate a secure random token for the resend endpoint:

```bash
# Generate a secure token (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))

# Or use this online: https://generate-random.org/api-token-generator
```

Add to `.env.local`:

```env
RESEND_ROUTINE_TOKEN=your_generated_secure_token_here
```

---

## Step 4: Test the System

### 4.1 Start Development Server

```bash
npm run dev
```

### 4.2 Test Contact Form

1. Navigate to `http://localhost:3000/#contact`
2. Fill out the form with:
   - Your name
   - Your email (use a real email you can check)
   - A test message
3. Click "Send Message"
4. Check for:
   - Success message in the UI
   - Confirmation email in your inbox
   - New row in your Google Sheet with `confirmation_sent=YES`

### 4.3 Test Resend Endpoint (Manual)

**Check System Status:**

```bash
curl http://localhost:3000/api/resend-confirmations
```

Response will show statistics about your contacts.

**Trigger Resend (for testing, before 24 hours):**

For testing purposes, you can temporarily modify the eligibility check in:
`app/api/resend-confirmations/route.ts`

Change line:
```typescript
if (hoursSinceConfirmation < 24) {
```

To:
```typescript
if (hoursSinceConfirmation < 0.01) { // ~36 seconds for testing
```

Then trigger:

```bash
# Without authentication
curl -X POST http://localhost:3000/api/resend-confirmations

# With authentication (if RESEND_ROUTINE_TOKEN is set)
curl -X POST http://localhost:3000/api/resend-confirmations \
  -H "Authorization: Bearer your_secure_random_token_here"
```

**Remember to revert the eligibility check after testing!**

---

## Step 5: Set Up Automated Resend (Production)

### 5.1 Using Vercel Cron Jobs (Recommended)

Create `vercel.json` in your project root:

```json
{
  "crons": [
    {
      "path": "/api/resend-confirmations",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

This runs every 6 hours: `0am, 6am, 12pm, 6pm`

Add authentication header in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/resend-confirmations",
      "schedule": "0 */6 * * *",
      "headers": {
        "Authorization": "Bearer your_secure_random_token_here"
      }
    }
  ]
}
```

### 5.2 Using GitHub Actions (Alternative)

Create `.github/workflows/resend-emails.yml`:

```yaml
name: Resend Confirmation Emails

on:
  schedule:
    # Run every 6 hours
    - cron: '0 */6 * * *'
  workflow_dispatch: # Allow manual trigger

jobs:
  resend:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Resend Endpoint
        run: |
          curl -X POST https://micro-learning.app/api/resend-confirmations \
            -H "Authorization: Bearer ${{ secrets.RESEND_ROUTINE_TOKEN }}"
```

Add `RESEND_ROUTINE_TOKEN` to your GitHub repository secrets.

### 5.3 Using External Cron Service (Alternative)

Use services like:
- [cron-job.org](https://cron-job.org)
- [EasyCron](https://www.easycron.com)
- [Cron-Jobs.io](https://cron-jobs.io)

Configure:
- **URL:** `https://micro-learning.app/api/resend-confirmations`
- **Method:** POST
- **Headers:** `Authorization: Bearer your_secure_random_token_here`
- **Schedule:** Every 6 hours

---

## Step 6: Monitor and Maintain

### 6.1 Check System Status

```bash
curl https://micro-learning.app/api/resend-confirmations
```

Response includes:
- Total contacts
- Confirmation sent count
- Resend sent count
- Eligible for resend count
- Status breakdown

### 6.2 Monitor Logs

Check your deployment logs for:
- Email send failures
- Google Sheets API errors
- Row processing errors

### 6.3 Handle "Replied" Status

When a contact replies, manually update the Google Sheet:
- Set `status` column to `replied`
- This prevents further resend emails to that contact

You can also create an admin dashboard or API endpoint to manage this.

---

## Architecture & Key Features

### Idempotency

- Safe to run multiple times
- No duplicate emails sent
- Uses `resend_sent` flag to track

### Atomic Updates

- Each row is updated independently
- Failure in one row doesn't affect others

### Strict Ordering

1. **Send email first**
2. **Update sheet only after successful send**
3. If email fails, sheet is NOT updated (retry on next run)

### Server-Side Timestamps

- All timestamps generated on server
- Prevents timezone and client clock issues

### Error Handling

- Comprehensive try-catch blocks
- Detailed error logging
- Failed rows are retried on next run

---

## Troubleshooting

### Google Sheets Errors

**Error:** "Failed to fetch data from Google Sheets"

**Solutions:**
1. Verify service account email has Editor access to sheet
2. Check `GOOGLE_SHEETS_ID` is correct
3. Ensure Google Sheets API is enabled in Cloud Console
4. Verify private key format (include `\n` for newlines)

### Resend Errors

**Error:** "Failed to send confirmation email"

**Solutions:**
1. Verify `RESEND_API_KEY` is correct
2. Check domain is verified in Resend dashboard
3. Ensure `RESEND_FROM_EMAIL` uses verified domain
4. Check Resend dashboard for delivery logs

### No Emails Sent After 24 Hours

**Solutions:**
1. Check cron job is running (Vercel logs)
2. Verify eligibility criteria:
   - `confirmation_sent = YES`
   - `resend_sent ≠ YES`
   - `status ≠ replied`
   - At least 24 hours elapsed
3. Check system status endpoint for "eligible" count

### Authentication Errors

**Error:** "Unauthorized"

**Solutions:**
1. Ensure `RESEND_ROUTINE_TOKEN` is set in environment
2. Verify cron job sends correct Bearer token
3. Check token matches exactly (no extra spaces)

---

## API Reference

### POST /api/contact

Submit a contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@company.com",
  "message": "I'm interested in your platform"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Thank you! We have received your message...",
  "emailSent": true,
  "rowIndex": 2
}
```

### POST /api/resend-confirmations

Trigger resend routine.

**Headers:**
```
Authorization: Bearer your_secure_token
```

**Response:**
```json
{
  "success": true,
  "message": "Resend confirmation routine completed",
  "result": {
    "totalRows": 10,
    "eligible": 3,
    "sent": 3,
    "failed": 0,
    "errors": []
  },
  "duration": "1234ms",
  "timestamp": "2026-01-28T10:00:00.000Z"
}
```

### GET /api/resend-confirmations

Get system status.

**Response:**
```json
{
  "success": true,
  "message": "System status",
  "stats": {
    "totalContacts": 10,
    "confirmationSent": 10,
    "resendSent": 3,
    "pending": 0,
    "confirmed": 5,
    "resent": 3,
    "replied": 2,
    "eligible": 2
  },
  "timestamp": "2026-01-28T10:00:00.000Z"
}
```

---

## Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Use strong random tokens** for `RESEND_ROUTINE_TOKEN`
3. **Rotate API keys** periodically
4. **Monitor API usage** in Google Cloud and Resend dashboards
5. **Limit service account permissions** to only the required sheet
6. **Use HTTPS** in production (automatic with Vercel)
7. **Add rate limiting** if publicly exposed

---

## Need Help?

- Check the [Google Sheets API docs](https://developers.google.com/sheets/api)
- Check the [Resend docs](https://resend.com/docs)
- Review error logs in your deployment platform
- Open an issue in the repository

---

**Built with ❤️ for Microlearning**
