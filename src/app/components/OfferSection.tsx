'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const offerPoints = [
  { label: 'Your website', detail: 'Is it losing people before they call?' },
  { label: 'Lead capture', detail: 'Are you even capturing every inquiry?' },
  { label: 'Follow-up process', detail: 'What happens after someone reaches out?' },
  { label: 'Customer journey', detail: 'From first call to paid invoice — where are the gaps?' },
];

export default function OfferSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && contentRef.current) {
            contentRef.current.style.transition = 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease';
            contentRef.current.style.transform = 'translateY(0)';
            contentRef.current.style.opacity = '1';
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="offer"
      ref={sectionRef}
      className="py-20 md:py-28 bg-background"
      aria-labelledby="offer-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          ref={contentRef}
          style={{ opacity: 1, transform: 'translateY(0)' }}
        >
          {/* Two-col layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left: Offer explanation */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full gap-8">
              <div>
                <div className="section-rule mb-4" />
                <h2
                  id="offer-heading"
                  className="section-headline text-foreground"
                >
                  Free Ironclad Ops Check
                </h2>
                <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                  We&apos;ll look at your current setup and send you a simple breakdown of what&apos;s working, what&apos;s leaking money, and what could be fixed first.
                </p>
                <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                  No jargon. No upsell pressure. Just a straight read on your business.
                </p>
              </div>

              {/* What we review */}
              <div className="bg-muted border border-border rounded-xl p-7 space-y-4">
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-muted-foreground">
                  We review
                </p>
                <ul className="space-y-3" role="list">
                  {offerPoints?.map((point) => (
                    <li key={point?.label} className="flex items-start gap-3">
                      <div className="shrink-0 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </div>
                      <div>
                        <span className="font-bold text-foreground text-sm">{point?.label}</span>
                        <span className="text-muted-foreground text-sm"> — {point?.detail}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link href="#form" className="btn-primary">
                  Request My Free Ops Check
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <p className="text-muted-foreground text-sm font-medium">
                  Takes under 60 seconds to submit.
                </p>
              </div>
            </div>

            {/* Right: Trust block */}
            <div className="lg:col-span-6 flex flex-col gap-5">
              {/* Big quote card */}
              <div className="bg-secondary text-white rounded-xl p-8 space-y-5">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="text-primary opacity-60">
                  <path d="M10 14H6a2 2 0 01-2-2V8a2 2 0 012-2h4a2 2 0 012 2v10l-2 6H6l2-6zm16 0h-4a2 2 0 01-2-2V8a2 2 0 012-2h4a2 2 0 012 2v10l-2 6h-4l2-6z" fill="currentColor" />
                </svg>
                <p className="text-white/85 text-xl font-medium leading-relaxed italic">
                  &ldquo;We were getting calls but not closing them. Turned out our follow-up was basically nonexistent. Once we fixed that, jobs started sticking.&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-extrabold text-sm">
                    MR
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Marcus R.</p>
                    <p className="text-white/45 text-xs font-semibold uppercase tracking-wider">HVAC Owner, Dallas TX</p>
                  </div>
                </div>
              </div>

              {/* Three mini trust stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { stat: '< 48hrs', label: 'Turnaround on your ops review' },
                  { stat: '$0', label: 'Cost for the initial check' },
                  { stat: '100%', label: 'Focused on your trade business' },
                ]?.map((item) => (
                  <div
                    key={item?.label}
                    className="bg-card border border-border rounded-xl p-5 text-center hover-lift"
                  >
                    <p className="text-2xl font-extrabold text-primary leading-none mb-2">{item?.stat}</p>
                    <p className="text-muted-foreground text-xs font-semibold leading-snug">{item?.label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}