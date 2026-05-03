# IroncladOps — Landing Page

A validation landing page for IroncladOps targeting trade businesses (plumbing, HVAC, electrical, landscaping, roofing). Captures leads via a simple form and sends data to a Google Sheet.

---

## Quick Start

npm install
cp .env.local.example .env.local
# Fill in your GOOGLE_SCRIPT_URL (see setup below)
npm run dev

Open [http://localhost:3000](http://localhost:3000).

---

## Google Sheet + Apps Script Setup

Follow these steps to connect form submissions to a Google Sheet.

### Step 1: Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet
2. Name it: **IroncladOps Leads**
3. In Row 1, add these exact column headers (one per cell, A through I):

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Timestamp | Business Name | Contact Name | Phone Number | Email | Trade Type | Website URL | Biggest Issue | Source Page |

### Step 2: Open Apps Script

1. In your Google Sheet, click **Extensions → Apps Script**
2. Delete any existing code in the editor
3. Paste the following script:

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.businessName || '',
      data.contactName || '',
      data.phone || '',
      data.email || '',
      data.tradeType || '',
      data.websiteUrl || '',
      data.biggestIssue || '',
      data.sourcePage || 'IroncladOps Landing Page'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Test this function manually in the Apps Script editor
function testPost() {
  var mockData = {
    timestamp: new Date().toISOString(),
    businessName: 'Test Plumbing Co',
    contactName: 'John Test',
    phone: '555-123-4567',
    email: 'test@testplumbing.com',
    tradeType: 'Plumbing',
    websiteUrl: 'https://testplumbing.com',
    biggestIssue: 'Missing calls',
    sourcePage: 'IroncladOps Landing Page'
  };
  
  var mockEvent = { postData: { contents: JSON.stringify(mockData) } };
  var result = doPost(mockEvent);
  Logger.log(result.getContent());
}

4. Click **Save** (disk icon or Ctrl+S)
5. Name the project: **IroncladOps Lead Capture**

### Step 3: Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Fill in the settings:
   - **Description**: IroncladOps Lead Capture v1
   - **Execute as**: Me (your Google account)
   - **Who has access**: **Anyone** ← This is required for the form to work
4. Click **Deploy**
5. Click **Authorize access** and follow the prompts
6. **Copy the Web App URL** — it looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

### Step 4: Add URL to Environment Variables

1. Open `.env.local` in your project root
2. Set the value:

GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec

3. Restart your dev server: `npm run dev`

### Step 5: Test a Form Submission

**Option A — Test via the landing page:**
1. Open [http://localhost:3000](http://localhost:3000)
2. Fill out the form and submit
3. Check your Google Sheet — a new row should appear within seconds

**Option B — Test the API route directly:**
curl -X POST http://localhost:3000/api/submit-lead \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Test HVAC Inc",
    "contactName": "Sarah Test",
    "phone": "555-987-6543",
    "email": "sarah@testhvac.com",
    "tradeType": "HVAC",
    "websiteUrl": "https://testhvac.com",
    "biggestIssue": "No follow-up system"
  }'

Expected response: `{"success":true,"message":"Lead submitted successfully."}`

**Option C — Test the Apps Script directly:**
1. Open your Apps Script project
2. Select the `testPost` function from the dropdown
3. Click **Run**
4. Check your Google Sheet for a test row

---

## Updating the Apps Script

If you need to make changes to the script after deploying:

1. Make your edits in Apps Script
2. Click **Deploy → Manage deployments**
3. Click the pencil icon on your deployment
4. Change the version to **New version**
5. Click **Deploy**

> ⚠️ The Web App URL stays the same when you update an existing deployment. No need to update `.env.local`.

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `GOOGLE_SCRIPT_URL` | Yes (for production) | Your deployed Apps Script Web App URL |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Your production domain (e.g., `https://ironcladops.com`) |

> **Note:** If `GOOGLE_SCRIPT_URL` is not set, the form will still show a success message but data won't be saved. A warning will appear in the server console. This is intentional to allow local development without Google Sheets configured.

---

## Project Structure

src/
├── app/
│   ├── api/
│   │   └── submit-lead/
│   │       └── route.ts          # API route → Google Sheets
│   ├── components/
│   │   ├── HeroSection.tsx       # Full-bleed hero with animated headline
│   │   ├── ProblemSection.tsx    # 3 asymmetric pain point cards
│   │   ├── WhatWeFixSection.tsx  # Solutions list on dark background
│   │   ├── OfferSection.tsx      # Free check offer + trust signals
│   │   ├── FormSection.tsx       # Lead capture form with success state
│   │   ├── MobileStickyCta.tsx   # Sticky bottom CTA for mobile
│   │   └── StructuredData.tsx    # JSON-LD structured data
│   ├── layout.tsx
│   ├── page.tsx                  # Main landing page
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── Header.tsx                # Sticky nav with scroll behavior
│   └── Footer.tsx                # Minimal linear footer
└── styles/
    └── tailwind.css

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `GOOGLE_SCRIPT_URL` → your Apps Script URL
   - `NEXT_PUBLIC_SITE_URL` → your domain
4. Deploy

### Other Platforms

Set the same two environment variables in your platform's settings. The app has no database dependencies — it's fully stateless.

---

## Troubleshooting

**Form submits but nothing appears in Google Sheet:**
- Verify `GOOGLE_SCRIPT_URL` is set correctly in `.env.local`
- Make sure you restarted the dev server after editing `.env.local`
- Check that the Apps Script is deployed with "Anyone" access
- Try running `testPost()` directly in Apps Script editor

**"Something went wrong" error on form submit:**
- Check your terminal/server logs for the actual error
- Verify the Google Script URL is the `/exec` endpoint, not the edit URL

**Apps Script authorization errors:**
- Re-deploy the script and re-authorize
- Make sure you're logged into the correct Google account

---

## License

Private — IroncladOps internal use.