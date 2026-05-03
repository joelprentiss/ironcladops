'use client';

import React, { useEffect, useRef } from 'react';

interface FixItem {
  title: string;
  description: string;
  isUpgrade?: boolean;
}

const fixItems: FixItem[] = [
  {
    title: 'Missed call follow-up',
    description: 'Automatic text-back when you miss a call so leads don\'t go cold.',
  },
  {
    title: 'Simple CRM setup',
    description: 'A clean, no-fuss system to track every lead from first call to closed job.',
  },
  {
    title: 'Booking and intake flow',
    description: 'Make it easy for customers to book, and easy for you to stay organized.',
  },
  {
    title: 'Review request automation',
    description: 'Get more 5-star reviews without chasing customers down after every job.',
  },
  {
    title: 'Lead tracking',
    description: 'Know exactly where every lead came from, where it stands, and what it\'s worth.',
  },
  {
    title: 'Basic SOPs and workflow cleanup',
    description: 'Simple written processes so your team runs the same way every time.',
  },
  {
    title: 'AI voice agent options',
    description: 'For businesses ready to take it further — an AI that answers calls, qualifies leads, and books jobs 24/7.',
    isUpgrade: true,
  },
];

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M3.75 9L7.5 12.75 14.25 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function WhatWeFixSection() {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = Number(el.dataset.delay) || 0;
            setTimeout(() => {
              el.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s ease';
              el.style.transform = 'translateX(0)';
              el.style.opacity = '1';
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="what-we-fix"
      className="py-20 md:py-28 bg-secondary"
      aria-labelledby="fix-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left: Heading + context */}
          <div className="lg:col-span-5">
            <div className="section-rule mb-4" />
            <h2
              id="fix-heading"
              className="section-headline text-white leading-tight"
            >
              What Ironclad Ops Fixes
            </h2>
            <p className="mt-6 text-white/60 text-lg leading-relaxed font-medium">
              We go through your business end-to-end — from first contact to closed job — and tighten up every place leads and money are slipping out.
            </p>

            {/* Stat callout */}
            <div className="mt-10 border border-primary/40 bg-primary/10 rounded-xl p-7 space-y-2">
              <p className="text-4xl font-extrabold text-primary">78%</p>
              <p className="text-white/60 text-sm font-semibold uppercase tracking-wider">
                of customers go with the first contractor who responds. Are you first?
              </p>
            </div>
          </div>

          {/* Right: Fix list */}
          <div className="lg:col-span-7">
            <ul className="space-y-0 divide-y divide-white/10" role="list">
              {fixItems.map((item, idx) => (
                <li
                  key={item.title}
                  ref={(el) => { itemRefs.current[idx] = el; }}
                  data-delay={idx * 80}
                  style={{ opacity: 1, transform: 'translateX(0)' }}
                  className="py-5 flex items-start gap-4 group"
                >
                  {/* Checkmark */}
                  <div className={`shrink-0 mt-0.5 w-8 h-8 rounded-md flex items-center justify-center transition-colors duration-200 ${item.isUpgrade ? 'bg-accent/20 text-accent group-hover:bg-accent/30' : 'bg-primary/20 text-primary group-hover:bg-primary/30'}`}>
                    <CheckIcon />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-white font-bold text-[1rem] leading-snug">
                        {item.title}
                      </span>
                      {item.isUpgrade && (
                        <span className="inline-block text-[0.6rem] font-extrabold uppercase tracking-[0.18em] bg-accent/20 text-accent border border-accent/30 px-2 py-0.5 rounded-sm">
                          Optional Upgrade
                        </span>
                      )}
                    </div>
                    <p className="text-white/55 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}