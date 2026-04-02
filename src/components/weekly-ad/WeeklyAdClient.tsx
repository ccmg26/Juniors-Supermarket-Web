'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Special } from '@/types'

type DealCategory =
  | 'All'
  | 'Meat'
  | 'Produce'
  | 'Dairy'
  | 'Grocery'
  | 'Deli Cuts'
  | 'Restaurant'
  | 'Bakery'
  | 'Tortilleria'
  | 'Pay & Service Center'

const CAT_STYLES: Record<string, { bar: string; label: string; pct: string; price: string }> = {
  Meat:                   { bar: 'bg-red-900',    label: 'text-red-300',    pct: 'bg-red-700 text-red-100',    price: 'text-red-600 dark:text-red-400'    },
  Produce:                { bar: 'bg-green-900',  label: 'text-green-300',  pct: 'bg-green-700 text-green-100',  price: 'text-green-700 dark:text-green-400'  },
  Dairy:                  { bar: 'bg-blue-900',   label: 'text-blue-300',   pct: 'bg-blue-700 text-blue-100',   price: 'text-blue-700 dark:text-blue-400'   },
  Bakery:                 { bar: 'bg-amber-900',  label: 'text-amber-300',  pct: 'bg-amber-700 text-amber-100',  price: 'text-amber-700 dark:text-amber-400'  },
  Tortilleria:            { bar: 'bg-orange-900', label: 'text-orange-300', pct: 'bg-orange-700 text-orange-100', price: 'text-orange-700 dark:text-orange-400' },
  Grocery:                { bar: 'bg-gray-700',   label: 'text-gray-300',   pct: 'bg-gray-600 text-gray-100',   price: 'text-gray-700 dark:text-gray-300'   },
  'Deli Cuts':            { bar: 'bg-yellow-900', label: 'text-yellow-300', pct: 'bg-yellow-700 text-yellow-100', price: 'text-yellow-700 dark:text-yellow-400' },
  Restaurant:             { bar: 'bg-pink-900',   label: 'text-pink-300',   pct: 'bg-pink-700 text-pink-100',   price: 'text-pink-700 dark:text-pink-400'   },
  'Pay & Service Center': { bar: 'bg-purple-900', label: 'text-purple-300', pct: 'bg-purple-700 text-purple-100', price: 'text-purple-700 dark:text-purple-400' },
}

function savingsPct(sale: string, orig: string | null): number {
  if (!orig) return 0
  const s = parseFloat(sale.replace(/[^0-9.]/g, ''))
  const o = parseFloat(orig.replace(/[^0-9.]/g, ''))
  if (!o || !s || s >= o) return 0
  return Math.round(((o - s) / o) * 100)
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    month: 'short', day: 'numeric'
  })
}

function getDaysUntilWednesday(): number {
  const day = new Date().getDay()
  const daysUntil = (3 - day + 7) % 7
  return daysUntil === 0 ? 7 : daysUntil
}

