import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import ProblemSection from '@/app/components/ProblemSection';
import WhatWeFixSection from '@/app/components/WhatWeFixSection';
import OfferSection from '@/app/components/OfferSection';
import FormSection from '@/app/components/FormSection';
import MobileStickyCtA from '@/app/components/MobileStickyCta';
import StructuredData from '@/app/components/StructuredData';

export default function LandingPage() {
  return (
    <>
      <StructuredData />
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <WhatWeFixSection />
        <OfferSection />
        <FormSection />
      </main>
      <Footer />
      <MobileStickyCtA />
    </>
  );
}