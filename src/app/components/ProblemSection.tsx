'use client';

import React, { useEffect, useRef } from 'react';

interface ProblemCard {
  number: string;
  title: string;
  body: string;
  icon: React.ReactNode;
  colSpan: string;
}

const PhoneIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
  </svg>
);

const LeadIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const GearIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41M12 2v2M12 20v2M2 12h2M20 12h2" />
  </svg>
);

const problems: ProblemCard[] = [
  {
    number: '01',
    title: 'Missed calls turn into missed jobs.',
    body: 'A homeowner calls. You\'re on a job. They call your competitor next. That\'s real money walking out the door — every single day.',
    icon: <PhoneIcon />,
    colSpan: 'md:col-span-2',
  },
  {
    number: '02',
    title: 'Leads fall through the cracks.',
    body: 'No system to track who called, who needs a quote, or who said "call me back next week." Good leads disappear into a text thread.',
    icon: <LeadIcon />,
    colSpan: 'md:col-span-1',
  },
  {
    number: '03',
    title: 'Old systems make growth harder.',
    body: 'Whiteboards, sticky notes, and gut instinct worked when it was just you. Now they\'re the ceiling on your growth.',
    icon: <GearIcon />,
    colSpan: 'md:col-span-3',
  },
];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = Number(el.dataset.delay) || 0;
            setTimeout(() => {
              el.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease';
              el.style.transform = 'translateY(0)';
              el.style.opacity = '1';
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="problems"
      ref={sectionRef}
      className="py-20 md:py-28 bg-background"
      aria-labelledby="problems-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-14">
          <div className="section-rule mb-4" />
          <h2
            id="problems-heading"
            className="section-headline text-foreground max-w-2xl text-balance"
          >
            Sound familiar?
          </h2>
          <p className="mt-4 text-muted-foreground text-lg font-medium max-w-xl">
            These aren&apos;t small annoyances. They&apos;re the reason good trade businesses stay stuck.
          </p>
        </div>

        {/* Asymmetric card grid — 3 cols, card 1 spans 2, card 3 spans full */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {problems.map((problem, idx) => (
            <div
              key={problem.number}
              ref={(el) => { cardRefs.current[idx] = el; }}
              data-delay={idx * 120}
              style={{ opacity: 1, transform: 'translateY(0)' }}
              className={`${problem.colSpan} hover-lift`}
            >
              <div className="h-full bg-card border border-border rounded-xl p-8 flex flex-col gap-5 group cursor-default transition-shadow duration-300 hover:shadow-lg hover:border-primary/30">
                {/* Number + Icon row */}
                <div className="flex items-start justify-between">
                  <span className="text-[0.65rem] font-extrabold uppercase tracking-[0.25em] text-muted-foreground">
                    {problem.number}
                  </span>
                  <div className="text-primary/70 group-hover:text-primary transition-colors duration-300">
                    {problem.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground leading-snug">
                    {problem.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-[0.95rem]">
                    {problem.body}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="w-0 h-0.5 bg-primary rounded-full group-hover:w-12 transition-all duration-500 ease-out" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}