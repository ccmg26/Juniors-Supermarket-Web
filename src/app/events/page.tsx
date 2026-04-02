import type { Metadata } from 'next'
import Link from 'next/link'
import { EVENTS, StoreEvent } from '@/lib/events'
import { SOCIAL_LINKS } from '@/lib/social'

export const metadata: Metadata = {
  title: 'Events & Promotions',
  description:
    "See what's happening at Junior's Supermarket — seasonal promotions, BBQ specials, Lenten seafood deals, and community events across all RGV locations.",
}

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

// ── Event card component ──────────────────────────────────────────────────────
function EventCard({ event }: { event: StoreEvent }) {
  const isFeatured = event.featured

  return (
    <article className={`
      rounded-2xl overflow-hidden border transition-all duration-200
      ${isFeatured
        ? 'border-red-900/60 bg-gray-900 shadow-xl shadow-red-950/20'
        : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md'
      }
    `}>
      {/* Accent bar — thicker for featured */}
      <div className={`h-1.5 ${isFeatured ? 'bg-red-600' : 'bg-gray-200 dark:bg-gray-800'}`} />

      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-6">

          {/* Emoji icon block */}
          <div className={`
            w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center text-4xl
            ${isFeatured
              ? 'bg-red-950/50 border border-red-900/50'
              : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
            }
          `}>
            {event.emoji}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">

            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {isFeatured && (
                <span className="text-[10px] font-bold bg-red-600 text-white rounded-full px-2.5 py-1 uppercase tracking-wide">
                  Featured Event
                </span>
              )}
              <span className={`
                text-[10px] font-semibold rounded-full px-2.5 py-1 border
                ${event.status === 'active'
                  ? 'bg-green-950/50 border-green-900/50 text-green-400'
                  : event.status === 'upcoming'
                  ? 'bg-amber-950/50 border-amber-900/50 text-amber-400'
                  : 'bg-gray-800 border-gray-700 text-gray-500'
                }
              `}>
                {event.status === 'active' ? '● Happening Now' : event.status === 'upcoming' ? '◎ Coming Soon' : '○ Ended'}
              </span>
              <span className="text-[10px] text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-full px-2.5 py-1">
                📍 {event.locations}
              </span>
            </div>

            {/* Title + dates */}
            <h2 className={`text-xl font-black mb-1 ${isFeatured ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
              {event.title}
            </h2>
            <p className={`text-sm font-semibold mb-3 ${isFeatured ? 'text-red-400' : 'text-red-600 dark:text-red-400'}`}>
              📅 {event.dateFrom} – {event.dateTo}
            </p>

            {/* Description */}
            <p className={`text-sm leading-relaxed mb-5 ${isFeatured ? 'text-gray-300' : 'text-gray-600 dark:text-gray-400'}`}>
              {event.description}
            </p>

            {/* Social callout */}
            {event.socialCallout && (
              <div className={`
                rounded-xl px-4 py-3 mb-5 flex items-start gap-2
                ${isFeatured
                  ? 'bg-white/5 border border-white/10'
                  : 'bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30'
                }
              `}>
                <span className="text-base shrink-0">📣</span>
                <p className={`text-xs leading-relaxed ${isFeatured ? 'text-gray-400' : 'text-amber-800 dark:text-amber-300'}`}>
                  {event.socialCallout}
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/weekly-ad"
                className={`
                  inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors
                  ${isFeatured
                    ? 'bg-red-600 hover:bg-red-500 text-white'
                    : 'bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50'
                  }
                `}
              >
                🗞 View Deals
              </Link>
              <Link
                href={SOCIAL_LINKS.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors
                  ${isFeatured
                    ? 'bg-white/10 hover:bg-white/20 border border-white/15 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                  }
                `}
              >
                <IgIcon />
                Follow for Updates
              </Link>
            </div>

          </div>
        </div>
      </div>
    </article>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function EventsPage() {
  const featured = EVENTS.filter((e) => e.featured)
  const rest     = EVENTS.filter((e) => !e.featured)

  return (
    <>
      {/* ── Page hero ─────────────────────────────────────────── */}
      <div className="bg-gray-950 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-2">
            What&apos;s happening
          </p>
          <h1 className="text-3xl font-black text-white mb-2">
            Events &amp; Promotions
          </h1>
          <p className="text-gray-400 text-sm max-w-lg">
            From BBQ season to Lenten specials — Junior&apos;s celebrates every
            season with the Valley community.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-5">

        {/* Featured events first */}
        {featured.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}

        {/* Divider if there are non-featured events too */}
        {rest.length > 0 && featured.length > 0 && (
          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              More Events
            </span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
          </div>
        )}

        {/* Non-featured events */}
        {rest.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}

        {/* ── Follow us CTA block ───────────────────────────── */}
        <div className="rounded-2xl bg-gray-950 border border-gray-800 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-lg font-black text-white mb-2">
                Never miss a deal or event
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                Follow Junior&apos;s on social media for early previews, flash
                deals, and event announcements — usually before they hit
                the website.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href={SOCIAL_LINKS.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:opacity-90 text-white font-bold text-sm px-6 py-3 rounded-xl transition-opacity"
              >
                <IgIcon />
                Follow on Instagram
              </Link>
              <Link
                href={SOCIAL_LINKS.facebook.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#1565d8] text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors"
              >
                <FbIcon />
                Follow on Facebook
              </Link>
              <Link
                href="/#deals-club"
                className="flex items-center justify-center gap-2 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
              >
                🎁 Join the Deals Club
              </Link>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
