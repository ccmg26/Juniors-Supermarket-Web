'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Store } from '@/types'

const HOURS = 'Open Daily · 7:00 AM – 10:00 PM'

// Detect if store is currently open (7AM–10PM local time)
function isOpenNow(): boolean {
  const hour = new Date().getHours()
  return hour >= 7 && hour < 22
}

interface Props {
  stores: Store[]
}

export default function LocationsClient({ stores }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const open = isOpenNow()

  const selectedStore = stores.find((s) => s.slug === selected)

  return (
    <>
      {/* ── Page hero ─────────────────────────────────────────── */}
      <div className="bg-fg border-b border-border/20">
        <div className="container-max px-4 py-10">
          <p className="label-eyebrow text-brand/80 mb-2">
            Rio Grande Valley, Texas
          </p>
          <h1 className="text-3xl font-black text-brand-fg mb-2">
            Our 8 Locations
          </h1>
          <p className="text-brand-fg/60 text-sm max-w-lg">
            Open daily from 7 AM to 10 PM. EBT and WIC accepted at every store.
          </p>
          {/* Open now pill */}
          <div className="mt-4 inline-flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${open ? 'bg-green-400 animate-pulse' : 'bg-border'}`} />
            <span className={`text-xs font-semibold ${open ? 'text-green-400' : 'text-muted-fg'}`}>
              {open ? 'All stores open right now' : 'Stores open at 7:00 AM'}
            </span>
          </div>
        </div>
      </div>

      {/* ── Map + cards layout ────────────────────────────────── */}
      <div className="container-max px-4 py-8">
        <div className="lg:grid lg:grid-cols-5 lg:gap-8">

          {/* ── Store card list — left 2 cols on desktop ─────── */}
          <div className="lg:col-span-2 flex flex-col gap-3 mb-8 lg:mb-0">
            {stores.map((store) => {
              const isSelected = selected === store.slug
              const phoneRaw = store.phone.replace(/\D/g, '')
              const mapQuery = encodeURIComponent(`${store.address}, ${store.city}, ${store.state} ${store.zip}`)
              return (
                <button
                  key={store.slug}
                  onClick={() => setSelected(isSelected ? null : store.slug)}
                  className={`
                    w-full text-left rounded-2xl border transition-all duration-200
                    ${isSelected
                      ? 'border-red-500 bg-red-950/30 shadow-lg shadow-red-950/20'
                      : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700'
                    }
                  `}
                >
                  <div className="p-4">
                    {/* Name row */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className={`text-sm font-bold ${isSelected ? 'text-red-400' : 'text-gray-900 dark:text-white'}`}>
                            Junior&apos;s — {store.name}
                          </h2>
                          {open && (
                            <span className="text-[10px] font-semibold bg-green-950 border border-green-900 text-green-400 rounded-full px-2 py-0.5">
                              Open Now
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {store.address}, {store.city}, {store.state} {store.zip}
                        </p>
                      </div>
                      <span className={`text-xs mt-0.5 shrink-0 ${isSelected ? 'text-red-400' : 'text-gray-400'}`}>
                        {isSelected ? '▲' : '▼'}
                      </span>
                    </div>

                    {/* Hours */}
                    <p className="text-xs text-gray-500 mb-3">🕐 {HOURS}</p>

                    {/* Action buttons — always visible */}
                    <div className="flex gap-2">
                      <a
                        href={`https://maps.google.com/maps?q=${mapQuery}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 text-center text-xs font-semibold py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                      >
                        📍 Directions
                      </a>
                      <a
                        href={`tel:${phoneRaw}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 text-center text-xs font-semibold py-2 rounded-lg bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50 transition-colors"
                      >
                        📞 {store.phone}
                      </a>
                    </div>

                    {/* Expanded panel */}
                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-red-900/30 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-green-400 bg-green-950 border border-green-900 rounded-full px-2 py-0.5">
                            ✓ EBT / WIC Accepted
                          </span>
                        </div>
                        <Link
                          href={`/locations/${store.slug}`}
                          className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
                        >
                          View store details →
                        </Link>
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* ── Map panel — right 3 cols on desktop ──────────── */}
          <div className="lg:col-span-3">
            <div className="sticky top-20">

              {/* Map iframe */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 mb-4">
                <iframe
                  title="Junior's Supermarket Locations"
                  width="100%"
                  height="480"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={
                    selectedStore
                      ? `https://maps.google.com/maps?q=${encodeURIComponent(`${selectedStore.address}, ${selectedStore.city}, ${selectedStore.state} ${selectedStore.zip}`)}&output=embed`
                      : `https://maps.google.com/maps?q=Junior%27s+Supermarket+Rio+Grande+Valley+TX&output=embed`
                  }
                />
              </div>

              {/* Map footer */}
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
                {selectedStore ? (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Showing</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      Junior&apos;s — {selectedStore.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedStore.address}, {selectedStore.city}
                    </p>
                    <button
                      onClick={() => setSelected(null)}
                      className="mt-2 text-xs text-red-500 hover:text-red-400 font-medium"
                    >
                      ← Show all locations
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        All 8 Junior&apos;s locations
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Select a store on the left to zoom in
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
                      Rio Grande Valley, TX
                    </span>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom CTA ────────────────────────────────────────── */}
      <div className="border-t border-border bg-muted">
        <div className="container-max px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-fg text-sm">
              Can&apos;t find what you need?
            </p>
            <p className="text-sm text-muted-fg mt-0.5">
              Call any location — we&apos;re happy to help, 7 AM to 10 PM daily.
            </p>
          </div>
          <a
            href="tel:+19565864677"
            className="btn-primary shrink-0 text-sm"
          >
            📞 Call 956-JUNIORS
          </a>
        </div>
      </div>
    </>
  )
}
