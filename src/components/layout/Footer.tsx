import Link from 'next/link'
import Image from 'next/image'
import { SOCIAL_LINKS } from '@/lib/social'

// ── Social icons (inline) ─────────────────────────────────────────────────────
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

const SOCIAL = [
  { key: 'instagram', label: 'Instagram', icon: <IgIcon />, cls: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400' },
  { key: 'facebook',  label: 'Facebook',  icon: <FbIcon />, cls: 'bg-[#1877F2]'  },
  { key: 'tiktok',    label: 'TikTok',    icon: <TtIcon />, cls: 'bg-black border border-gray-700' },
  { key: 'whatsapp',  label: 'WhatsApp',  icon: <WaIcon />, cls: 'bg-[#25D366]'  },
] as const

const NAV_COLS = [
  {
    heading: 'Shop',
    links: [
      { label: 'Weekly Ad',    href: '/weekly-ad'   },
      { label: 'Departments',  href: '/departments' },
      { label: 'Events',       href: '/events'      },
    ],
  },
  {
    heading: 'Locations',
    links: [
      { label: 'All Locations',      href: '/locations' },
      { label: 'Store Hours & Info', href: '/contact'   },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us',   href: '/about'   },
      { label: 'Jobs',       href: '/jobs'    },
      { label: 'Leasing',    href: '/leasing' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    heading: 'More',
    links: [
      { label: 'Suggestions',    href: '/suggestions' },
      { label: 'Privacy Policy', href: '/privacy'     },
      { label: 'Terms of Use',   href: '/terms'       },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800">

      {/* ── Main footer body ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Brand column — takes 2 of 5 cols on desktop */}
          <div className="lg:col-span-2">
            {/* Logo + wordmark */}
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Junior's Supermarket"
                width={44}
                height={44}
                className="w-11 h-11 object-contain"
              />
              <div>
                <div className="text-base font-bold text-white leading-tight">
                  Junior&apos;s Supermarket
                </div>
                <div className="text-[10px] font-semibold text-red-500 uppercase tracking-widest leading-tight">
                  The Real Meat People
                </div>
              </div>
            </Link>

            <p className="text-sm text-gray-500 leading-relaxed mb-4 max-w-xs">
              Serving the Rio Grande Valley since day one — fresh meat,
              family value, and community pride at every location.
            </p>

            {/* EBT badge */}
            <div className="inline-flex items-center gap-2 bg-green-950/50 border border-green-900/50 rounded-xl px-3 py-2 mb-6">
              <span className="text-green-400 font-bold text-xs">✓</span>
              <span className="text-xs font-semibold text-green-300">
                EBT / WIC Accepted at All Locations
              </span>
            </div>

            {/* Social icons */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                Follow Us
              </p>
              <div className="flex gap-2">
                {SOCIAL.map(({ key, label, icon, cls }) => (
                  <Link
                    key={key}
                    href={SOCIAL_LINKS[key as keyof typeof SOCIAL_LINKS].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`
                      ${cls}
                      w-9 h-9 rounded-xl flex items-center justify-center
                      text-white hover:opacity-80 transition-opacity
                    `}
                  >
                    {icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {NAV_COLS.map(({ heading, links }) => (
              <div key={heading}>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  {heading}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {links.map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-sm text-gray-500 hover:text-white transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────── */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Junior&apos;s Supermarket. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              Terms
            </Link>
            <span className="text-xs text-gray-700">Rio Grande Valley, TX</span>
          </div>
        </div>
      </div>

      {/* ── Mobile sticky bottom bar ──────────────────────────── */}
      {/* Fixed-positioned, renders inside footer element for semantics */}
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 safe-area-pb">
        <div className="grid grid-cols-4">
          {[
            { href: '/weekly-ad',       icon: '🗞',  label: 'Weekly Ad',   primary: true  },
            { href: '/locations',       icon: '📍',  label: 'Stores',      primary: false },
            { href: 'tel:+19565864677', icon: '📞',  label: 'Call',        primary: false },
            { href: '/departments',     icon: '🛒',  label: 'Departments', primary: false },
          ].map(({ href, icon, label, primary }) => (
            <Link
              key={label}
              href={href}
              className={`
                flex flex-col items-center justify-center gap-0.5 py-2.5
                text-center transition-colors
                ${primary
                  ? 'bg-red-600 hover:bg-red-500'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-900'
                }
              `}
            >
              <span className="text-lg leading-none">{icon}</span>
              <span className={`text-[10px] font-semibold leading-tight ${primary ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Spacer so page content isn't hidden behind mobile bar */}
      <div className="h-16 lg:hidden" aria-hidden="true" />

    </footer>
  )
}
