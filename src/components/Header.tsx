'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener('scroll', close, { passive: true });
    return () => window.removeEventListener('scroll', close);
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#111111]/97 backdrop-blur-xl border-b border-[#E07B39]/20 py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
          aria-label="IroncladOps — go to homepage"
        >
          <Image
            src="/assets/images/image-1777551162438.png"
            alt="Ironclad Ops logo — badge stamp style industrial emblem"
            width={48}
            height={48}
            className="flex-shrink-0 object-contain"
            priority
          />
          <span
            className="font-bold text-base tracking-widest uppercase leading-none"
            style={{ fontFamily: 'var(--font-oswald)', color: '#F0EAD6', letterSpacing: '0.15em' }}
          >
            Ironclad<span style={{ color: '#E07B39' }}>Ops</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          {[
            { href: '#problems', label: 'Problems' },
            { href: '#what-we-fix', label: 'Solutions' },
            { href: '#offer', label: 'The Offer' },
          ]?.map((item) => (
            <Link
              key={item?.href}
              href={item?.href}
              className="text-[#9A9080] hover:text-[#F0EAD6] text-xs font-bold uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              {item?.label}
            </Link>
          ))}
          <Link
            href="#form"
            className="btn-primary py-2.5 px-6 text-xs"
            aria-label="Get a free ops check"
          >
            Get a Free Ops Check
          </Link>
        </nav>

        {/* Mobile: CTA + Hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="#form"
            className="btn-primary py-2 px-4 text-[0.7rem]"
          >
            Free Check
          </Link>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="text-[#F0EAD6] p-2 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden absolute top-full left-0 right-0 bg-[#111111]/98 backdrop-blur-xl border-t border-[#E07B39]/20 px-6 py-6 space-y-1"
          role="navigation"
          aria-label="Mobile navigation"
        >
          {[
            { href: '#problems', label: 'Problems' },
            { href: '#what-we-fix', label: 'Solutions' },
            { href: '#offer', label: 'The Offer' },
          ]?.map((item) => (
            <Link
              key={item?.href}
              href={item?.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3.5 text-[#9A9080] hover:text-[#F0EAD6] text-sm font-bold uppercase tracking-widest transition-colors border-b border-[#333333] last:border-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              {item?.label}
            </Link>
          ))}
          <div className="pt-4">
            <Link
              href="#form"
              onClick={() => setMenuOpen(false)}
              className="btn-primary w-full justify-center text-sm"
            >
              Get a Free Ops Check
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}