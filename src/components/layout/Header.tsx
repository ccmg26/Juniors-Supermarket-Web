"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { BRAND } from "@/lib/constants";
import { SOCIAL_LINKS } from "@/lib/social";

// ── Nav link tiers ────────────────────────────────────────────
// Primary: always visible in desktop nav + top of mobile drawer
const PRIMARY_NAV = [
  { href: "/weekly-ad",   label: "Weekly Ad"   },
  { href: "/locations",   label: "Locations"   },
  { href: "/departments", label: "Departments" },
  { href: "/events",      label: "Events"      },
] as const;

// Secondary: drawer only — lower-traffic pages
const SECONDARY_NAV = [
  { href: "/about",       label: "About Us"    },
  { href: "/jobs",        label: "Jobs"        },
  { href: "/contact",     label: "Contact"     },
  { href: "/leasing",     label: "Leasing"     },
  { href: "/suggestions", label: "Suggestions" },
] as const;

// ── Inline social icons ───────────────────────────────────────
const IgIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)
const FbIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.532-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
)
const TtIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z"/>
  </svg>
)
const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (open && drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-50 bg-fg shadow-lg">

        {/* ── Top bar ──────────────────────────────────────── */}
        <div className="bg-brand">
          <div className="container-max px-4 sm:px-6 lg:px-8 flex items-center justify-between py-1.5">
            <p className="text-brand-fg/90 text-xs font-medium hidden sm:block">
              EBT / WIC Accepted at All Locations
            </p>
            <a
              href={BRAND.phone.link}
              className="text-brand-fg font-bold text-sm tracking-wide hover:text-brand-fg/80 transition-colors"
            >
              📞 {BRAND.phone.display}
            </a>
          </div>
        </div>

        {/* ── Main nav bar ─────────────────────────────────── */}
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0" aria-label="Junior's Supermarket – Home">
              <Image src="/logo.png" alt="Junior's Supermarket – The Real Meat People" width={44} height={44} className="h-11 w-auto" priority />
            </Link>

            {/* Social icons — desktop only */}
            <div className="hidden md:flex items-center gap-2 pl-4 ml-1 border-l border-bg/20">
              <span className="text-xs text-bg/40 font-medium mr-1">Follow us</span>
              {[
                { href: SOCIAL_LINKS.instagram.href, label: 'Instagram', icon: <IgIcon />, cls: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400' },
                { href: SOCIAL_LINKS.facebook.href,  label: 'Facebook',  icon: <FbIcon />, cls: 'bg-[#1877F2]' },
                { href: SOCIAL_LINKS.tiktok.href,    label: 'TikTok',    icon: <TtIcon />, cls: 'bg-fg/80 border border-bg/20' },
                { href: SOCIAL_LINKS.whatsapp.href,  label: 'WhatsApp',  icon: <WaIcon />, cls: 'bg-[#25D366]' },
              ].map(({ href, label, icon, cls }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-7 h-7 rounded-md flex items-center justify-center text-white hover:opacity-80 transition-opacity ${cls}`}
                >
                  {icon}
                </Link>
              ))}
            </div>

            {/* Desktop primary nav — 4 items only */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
              {/* Weekly Ad gets brand pill treatment */}
              <Link
                href="/weekly-ad"
                aria-current={isActive("/weekly-ad") ? "page" : undefined}
                className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all mr-1 ${
                  isActive("/weekly-ad")
                    ? "bg-brand/80 text-brand-fg"
                    : "bg-brand text-brand-fg hover:opacity-90"
                }`}
              >
                🗞 Weekly Ad
              </Link>

              {PRIMARY_NAV.filter(l => l.href !== "/weekly-ad").map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`text-sm font-medium px-3 py-2 rounded-md transition-all ${
                    isActive(link.href)
                      ? "text-bg bg-bg/15 underline underline-offset-4"
                      : "text-bg/70 hover:text-bg hover:bg-bg/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side: mobile Weekly Ad pill + hamburger */}
            <div className="flex items-center gap-2">
              <Link
                href="/weekly-ad"
                className="lg:hidden bg-brand text-brand-fg text-xs font-bold px-3 py-2 rounded-lg"
              >
                🗞 Weekly Ad
              </Link>
              <button
                className="text-bg p-2 rounded-md hover:bg-bg/10 transition-colors"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Drawer overlay ───────────────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-fg/50 backdrop-blur-sm"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Slide-in drawer ──────────────────────────────────── */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`
          fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw]
          bg-card border-l border-border shadow-2xl flex flex-col
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <div className="font-bold text-card-fg text-sm">Junior&apos;s Supermarket</div>
            <div className="label-eyebrow text-[10px]">The Real Meat People</div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-fg"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>

        {/* Drawer body */}
        <div className="flex-1 overflow-y-auto">

          {/* Weekly Ad hero CTA */}
          <div className="px-4 pt-4 pb-2">
            <Link
              href="/weekly-ad"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between w-full bg-brand hover:opacity-90 text-brand-fg rounded-xl px-4 py-3.5 transition-opacity"
            >
              <div>
                <div className="font-bold text-sm">🗞 This Week&apos;s Deals</div>
                <div className="text-brand-fg/70 text-xs mt-0.5">Ad resets every Wednesday</div>
              </div>
              <span className="text-brand-fg/60 text-lg">→</span>
            </Link>
          </div>

          {/* Primary nav */}
          <div className="px-4 pt-4">
            <p className="label-eyebrow text-muted-fg mb-2 px-1">Shop &amp; Explore</p>
            <nav className="flex flex-col gap-0.5">
              {PRIMARY_NAV.filter(l => l.href !== "/weekly-ad").map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive(link.href)
                      ? "bg-muted font-semibold text-card-fg"
                      : "text-card-fg/70 hover:bg-muted hover:text-card-fg"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && <span className="w-1.5 h-1.5 rounded-full bg-brand" />}
                </Link>
              ))}
            </nav>
          </div>

          {/* Secondary nav */}
          <div className="px-4 pt-5">
            <p className="label-eyebrow text-muted-fg mb-2 px-1">Company</p>
            <nav className="flex flex-col gap-0.5">
              {SECONDARY_NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive(link.href)
                      ? "bg-muted font-semibold text-card-fg"
                      : "text-muted-fg hover:bg-muted hover:text-card-fg"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social links in drawer */}
          <div className="px-4 pt-5">
            <p className="label-eyebrow text-muted-fg mb-3 px-1">Follow Us</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { href: SOCIAL_LINKS.instagram.href, label: 'Instagram', icon: <IgIcon />, cls: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400' },
                { href: SOCIAL_LINKS.facebook.href,  label: 'Facebook',  icon: <FbIcon />, cls: 'bg-[#1877F2]' },
                { href: SOCIAL_LINKS.tiktok.href,    label: 'TikTok',    icon: <TtIcon />, cls: 'bg-fg' },
                { href: SOCIAL_LINKS.whatsapp.href,  label: 'WhatsApp',  icon: <WaIcon />, cls: 'bg-[#25D366]' },
              ].map(({ href, label, icon, cls }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cls} flex items-center gap-2 px-3 py-2.5 rounded-lg text-white text-sm font-medium hover:opacity-80 transition-opacity`}
                >
                  {icon} {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer footer */}
        <div className="px-4 py-4 border-t border-border bg-muted">
          <a
            href={BRAND.phone.link}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-border hover:bg-card transition-colors text-sm font-semibold text-card-fg"
          >
            📞 <span>{BRAND.phone.display}</span>
            <span className="text-xs text-muted-fg font-normal">· Open Daily 7AM–10PM</span>
          </a>
        </div>
      </div>
    </>
  );
}
