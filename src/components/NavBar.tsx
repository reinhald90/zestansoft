'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X, Rocket } from 'lucide-react';
import { CONFIG, NAV_LINKS } from '@/lib/config';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'glass border-b border-white/[0.06] py-2' : 'py-4'
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-brand to-accent flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-brand/30 group-hover:scale-105 transition">
            <span className="font-mono text-sm">{'{}'}</span>
            <span className="absolute inset-0 flex items-center justify-center font-extrabold text-base">
              Z
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-white text-lg tracking-tight">ZestanSoft</span>
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-brand/20 text-brand-light border border-brand/30">
              v2.0
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm text-gray-300 hover:text-white rounded-md hover:bg-white/[0.05] transition"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href={CONFIG.links.bot}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
          >
            <Rocket className="w-4 h-4" />
            Buka Bot
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md text-white hover:bg-white/10"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass mt-2 mx-4 rounded-xl p-4 border border-white/10 animate-fade-up">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-sm text-gray-200 hover:text-white rounded-lg hover:bg-white/[0.05]"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={CONFIG.links.bot}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-white"
            >
              <Rocket className="w-4 h-4" /> Buka Bot
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
