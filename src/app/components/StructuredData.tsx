import React from 'react';

export default function StructuredData() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'IroncladOps',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/assets/images/app_logo.png`,
    description: 'IroncladOps helps plumbers, HVAC companies, and trade businesses fix lead leakage, follow-up gaps, and broken operations.',
    areaServed: 'US',
    serviceType: 'Business Operations Consulting',
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'IroncladOps — Free Ops Check for Trade Businesses',
    description: 'Get a free ops check for your plumbing, HVAC, or electrical business. Find out where leads and money are slipping through the cracks.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Free Ironclad Ops Check',
    provider: { '@type': 'Organization', name: 'IroncladOps' },
    description: 'A free review of your website, lead capture, follow-up process, and customer journey for trade businesses.',
    areaServed: 'US',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}