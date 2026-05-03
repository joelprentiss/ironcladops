import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const year = 2026;

  return (
    <footer
      className="bg-[#111111] border-t-2 border-[#E07B39]/30 py-12"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top divider stamp line */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-[#333333]" />
          <span className="badge-stamp text-[0.6rem]">Ironclad Ops</span>
          <div className="h-px flex-1 bg-[#333333]" />
        </div>

        {/* Main footer row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Logo + wordmark */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E07B39] rounded-sm"
            aria-label="IroncladOps homepage"
          >
            <Image
              src="/assets/images/image-1777551162438.png"
              alt="Ironclad Ops logo"
              width={36}
              height={36}
              className="object-contain"
            />
            <span className="font-extrabold text-base tracking-widest uppercase text-[#F0EAD6]" style={{ fontFamily: 'var(--font-display)' }}>
              Ironclad<span className="text-[#E07B39]">Ops</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav
            className="flex items-center gap-6 flex-wrap justify-center"
            aria-label="Footer navigation"
          >
            {[
              { href: '#problems', label: 'Problems' },
              { href: '#what-we-fix', label: 'Solutions' },
              { href: '#offer', label: 'Free Check' },
              { href: '#form', label: 'Get Started' },
            ]?.map((item) => (
              <Link
                key={item?.href}
                href={item?.href}
                className="text-[0.75rem] font-bold tracking-widest uppercase text-[#9A9080] hover:text-[#F0EAD6] transition-colors min-h-[44px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E07B39] rounded-sm"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {item?.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <div
            className="flex items-center gap-4 text-xs font-bold tracking-wider uppercase text-[#9A9080]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span>© {year} IroncladOps</span>
            <span className="w-px h-3 bg-[#333333]" aria-hidden="true" />
            <Link
              href="#"
              className="hover:text-[#F0EAD6] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E07B39] rounded-sm"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="hover:text-[#F0EAD6] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E07B39] rounded-sm"
            >
              Terms
            </Link>
          </div>
        </div>

        {/* Bottom tagline */}
        <p
          className="mt-10 text-center text-[0.7rem] tracking-widest uppercase text-[#9A9080]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Built for trades. Focused on results.
        </p>
      </div>
    </footer>
  );
}