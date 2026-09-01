'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import type { Store } from '@/types'

const HOURS = 'Open Daily · 7:00 AM – 10:00 PM'

// Detect if store is currently open (7AM–10PM local time)
function isOpenNow(): boolean {
  const hour = Number(new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    hour: '2-digit',
    hour12: false,
  }).format(new Date()))
  return hour >= 7 && hour < 22
}

interface Props {
  stores: Store[]
}

export default function LocationsClient({ stores }: Props) {
  const [selected, setSelected]   = useState<string | null>(null)
  const [cityFilter, setCityFilter] = useState<string>('All')
  const [open, setOpen]           = useState<boolean | null>(null)

  useEffect(() => {
    setOpen(isOpenNow())
  }, [])

  // Derive city list from stores
  const cities = useMemo(() => {
    const set = new Set(stores.map((s) => s.city))
    return ['All', ...Array.from(set).sort()]
  }, [stores])

  const filteredStores = cityFilter === 'All'
    ? stores
    : stores.filter((s) => s.city === cityFilter)

  const selectedStore = stores.find((s) => s.slug === selected)

  // Reset selection when filter clears it
  useEffect(() => {
    if (selected && !filteredStores.find((s) => s.slug === selected)) {
      setSelected(null)
    }
  }, [cityFilter, filteredStores, selected])

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
            <span className={`w-2 h-2 rounded-full ${open === true ? 'bg-green-400 animate-pulse' : 'bg-border'}`} />
            <span className={`text-xs font-semibold ${open === true ? 'text-green-400' : 'text-muted-fg'}`}>
              {open === null ? 'Open daily, 7:00 AM–10:00 PM' : open ? 'All stores open right now' : 'Stores open at 7:00 AM'}
            </span>
          </div>
        </div>
      </div>

      {/* ── City filter bar ──────────────────────────────────── */}
      <div className="bg-muted border-b border-border">
        <div className="container-max px-4 py-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-muted-fg mr-1 shrink-0">Filter by city:</span>
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => { setCityFilter(city); setSelected(null); }}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors shrink-0 ${
                  cityFilter === city
                    ? 'bg-brand text-brand-fg'
                    : 'bg-card border border-border text-fg hover:border-brand/50 hover:text-brand'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Map + cards layout ────────────────────────────────── */}
      <div className="container-max px-4 py-8">
        <div className="lg:grid lg:grid-cols-5 lg:gap-8">

          {/* ── Store card list — left 2 cols on desktop ─────── */}
          <div className="lg:col-span-2 flex flex-col gap-3 mb-8 lg:mb-0">

            {filteredStores.length === 0 && (
              <div className="text-center py-10 text-muted-fg text-sm">
                No stores in {cityFilter}
              </div>
            )}

            {filteredStores.map((store) => {
              const isSelected = selected === store.slug
              const phoneRaw = store.phone.replace(/\D/g, '')
              const directionsUrl = store.google_maps_url ||
                (store.lat && store.lng
                  ? `https://maps.google.com/maps?q=${store.lat},${store.lng}`
                  : `https://maps.google.com/maps?q=${encodeURIComponent(`${store.address}, ${store.city}, ${store.state} ${store.zip}`)}`)

              // WhatsApp pre-filled message for this store's city
              const waMessage = encodeURIComponent(
                `Hi, I'd like to place an order. Junior's ${store.name} — ${store.city}`
              )
              const waUrl = `https://wa.me/19565864677?text=${waMessage}`

              return (
                <article
                  key={store.slug}
                  className={`
                    w-full text-left rounded-2xl border transition-all duration-200
                    ${isSelected
                      ? 'border-brand bg-brand/10 shadow-lg shadow-brand/20'
                      : 'border-border bg-card hover:border-border/60'
                    }
                  `}
                >
                  <div className="p-4">
                    {/* Name row */}
                    <button
                      type="button"
                      onClick={() => setSelected(isSelected ? null : store.slug)}
                      aria-expanded={isSelected}
                      aria-controls={`store-details-${store.slug}`}
                      className="w-full text-left flex items-start justify-between gap-2 mb-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className={`text-sm font-bold ${isSelected ? 'text-brand' : 'text-fg'}`}>
                            Junior&apos;s — {store.name}
                          </h2>
                          {open === true && (
                            <span className="text-[10px] font-semibold bg-green-950 border border-green-900 text-green-400 rounded-full px-2 py-0.5">
                              Open Now
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-fg mt-0.5">
                          {store.address}, {store.city}, {store.state} {store.zip}
                        </p>
                      </div>
                      <span className={`text-xs mt-0.5 shrink-0 ${isSelected ? 'text-brand' : 'text-muted-fg'}`}>
                        {isSelected ? '▲' : '▼'}
                      </span>
                    </button>

                    {/* Hours */}
                    <p className="text-xs text-muted-fg mb-3">🕐 {HOURS}</p>

                    {/* Primary action row */}
                    <div className="flex gap-2 mb-2">
                      <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 text-center text-xs font-semibold py-2 rounded-lg bg-muted hover:bg-muted/60 text-fg transition-colors"
                      >
                        📍 Directions
                      </a>
                      <a
                        href={`tel:${phoneRaw}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 text-center text-xs font-semibold py-2 rounded-lg bg-brand/10 hover:bg-brand/20 text-brand border border-brand/20 transition-colors"
                      >
                        📞 {store.phone}
                      </a>
                    </div>

                    {/* WhatsApp order row */}
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-lg bg-green-600/10 hover:bg-green-600/20 text-green-600 dark:text-green-400 border border-green-600/20 transition-colors"
                    >
                      💬 Order from This Location via WhatsApp
                    </a>

                    {/* Expanded panel */}
                    {isSelected && (
                      <div id={`store-details-${store.slug}`} className="mt-3 pt-3 border-t border-brand/20 flex flex-col gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold text-green-400 bg-green-950 border border-green-900 rounded-full px-2 py-0.5">
                            ✓ EBT / WIC Accepted
                          </span>
                          <span className="text-[10px] font-bold text-blue-400 bg-blue-950 border border-blue-900 rounded-full px-2 py-0.5">
                            🛒 All Departments
                          </span>
                        </div>
                        <Link
                          href={`/locations/${store.slug}`}
                          className="text-xs font-semibold text-brand hover:text-brand/80 transition-colors"
                        >
                          View full store details →
                        </Link>
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>

          {/* ── Map panel — right 3 cols on desktop ──────────── */}
          <div className="lg:col-span-3">
            <div className="sticky top-20">

              {/* Map iframe */}
              <div className="rounded-2xl overflow-hidden border border-border mb-4">
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
                      ? selectedStore.lat && selectedStore.lng
                        ? `https://maps.google.com/maps?q=${selectedStore.lat},${selectedStore.lng}&output=embed`
                        : `https://maps.google.com/maps?q=${encodeURIComponent(`${selectedStore.address}, ${selectedStore.city}, ${selectedStore.state} ${selectedStore.zip}`)}&output=embed`
                      : `https://maps.google.com/maps?q=26.2034,-98.2300&z=10&output=embed`
                  }
                />
              </div>

              {/* Map info footer */}
              <div className="rounded-2xl border border-border bg-card p-4 mb-4">
                {selectedStore ? (
                  <div>
                    <p className="text-xs text-muted-fg mb-1">Showing</p>
                    <p className="text-sm font-bold text-fg">
                      Junior&apos;s — {selectedStore.name}
                    </p>
                    <p className="text-xs text-muted-fg">
                      {selectedStore.address}, {selectedStore.city}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <Link
                        href={`/locations/${selectedStore.slug}`}
                        className="text-xs font-semibold text-brand hover:text-brand/80"
                      >
                        Store details →
                      </Link>
                      <button
                        onClick={() => setSelected(null)}
                        className="text-xs text-muted-fg hover:text-fg font-medium"
                      >
                        ← All locations
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-fg">
                        {cityFilter === 'All' ? 'All 8 Junior\'s locations' : `${filteredStores.length} location${filteredStores.length !== 1 ? 's' : ''} in ${cityFilter}`}
                      </p>
                      <p className="text-xs text-muted-fg mt-0.5">
                        Select a store on the left to zoom in
                      </p>
                    </div>
                    <span className="text-xs text-muted-fg bg-muted rounded-full px-3 py-1">
                      Rio Grande Valley, TX
                    </span>
                  </div>
                )}
              </div>

              {/* Quick-order from map panel */}
              <div className="rounded-2xl border border-green-800/40 bg-green-950/20 p-4">
                <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-1">
                  Order by WhatsApp
                </p>
                <p className="text-sm text-gray-300 mb-3">
                  Select a store above, then tap Order via WhatsApp to send your request directly.
                </p>
                <a
                  href="https://wa.me/19565864677"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white text-sm font-bold transition-colors"
                >
                  💬 Open WhatsApp
                </a>
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
          <div className="flex gap-3 shrink-0">
            <a
              href="tel:+19565864677"
              className="btn-primary text-sm"
            >
              📞 Call 956-JUNIORS
            </a>
            <a
              href="https://wa.me/19565864677"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
