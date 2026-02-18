"use client";

import Link from "next/link";
import { useState } from "react";
import { BRAND } from "@/lib/constants";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/weekly-ad", label: "Weekly Ad" },
  { href: "/specials", label: "Weekly Specials" },
  { href: "/locations", label: "Locations" },
  { href: "/departments", label: "Departments" },
  { href: "/events", label: "Events" },
  { href: "/jobs", label: "Jobs" },
  { href: "/leasing", label: "Leasing" },
  { href: "/suggestions", label: "Suggestions" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-fg text-bg shadow-lg border-b border-border/40">
      <div className="bg-brand text-brand-fg">
        <div className="container-max px-4 sm:px-6 lg:px-8 flex items-center justify-between py-1.5">
          <p className="text-bg/80 text-xs font-medium hidden sm:block">
            EBT / WIC Accepted at All Locations
          </p>
          <a
            href={BRAND.phone.link}
            className="text-bg font-bold text-sm tracking-wide hover:text-bg/80 transition-colors"
          >
            📞 {BRAND.phone.display}
          </a>
        </div>
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-brand-fg font-black text-xl leading-none">J</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-bg font-black text-lg leading-tight tracking-tight">Junior&apos;s</p>
              <p className="text-bg/80 text-xs font-semibold tracking-widest uppercase leading-none">
                Supermarket
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-bg/80 hover:text-bg text-sm font-medium px-3 py-2 rounded-md hover:bg-bg/10 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className="lg:hidden text-bg p-2 rounded-md hover:bg-bg/10 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-fg border-t border-bg/15">
          <nav className="container-max px-4 py-4 grid grid-cols-2 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-bg/80 hover:text-bg text-sm font-medium px-3 py-2.5 rounded-md hover:bg-bg/10 transition-all"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
