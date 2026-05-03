'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function HeroSection() {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [
    { el: line1Ref?.current, delay: 100 },
    { el: line2Ref?.current, delay: 250 },
    { el: line3Ref?.current, delay: 400 },
    { el: subRef?.current, delay: 600 },
    { el: ctaRef?.current, delay: 750 }];


    els?.forEach(({ el, delay }) => {
      if (!el) return;
      setTimeout(() => {
        el.style.transition = 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease';
        el.style.transform = 'translateY(0)';
        el.style.opacity = '1';
      }, delay);
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end pb-20 md:pb-28 overflow-hidden"
      aria-label="Hero">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_143eaed6e-1772130081586.png"
          alt="Plumber working on pipes in a commercial building, industrial setting, dark pipes and dim workshop lighting"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw" />

        {/* Dark overlay scrim — ensures white text always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1420] via-[#0D1420]/75 to-[#0D1420]/40" />
        {/* Subtle grain */}
        <div className="grain-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-40">
        {/* Badge */}
        <div
          ref={subRef}
          style={{ opacity: 0, transform: 'translateY(20px)' }}
          className="mb-8">

          <span className="inline-flex items-center gap-2 border border-primary/60 bg-primary/10 backdrop-blur-sm text-primary rounded-sm px-4 py-2 text-[0.65rem] font-800 tracking-[0.2em] uppercase font-extrabold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            For Plumbers · HVAC · Electricians · Trade Businesses
          </span>
        </div>

        {/* Headline */}
        <h1 className="hero-headline text-white mb-8 max-w-5xl">
          <span className="line-reveal">
            <span
              ref={line1Ref}
              style={{ opacity: 0, transform: 'translateY(105%)' }}>

              Stop Losing Jobs
            </span>
          </span>
          <span className="line-reveal">
            <span
              ref={line2Ref}
              style={{ opacity: 0, transform: 'translateY(105%)' }}>

              to Missed Calls,
            </span>
          </span>
          <span className="line-reveal">
            <span
              ref={line3Ref}
              style={{ opacity: 0, transform: 'translateY(105%)' }}
              className="text-primary">

              Weak Follow-Up,
            </span>
          </span>
          <span className="line-reveal">
            <span
              style={{ opacity: 0, transform: 'translateY(105%)', transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.55s, opacity 0.9s ease 0.55s' }}
              ref={(el) => {
                if (el) {
                  setTimeout(() => {
                    el.style.transform = 'translateY(0)';
                    el.style.opacity = '1';
                  }, 550);
                }
              }}>

              and Broken Systems.
            </span>
          </span>
        </h1>

        {/* Subheadline + CTA */}
        <div
          ref={ctaRef}
          style={{ opacity: 0, transform: 'translateY(20px)' }}
          className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">

          <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-xl font-medium">
            Ironclad Ops helps plumbers, HVAC companies, and trade businesses
            tighten up lead capture, follow-up, and daily operations —{' '}
            <span className="text-white font-semibold">without adding more admin work.</span>
          </p>

          <div className="flex flex-col gap-3 shrink-0">
            <Link href="#form" className="btn-primary text-center">
              Get a Free Ops Check
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <p className="text-white/45 text-xs font-medium text-center leading-snug max-w-[240px]">
              No pressure. No long sales call. Just a quick review.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex items-center gap-3 opacity-40">
          <div className="w-px h-8 bg-white/50" />
          <span className="text-white text-[0.65rem] font-bold uppercase tracking-[0.25em]">Scroll to learn more</span>
        </div>
      </div>
    </section>);

}