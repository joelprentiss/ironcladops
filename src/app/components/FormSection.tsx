'use client';

import React, { useState } from 'react';

interface FormData {
  businessName: string;
  contactName: string;
  phone: string;
  email: string;
  tradeType: string;
  websiteUrl: string;
  biggestIssue: string;
}

const initialFormData: FormData = {
  businessName: '',
  contactName: '',
  phone: '',
  email: '',
  tradeType: '',
  websiteUrl: '',
  biggestIssue: '',
};

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function FormSection() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Submission failed. Please try again.');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or call us directly.'
      );
    }
  };

  if (status === 'success') {
    return (
      <section id="form" className="py-20 md:py-28 bg-muted" aria-label="Form submitted">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
          <div className="bg-card border border-border rounded-2xl p-12 space-y-6">
            {/* Success icon */}
            <div className="w-16 h-16 bg-primary/15 rounded-full flex items-center justify-center mx-auto">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M6 16l7 7 13-13" stroke="#E07B39" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-foreground">You&apos;re in.</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Got it. We&apos;ll review your business and send over a simple ops breakdown within 48 hours.
            </p>
            <p className="text-muted-foreground text-sm">
              Keep an eye on <strong className="text-foreground">{formData.email}</strong> — we&apos;ll reach out there.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="form"
      className="py-20 md:py-28 bg-muted"
      aria-labelledby="form-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: Context */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div>
              <div className="section-rule mb-4" />
              <h2
                id="form-heading"
                className="section-headline text-foreground"
              >
                Let&apos;s Take a Look at Your Business.
              </h2>
              <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
                Fill this out in under 60 seconds. We&apos;ll do the work and send you back a clear breakdown — no fluff, no pitch deck.
              </p>
            </div>

            {/* Reassurance points */}
            <ul className="space-y-3 mt-2" role="list">
              {[
                'No credit card. No commitment.',
                'We review your setup manually.',
                'You get a real ops breakdown, not a sales pitch.',
                'Trades businesses only — we know your world.',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <span className="text-muted-foreground text-sm font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-8">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-card border border-border rounded-2xl p-8 md:p-10 space-y-6"
              aria-label="Free ops check request form"
            >
              {/* Row 1: Business + Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="businessName" className="form-label">
                    Business Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Johnson Plumbing LLC"
                    className="form-input"
                    autoComplete="organization"
                  />
                </div>
                <div>
                  <label htmlFor="contactName" className="form-label">
                    Owner / Contact Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contactName"
                    name="contactName"
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="Mike Johnson"
                    className="form-input"
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Row 2: Phone + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="form-label">
                    Phone Number <span className="text-primary">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 867-5309"
                    className="form-input"
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="mike@johnsonplumbing.com"
                    className="form-input"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Row 3: Trade Type + Website */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="tradeType" className="form-label">
                    Trade Type <span className="text-primary">*</span>
                  </label>
                  <select
                    id="tradeType"
                    name="tradeType"
                    required
                    value={formData.tradeType}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="" disabled>Select your trade</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="HVAC">HVAC</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Landscaping">Landscaping</option>
                    <option value="Roofing">Roofing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="websiteUrl" className="form-label">
                    Website URL
                  </label>
                  <input
                    id="websiteUrl"
                    name="websiteUrl"
                    type="url"
                    value={formData.websiteUrl}
                    onChange={handleChange}
                    placeholder="https://johnsonplumbing.com"
                    className="form-input"
                    autoComplete="url"
                  />
                </div>
              </div>

              {/* Row 4: Biggest Issue */}
              <div>
                <label htmlFor="biggestIssue" className="form-label">
                  Biggest Issue Right Now <span className="text-primary">*</span>
                </label>
                <select
                  id="biggestIssue"
                  name="biggestIssue"
                  required
                  value={formData.biggestIssue}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="" disabled>Select your biggest challenge</option>
                  <option value="Missing calls">Missing calls</option>
                  <option value="Not enough leads">Not enough leads</option>
                  <option value="No follow-up system">No follow-up system</option>
                  <option value="Outdated website">Outdated website</option>
                  <option value="Need better booking">Need better booking</option>
                  <option value="Not sure">Not sure</option>
                </select>
              </div>

              {/* Error message */}
              {status === 'error' && (
                <div
                  role="alert"
                  className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 text-red-500 mt-0.5" aria-hidden="true">
                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
                    <path d="M10 6v4M10 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <p className="text-red-700 text-sm font-medium">{errorMessage}</p>
                </div>
              )}

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                        <path d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" fill="currentColor" className="opacity-75" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send My Free Ops Check
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
                <p className="text-center text-muted-foreground text-xs font-medium mt-3">
                  No spam. No commitment. We review your info and reach out within 48 hours.
                </p>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}