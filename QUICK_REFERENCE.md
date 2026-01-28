# Quick Reference - Contact Form System

## 🚀 Essential Commands

### Development
```bash
npm run dev                    # Start development server
npm run build                  # Build for production
npm run type-check             # Check TypeScript errors
```

### Testing
```bash
# Test form at http://localhost:3000/#contact

# Check resend system status
curl http://localhost:3000/api/resend-confirmations

# Trigger resend manually
curl -X POST http://localhost:3000/api/resend-confirmations \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📊 Google Sheets Structure

| Column | Type | Example | Notes |
|--------|------|---------|-------|
| email | string | john@example.com | User's email |
| name | string | John Doe | User's name |
| message | string | I'm interested... | Their message |
| submitted_at | ISO 8601 | 2026-01-28T10:00:00.000Z | Server timestamp |
| confirmation_sent | YES/NO | YES | Initial email sent? |
| confirmation_sent_at | ISO 8601 | 2026-01-28T10:00:00.000Z | When sent |
| resend_sent | YES/NO | YES | Resend email sent? |
| resend_sent_at | ISO 8601 | 2026-01-29T10:00:00.000Z | When sent |
| status | string | confirmed/resent/replied | Current status |

---

## 🎯 Eligibility Criteria (All Must Be True)

```
✅ confirmation_sent === "YES"
✅ resend_sent !== "YES"
✅ status !== "replied"
✅ (now - confirmation_sent_at) >= 24 hours
```

---

## 🔑 Required Environment Variables

```env
# Google Sheets (required)
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account",...}
GOOGLE_SHEETS_ID=your_spreadsheet_id
GOOGLE_SHEETS_NAME=ContactForm

# Resend (required)
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=hello@your-domain.com

# Security (recommended)
RESEND_ROUTINE_TOKEN=secure_random_token

# Site (optional)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=Your Site Name
```

---

## 🔄 Data Flow

### Form Submission
```
User → POST /api/contact → Send Email → Update Sheet → Response
```

### Resend (Every 6 hours)
```
Cron → POST /api/resend-confirmations → Fetch Rows → Filter Eligible
  → For Each: Send Email → Update Sheet → Report
```

---

## 🛠️ Setup Steps

1. **Google Sheets**
   - Create spreadsheet
   - Enable Sheets API
   - Create service account
   - Share sheet with service account

2. **Resend**
   - Create account
   - Verify domain
   - Get API key

3. **Environment**
   ```bash
   node setup-contact-form.js
   ```

4. **Test**
   ```bash
   npm run dev
   # Test at localhost:3000/#contact
   ```

5. **Deploy**
   ```bash
   git push
   # Add vercel.json for cron
   ```

---

## 📍 API Endpoints

### POST /api/contact
Submit contact form

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'm interested..."
}
```

**Response:**
```json
{
  "success": true,
  "emailSent": true,
  "rowIndex": 2
}
```

### POST /api/resend-confirmations
Trigger resend routine

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Response:**
```json
{
  "success": true,
  "result": {
    "totalRows": 10,
    "eligible": 3,
    "sent": 3,
    "failed": 0
  }
}
```

### GET /api/resend-confirmations
Check system status

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalContacts": 10,
    "eligible": 2,
    "confirmed": 5,
    "resent": 3
  }
}
```

---

## ⏰ Cron Setup (Vercel)

**vercel.json:**
```json
{
  "crons": [{
    "path": "/api/resend-confirmations",
    "schedule": "0 */6 * * *",
    "headers": {
      "Authorization": "Bearer YOUR_TOKEN"
    }
  }]
}
```

**Schedule:** Every 6 hours (0am, 6am, 12pm, 6pm)

---

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Google Sheets access denied | Share sheet with service account email |
| Email not sending | Verify Resend domain and API key |
| Resends not working | Check 24h elapsed + eligibility |
| Authentication error | Verify Bearer token matches |

---

## 📱 Contact Form Features

- ✅ Real-time validation
- ✅ Loading states
- ✅ Success/error messages
- ✅ Accessible (ARIA labels)
- ✅ Responsive design
- ✅ Professional UI

---

## 🔒 Security Checklist

- [x] Bearer token authentication
- [x] Service account (not user account)
- [x] Environment variables (not hardcoded)
- [x] Input validation
- [x] Error sanitization (no sensitive data in logs)
- [x] HTTPS only (production)

---

## 📚 Documentation Files

- **CONTACT_FORM_SETUP.md** - Detailed setup guide
- **RESEND_SYSTEM.md** - Architecture & technical details
- **IMPLEMENTATION_COMPLETE.md** - Implementation summary
- **QUICK_REFERENCE.md** - This file

---

## 🎯 Key Engineering Principles

1. **Idempotency** - Safe to run multiple times
2. **Atomicity** - Per-row updates
3. **Strict Ordering** - Email before sheet
4. **Server Timestamps** - No client time
5. **No Blind Resends** - Explicit checks

---

## ✨ Testing Checklist

- [ ] Form submission works
- [ ] Confirmation email received
- [ ] Data in Google Sheet
- [ ] Wait 24 hours
- [ ] Resend email received
- [ ] Sheet updated with resend_sent=YES
- [ ] Run routine again - no duplicate
- [ ] Set status=replied - no more resends

---

## 📞 Support Resources

- [Google Sheets API Docs](https://developers.google.com/sheets/api)
- [Resend Documentation](https://resend.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

---

**Version:** 1.0.0  
**Last Updated:** January 28, 2026  
**Status:** ✅ Production Ready
