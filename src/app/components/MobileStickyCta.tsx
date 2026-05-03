'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MobileStickyCta() {
  const [visible, setVisible] = useState(false);
  const [pastForm, setPastForm] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Show after scrolling past hero (approx 80% of viewport height)
      setVisible(scrollY > windowHeight * 0.8);

      // Hide when form section is in view
      const formEl = document.getElementById('form');
      if (formEl) {
        const formTop = formEl?.getBoundingClientRect()?.top;
        setPastForm(formTop < windowHeight * 0.5);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const show = visible && !pastForm;

  return (
    <div
      aria-hidden={!show}
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ease-out ${show ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="bg-secondary border-t-2 border-primary px-5 py-4 flex items-center gap-3 shadow-2xl">
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm leading-tight truncate">Free Ops Check</p>
          <p className="text-white/50 text-xs">No pressure. Under 60 seconds.</p>
        </div>
        <Link
          href="#form"
          className="btn-primary shrink-0 text-sm py-3 px-5"
          tabIndex={show ? 0 : -1}
        >
          Get Mine
        </Link>
      </div>
    </div>
  );
}