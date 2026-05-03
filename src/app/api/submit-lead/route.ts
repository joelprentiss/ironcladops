import { NextRequest, NextResponse } from 'next/server';

interface LeadFormData {
  businessName: string;
  contactName: string;
  phone: string;
  email: string;
  tradeType: string;
  websiteUrl?: string;
  biggestIssue: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadFormData = await request.json();

    // Validate required fields
    const required: (keyof LeadFormData)[] = [
      'businessName',
      'contactName',
      'phone',
      'email',
      'tradeType',
      'biggestIssue',
    ];

    for (const field of required) {
      if (!body[field] || String(body[field]).trim() === '') {
        return NextResponse.json(
          { success: false, message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      // If no Google Script URL configured, log and return success
      // (useful during development/testing)
      console.warn('[IroncladOps] GOOGLE_SCRIPT_URL not set. Lead data:', body);
      return NextResponse.json({
        success: true,
        message: 'Lead received (Google Sheets integration not configured).',
      });
    }

    // Post to Google Apps Script Web App
    const payload = {
      timestamp: new Date().toISOString(),
      businessName: body.businessName.trim(),
      contactName: body.contactName.trim(),
      phone: body.phone.trim(),
      email: body.email.trim().toLowerCase(),
      tradeType: body.tradeType,
      websiteUrl: body.websiteUrl?.trim() || '',
      biggestIssue: body.biggestIssue,
      sourcePage: 'IroncladOps Landing Page',
    };

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Google Script returned status ${response.status}`);
    }

    return NextResponse.json({ success: true, message: 'Lead submitted successfully.' });
  } catch (error) {
    console.error('[IroncladOps] Lead submission error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong on our end. Please try again in a moment.',
      },
      { status: 500 }
    );
  }
}