function DealCard({ deal }: { deal: Special }) {
  const cat = CAT_STYLES[deal.category] ?? CAT_STYLES.Grocery
  const pct = savingsPct(deal.price, deal.original_price)

  return (
    <article className="flex flex-col rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow">
      <div className={`${cat.bar} flex items-center justify-between px-3 py-1.5`}>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${cat.label}`}>
          {deal.category}
        </span>
        {pct > 0 && (
          <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 ${cat.pct}`}>
            Save {pct}%
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-4">
        <p className="font-bold text-gray-900 dark:text-white text-sm leading-snug mb-3">
          {deal.title}
        </p>
        <div className="mt-auto">
          <div className="flex items-end gap-2 flex-wrap">
            <span className={`text-2xl font-black leading-none ${cat.price}`}>
              {deal.price}
            </span>
            {deal.original_price && (
              <span className="text-sm text-gray-400 line-through pb-0.5">
                {deal.original_price}
              </span>
            )}
          </div>
          <div className="border-t border-gray-100 dark:border-gray-800 mt-3 pt-2 flex items-center justify-between gap-2">
            <span className="text-xs text-gray-400">
              Valid {formatDate(deal.valid_from)} – {formatDate(deal.valid_to)}
            </span>
            {deal.disclaimer && (
              <span className="text-[10px] text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-0.5 shrink-0">
                {deal.disclaimer}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

interface Props {
  specials: Special[]
}

export default function WeeklyAdClient({ specials }: Props) {
  const [activeCategory, setActiveCategory] = useState<DealCategory>('All')
  const [noticeDismissed, setNoticeDismissed] = useState(false)

  const daysUntil = getDaysUntilWednesday()

  const categories: DealCategory[] = [
    'All',
    ...Array.from(new Set(specials.map(d => d.category as DealCategory)))
  ]

  const filtered = activeCategory === 'All'
    ? specials
    : specials.filter(d => d.category === activeCategory)

  const firstDeal = specials[0]
  const dateRange = firstDeal
    ? `${formatDate(firstDeal.valid_from)} – ${formatDate(firstDeal.valid_to)}`
    : ''

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="bg-fg border-b border-border/20">
        <div className="container-max px-4 py-8">

          {!noticeDismissed && (
            <div className="inline-flex items-center gap-2 bg-fg/80 border border-border/30 rounded-full px-3 py-1.5 mb-4">
              <span className="text-xs text-brand-fg/60">
                🗓 Ad resets every Wednesday — next refresh in{' '}
                <span className="text-brand-fg font-medium">
                  {daysUntil} day{daysUntil !== 1 ? 's' : ''}
                </span>
              </span>
              <button
                onClick={() => setNoticeDismissed(true)}
                className="text-brand-fg/30 hover:text-brand-fg/60 text-xs ml-1"
                aria-label="Dismiss"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="label-eyebrow text-brand/80 mb-1">Resets every Wednesday</p>
              <h1 className="text-3xl font-black text-brand-fg">
                This Week&apos;s Deals
              </h1>
              {dateRange && (
                <p className="text-brand-fg/50 text-sm mt-1">Valid {dateRange}</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-brand-fg/50">
                {specials.length} deals this week
              </span>
              <a
                href="tel:+19565864677"
                className="btn-primary text-sm"
              >
                📞 Call for Details
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category tabs ────────────────────────────────── */}
      <div className="sticky top-0 z-10 bg-card border-b border-border shadow-sm">
        <div className="container-max px-4">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => {
              const count = cat === 'All'
                ? specials.length
                : specials.filter(d => d.category === cat).length
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full
                    text-sm font-medium transition-colors
                    ${isActive
                      ? 'bg-brand text-brand-fg'
                      : 'bg-muted text-muted-fg hover:bg-accent'
                    }
                  `}
                >
                  {cat}
                  <span className={`text-xs rounded-full px-1.5 py-0.5 ${
                    isActive ? 'bg-brand-fg/20 text-brand-fg' : 'bg-border/50 text-muted-fg'
                  }`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Deal grid ────────────────────────────────────── */}
      <div className="container-max px-4 py-8">
        {specials.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🗞</p>
            <p className="font-bold text-fg text-lg mb-2">New ad coming Wednesday</p>
            <p className="text-muted-fg text-sm mb-6">
              Our weekly ad resets every Wednesday. Check back then for the latest deals.
            </p>
            <a href="tel:+19565864677" className="btn-primary">
              📞 Call for Today&apos;s Deals
            </a>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-fg">
            No deals in this category this week.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        )}

        <p className="text-xs text-muted-fg mt-6 text-center">
          * While supplies last. Prices valid at participating locations.
          {dateRange && ` Ad valid ${dateRange}.`}
        </p>
      </div>

      {/* ── Bottom CTA ───────────────────────────────────── */}
      <div className="border-t border-border bg-muted">
        <div className="container-max px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-bold text-fg">Want deals straight to your phone?</p>
            <p className="text-sm text-muted-fg mt-0.5">
              Join the Deals Club — early access every Tuesday before the ad drops.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/#deals-club" className="btn-primary text-sm">
              Join Deals Club
            </Link>
            <Link href="/locations" className="btn-secondary text-sm">
              Find My Store
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
