'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { SOCIAL_LINKS } from '@/lib/social'

// ── Nav link definitions ──────────────────────────────────────────────────────

const PRIMARY_NAV = [
  { label: 'Weekly Ad',   href: '/weekly-ad'   },
  { label: 'Locations',   href: '/locations'   },
  { label: 'Departments', href: '/departments' },
  { label: 'Events',      href: '/events'      },
] as const

const SECONDARY_NAV = [
  { label: 'About Us',    href: '/about'       },
  { label: 'Jobs',        href: '/jobs'        },
  { label: 'Contact',     href: '/contact'     },
  { label: 'Leasing',     href: '/leasing'     },
  { label: 'Suggestions', href: '/suggestions' },
] as const

// ── Social icons (inline so Header has no extra deps) ─────────────────────────

const IgIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)
const FbIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.532-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
)
const TtIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z"/>
  </svg>
)
const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

// ── Component ─────────────────────────────────────────────────────────────────

export default function Header() {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  // Close drawer on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (drawerOpen && drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setDrawerOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [drawerOpen])

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  return (
    <>
      {/* ── Top utility bar ─────────────────────────────────────── */}
      <div className="bg-gray-950 text-gray-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5">
            <span className="text-green-400 font-medium">✓</span>
            EBT / WIC Accepted at All 8 Locations
          </span>
          <a
            href="tel:+19565864677"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <span>📞</span>
            <span className="font-medium text-white">956-JUNIORS</span>
          </a>
        </div>
      </div>

      {/* ── Main header ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-6">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image
                src="/logo.png"
                alt="Junior's Supermarket"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
                priority
              />
              <div className="hidden sm:block">
                <div className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                  Junior&apos;s Supermarket
                </div>
                <div className="text-[10px] font-semibold text-red-600 uppercase tracking-widest leading-tight">
                  The Real Meat People
                </div>
              </div>
            </Link>

            {/* ── Desktop primary nav ─────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
              {PRIMARY_NAV.map(({ label, href }) => {
                const isActive = pathname === href || pathname.startsWith(href + '/')
                const isWeeklyAd = href === '/weekly-ad'

                if (isWeeklyAd) {
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`
                        flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold
                        transition-colors mr-1
                        ${isActive
                          ? 'bg-red-700 text-white'
                          : 'bg-red-600 hover:bg-red-700 text-white'
                        }
                      `}
                    >
                      🗞 {label}
                    </Link>
                  )
                }

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`
                      px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${isActive
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                      }
                    `}
                  >
                    {label}
                  </Link>
                )
              })}
            </nav>

            {/* ── Desktop right side: social + hamburger ──────── */}
            <div className="flex items-center gap-3">

              {/* Social icons — desktop only */}
              <div className="hidden lg:flex items-center gap-1.5">
                <span className="text-xs text-gray-400 mr-1">Follow</span>
                <Link
                  href={SOCIAL_LINKS.instagram.href}
                  target="_blank" rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-7 h-7 rounded-md bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                >
                  <IgIcon />
                </Link>
                <Link
                  href={SOCIAL_LINKS.facebook.href}
                  target="_blank" rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-7 h-7 rounded-md bg-[#1877F2] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                >
                  <FbIcon />
                </Link>
                <Link
                  href={SOCIAL_LINKS.tiktok.href}
                  target="_blank" rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-7 h-7 rounded-md bg-black border border-gray-700 flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                >
                  <TtIcon />
                </Link>
                <Link
                  href={SOCIAL_LINKS.whatsapp.href}
                  target="_blank" rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-7 h-7 rounded-md bg-[#25D366] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                >
                  <WaIcon />
                </Link>
              </div>

              {/* Weekly Ad pill — mobile only */}
              <Link
                href="/weekly-ad"
                className="lg:hidden flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
              >
                🗞 <span>Weekly Ad</span>
              </Link>

              {/* Hamburger — always visible */}
              <button
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
                aria-expanded={drawerOpen}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-600 dark:text-gray-400">
                  <path fillRule="evenodd" d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Drawer overlay ──────────────────────────────────────── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
        />
      )}

      {/* ── Slide-in drawer ─────────────────────────────────────── */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`
          fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw]
          bg-white dark:bg-gray-950
          border-l border-gray-200 dark:border-gray-800
          shadow-2xl flex flex-col
          transition-transform duration-300 ease-in-out
          ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <div>
            <div className="font-bold text-gray-900 dark:text-white text-sm">Junior&apos;s Supermarket</div>
            <div className="text-[10px] text-red-600 font-semibold uppercase tracking-widest">The Real Meat People</div>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>

        {/* Drawer body — scrollable */}
        <div className="flex-1 overflow-y-auto">

          {/* Weekly Ad CTA — top of drawer, prominent */}
          <div className="px-4 pt-4 pb-2">
            <Link
              href="/weekly-ad"
              className="flex items-center justify-between w-full bg-red-600 hover:bg-red-700 text-white rounded-xl px-4 py-3.5 transition-colors"
            >
              <div>
                <div className="font-bold text-sm">🗞 This Week&apos;s Deals</div>
                <div className="text-red-200 text-xs mt-0.5">Ad resets every Wednesday</div>
              </div>
              <span className="text-red-200 text-lg">→</span>
            </Link>
          </div>

          {/* Primary nav section */}
          <div className="px-4 pt-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">
              Shop &amp; Explore
            </p>
            <nav className="flex flex-col gap-0.5">
              {PRIMARY_NAV.filter(n => n.href !== '/weekly-ad').map(({ label, href }) => {
                const isActive = pathname === href || pathname.startsWith(href + '/')
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`
                      flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors
                      ${isActive
                        ? 'bg-gray-100 dark:bg-gray-800 font-semibold text-gray-900 dark:text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }
                    `}
                  >
                    {label}
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Secondary nav section */}
          <div className="px-4 pt-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">
              Company
            </p>
            <nav className="flex flex-col gap-0.5">
              {SECONDARY_NAV.map(({ label, href }) => {
                const isActive = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`
                      flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors
                      ${isActive
                        ? 'bg-gray-100 dark:bg-gray-800 font-semibold text-gray-900 dark:text-white'
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300'
                      }
                    `}
                  >
                    {label}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Social links in drawer */}
          <div className="px-4 pt-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 px-1">
              Follow Us
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'instagram', label: 'Instagram', icon: <IgIcon />, cls: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400' },
                { key: 'facebook',  label: 'Facebook',  icon: <FbIcon />, cls: 'bg-[#1877F2]' },
                { key: 'tiktok',    label: 'TikTok',    icon: <TtIcon />, cls: 'bg-black border border-gray-700' },
                { key: 'whatsapp',  label: 'WhatsApp',  icon: <WaIcon />, cls: 'bg-[#25D366]' },
              ].map(({ key, label, icon, cls }) => (
                <Link
                  key={key}
                  href={SOCIAL_LINKS[key as keyof typeof SOCIAL_LINKS].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    ${cls} flex items-center gap-2 px-3 py-2.5 rounded-lg
                    text-white text-sm font-medium hover:opacity-80 transition-opacity
                  `}
                >
                  {icon}
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer footer — call CTA */}
        <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <a
            href="tel:+19565864677"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-semibold text-gray-800 dark:text-gray-200"
          >
            📞 <span>956-JUNIORS</span>
            <span className="text-xs text-gray-400 font-normal">· Open Daily 7AM–10PM</span>
          </a>
        </div>
      </div>
    </>
  )
}
