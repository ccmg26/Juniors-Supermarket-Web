import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Produce — Farm-Fresh Daily",
  description:
    "Junior's Supermarket Produce department stocks fresh vegetables, fruits, chiles, herbs, avocados, and seasonal picks daily. The best produce selection in the Rio Grande Valley.",
  openGraph: {
    title: "Produce | Junior's Supermarket — Farm-Fresh, Valley-Proud",
    description:
      "Fresh vegetables, fruits, chiles, herbs, avocados, and more — restocked daily at all 8 Junior's Supermarket locations.",
  },
};

const CATEGORIES = [
  {
    icon: "🥦",
    name: "Fresh Vegetables",
    desc: "Broccoli, carrots, chiles, onions, cilantro, nopales, and more. Restocked daily for peak freshness.",
  },
  {
    icon: "🍎",
    name: "Fresh Fruits",
    desc: "Mangoes, watermelon, oranges, apples, and tropical fruits. Seasonal selections change weekly.",
  },
  {
    icon: "🌶️",
    name: "Chiles & Peppers",
    desc: "Jalapeños, serranos, anchos, poblanos, and dried chiles. The best selection in the Valley.",
  },
  {
    icon: "🧅",
    name: "Onions & Garlic",
    desc: "White, red, and yellow onions. Fresh garlic bulbs and pre-peeled options. Sold by the bag or bulk.",
  },
  {
    icon: "🌿",
    name: "Fresh Herbs",
    desc: "Cilantro, epazote, hierba santa, mint, and more. Fresh bunches daily — the foundation of every Valley recipe.",
  },
  {
    icon: "🥑",
    name: "Avocados",
    desc: "Ripe avocados ready today and firm ones ready by the weekend. We always have both.",
  },
];

const STATS = [
  { value: "Fresh Daily", label: "Restocked Every Day" },
  { value: "Seasonal", label: "Picks Every Week" },
  { value: "Local &", label: "Imported Selections" },
  { value: "Full", label: "Selection Always" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GroceryStore",
  name: "Junior's Supermarket Produce",
  description:
    "Fresh daily produce including vegetables, fruits, chiles, herbs, avocados, and seasonal items. Restocked every day at all 8 RGV locations.",
  url: "https://www.juniorssupermarket.com/departments/produce",
  telephone: BRAND.phone.display,
  openingHours: "Mo-Su 07:00-22:00",
  areaServed: "Rio Grande Valley, Texas",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Fresh Produce",
    itemListElement: CATEGORIES.map((c) => ({
      "@type": "Offer",
      name: c.name,
      description: c.desc,
    })),
  },
  parentOrganization: {
    "@type": "GroceryStore",
    name: "Junior's Supermarket",
    url: "https://www.juniorssupermarket.com",
  },
};

export default function ProducePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative bg-gray-950 overflow-hidden">
        {/* Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-end pr-8 opacity-[0.035] select-none"
        >
          <span className="text-[130px] font-black text-white leading-none tracking-tighter">
            FRESH
          </span>
        </div>

        {/* Green glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 10% 50%, rgba(0,80,30,0.55) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="max-w-2xl">
            <Link
              href="/departments"
              className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors mb-5"
            >
              ← All Departments
            </Link>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-green-500" />
              <span className="text-xs font-semibold text-green-400 uppercase tracking-widest">
                Produce · Junior&apos;s Supermarket
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
              Farm-Fresh,{" "}
              <span className="text-green-400">Valley-Proud</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
              Vegetables, fruits, chiles, herbs, and avocados restocked every
              single day. The freshest produce in the Rio Grande Valley, at
              prices your family can count on.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/weekly-ad"
                className="bg-green-700 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                🗞 This Week&apos;s Produce Deals
              </Link>
              <Link
                href="/locations"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                📍 Find a Store
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stat bar ──────────────────────────────────────────── */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-800">
            {STATS.map(({ value, label }) => (
              <div key={`${value}-${label}`} className="py-6 px-4 text-center">
                <div className="text-2xl sm:text-3xl font-black text-green-400 mb-1">
                  {value}
                </div>
                <div className="text-xs text-gray-500 leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Categories grid ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="mb-8">
          <p className="text-xs font-semibold text-green-600 dark:text-green-500 uppercase tracking-widest mb-2">
            What we carry
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            Full produce selection
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Everything you need, restocked daily so it&apos;s always at its peak.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map(({ icon, name, desc }) => (
            <div
              key={name}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6"
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                {name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── "Fresh Every Day" guarantee ───────────────────────── */}
      <section className="bg-gray-950 border-t border-gray-800 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-2xl bg-green-950/40 border border-green-900/50 px-6 sm:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-2">
                Our promise
              </p>
              <h2 className="text-2xl font-black text-white mb-2">
                Fresh Every Day — Guaranteed
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-md">
                Our produce team stocks the shelves every single morning. If it
                doesn&apos;t meet our freshness standard, it doesn&apos;t go out. That&apos;s the
                Junior&apos;s produce promise.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Link
                href="/weekly-ad"
                className="bg-green-700 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors text-center"
              >
                🗞 Weekly Deals
              </Link>
              <a
                href={BRAND.phone.link}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors text-center"
              >
                📞 {BRAND.phone.display}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── EBT / WIC + locations ─────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="rounded-2xl bg-green-950/40 border border-green-900/50 p-6 flex gap-5 items-start">
            <div className="text-3xl shrink-0">✅</div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                EBT &amp; WIC Accepted
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                EBT and WIC accepted at all 8 Junior&apos;s locations.
                Fresh produce for every family in the Valley.
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                Available at All 8 Locations
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Every Junior&apos;s Supermarket carries a full produce section —
                from Penitas to San Juan, Edinburg to Hidalgo.
              </p>
            </div>
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              📍 Find My Store →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
