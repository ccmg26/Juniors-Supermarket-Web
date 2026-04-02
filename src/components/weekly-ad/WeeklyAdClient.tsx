'use client'

import { useState } from 'react'
import Link from 'next/link'
import StaticDealCard from '@/components/ui/StaticDealCard'
import { CURRENT_DEALS, ACTIVE_CATEGORIES } from '@/lib/deals'
import type { DealCategory } from '@/lib/deals'

// ── Wednesday countdown helper ────────────────────────────────────────────────
function getDaysUntilWednesday(): number {
  const now = new Date()
  const day = now.getDay() // 0=Sun, 3=Wed
  const daysUntil = (3 - day + 7) % 7
  return daysUntil === 0 ? 7 : daysUntil // if today IS Wednesday, next one is 7 days
}

export default function WeeklyAdClient() {
  const [activeCategory, setActiveCategory] = useState<DealCategory>('All')
  const [noticeDismissed, setNoticeDismissed] = useState(false)

  const daysUntil = getDaysUntilWednesday()

  const filtered =
    activeCategory === 'All'
      ? CURRENT_DEALS
      : CURRENT_DEALS.filter((d) => d.category === activeCategory)

  // Date range from first deal
  const firstDeal = CURRENT_DEALS[0]
  const dateRange = firstDeal
    ? `${firstDeal.validFrom} – ${firstDeal.validThru}`
    : ''

  return (
    <>
      {/* ── Page hero ─────────────────────────────────────────────── */}
      <div className="bg-gray-950 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">

          {/* Wednesday reset notice */}
          {!noticeDismissed && (
            <div className="inline-flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-full px-3 py-1.5 mb-4">
              <span className="text-xs text-gray-400">
                🗓 Ad resets every Wednesday — next refresh in{' '}
                <span className="text-white font-medium">{daysUntil} day{daysUntil !== 1 ? 's' : ''}</span>
              </span>
              <button
                onClick={() => setNoticeDismissed(true)}
                className="text-gray-600 hover:text-gray-400 text-xs ml-1"
                aria-label="Dismiss"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-1">
                Resets every Wednesday
              </p>
              <h1 className="text-3xl font-bold text-white">
                This Week&apos;s Deals
              </h1>
              {dateRange && (
                <p className="text-gray-400 text-sm mt-1">Valid {dateRange}</p>
              )}
            </div>

            {/* Deal count + call CTA */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">
                {CURRENT_DEALS.length} deals this week
              </span>
              <a
                href="tel:+19565864677"
                className="text-sm bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                📞 Call for Details
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category filter tabs ───────────────────────────────────── */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {ACTIVE_CATEGORIES.map((cat) => {
              const count =
                cat === 'All'
                  ? CURRENT_DEALS.length
                  : CURRENT_DEALS.filter((d) => d.category === cat).length
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors
                    ${
                      isActive
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  {cat}
                  <span
                    className={`text-xs rounded-full px-1.5 py-0.5 ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Deal grid ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No deals in this category this week.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((deal) => (
              <StaticDealCard key={deal.id} deal={deal} size="lg" />
            ))}
          </div>
        )}

        {/* Fine print */}
        <p className="text-xs text-gray-400 mt-6 text-center">
          * While supplies last. Prices valid at participating locations.
          Ad valid {dateRange}.
        </p>
      </div>

      {/* ── Bottom CTA strip ──────────────────────────────────────── */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              Want deals straight to your phone?
            </p>
            <p className="text-sm text-gray-500 mt-0.5">
              Join the Deals Club — early access every Tuesday before the ad drops.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              href="/#deals-club"
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              Join Deals Club
            </Link>
            <Link
              href="/locations"
              className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              Find My Store
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
