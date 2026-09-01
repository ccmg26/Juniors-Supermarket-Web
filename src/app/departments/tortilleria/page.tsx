import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Tortilleria — Handmade Daily",
  description:
    "Junior's Supermarket Tortilleria makes corn and flour tortillas by hand from stone-ground masa every morning. Bulk orders available for catering and events across the Rio Grande Valley.",
  openGraph: {
    title: "Tortilleria | Junior's Supermarket — Made by Hand. Every Single Day.",
    description:
      "Stone-ground masa, hand-pressed corn and flour tortillas, gorditas, tostadas, and fresh masa — made the traditional way every morning.",
  },
};

const PRODUCTS = [
  {
    icon: "🌽",
    name: "Corn Tortillas",
    desc: "Made from stone-ground masa the traditional way. Soft, flavorful, and fresh off the press every morning.",
  },
  {
    icon: "🫓",
    name: "Flour Tortillas",
    desc: "Thin, soft, and perfectly pliable. Available in 6-inch, 8-inch, and large burrito size.",
  },
  {
    icon: "🫙",
    name: "Masa Preparada",
    desc: "Ready-to-use fresh masa for tamales, gorditas, or any recipe calling for masa. Sold by the pound.",
  },
  {
    icon: "🌯",
    name: "Gorditas",
    desc: "Thick hand-pressed corn cakes, perfect for stuffing. Made fresh and available daily.",
  },
  {
    icon: "🫔",
    name: "Tostadas",
    desc: "Crispy, golden tostada shells made in-house from our own corn tortillas.",
  },
  {
    icon: "📦",
    name: "Bulk Orders",
    desc: "Planning a big event? We do bulk tortilla orders for catering and parties. Call ahead.",
  },
];

const STATS = [
  { value: "Fresh Corn", label: "Tortillas Daily" },
  { value: "Fresh Flour", label: "Tortillas Daily" },
  { value: "Stone-Ground", label: "Masa" },
  { value: "Every Morning", label: "Made Fresh" },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Stone-Ground Masa",
    desc: "We start with dried corn kernels nixtamalized and stone-ground into fresh masa — the foundation of real tortillas.",
  },
  {
    step: "02",
    title: "Hand-Pressed Fresh",
    desc: "Each tortilla is pressed by hand, the way families have done it for generations. No shortcuts, no preservatives.",
  },
  {
    step: "03",
    title: "Hot Off the Press",
    desc: "Cooked on a hot comal and stacked warm. Come in the morning for the freshest batch — they go fast.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: "Junior's Supermarket Tortilleria",
  description:
    "Handmade corn and flour tortillas made from stone-ground masa every morning. Fresh masa, gorditas, tostadas, and bulk orders available.",
  url: "https://www.juniorssupermarket.com/departments/tortilleria",
  telephone: BRAND.phone.display,
  openingHours: "Mo-Su 07:00-22:00",
  servesCuisine: "Mexican",
  parentOrganization: {
    "@type": "GroceryStore",
    name: "Junior's Supermarket",
    url: "https://www.juniorssupermarket.com",
    areaServed: "Rio Grande Valley, Texas",
  },
  hasMenu: {
    "@type": "Menu",
    hasMenuSection: PRODUCTS.map((p) => ({
      "@type": "MenuSection",
      name: p.name,
      description: p.desc,
    })),
  },
};

export default function TortilleriaPage() {
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
            MASA
          </span>
        </div>

        {/* Warm amber glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 10% 50%, rgba(100,55,0,0.55) 0%, transparent 70%)",
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
              <span className="h-px w-8 bg-orange-500" />
              <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">
                Tortilleria · Junior&apos;s Supermarket
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
              Made by Hand.{" "}
              <span className="text-orange-400">Every Single Day.</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
              From stone-ground masa to fresh-pressed tortillas — our tortilleria
              does it the way abuela did it. Traditional, fresh, and made every
              morning at all 8 locations.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={BRAND.phone.link}
                className="bg-orange-700 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                📞 Bulk Order Inquiry
              </a>
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
                <div className="text-2xl sm:text-3xl font-black text-orange-400 mb-1">
                  {value}
                </div>
                <div className="text-xs text-gray-500 leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Products grid ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="mb-8">
          <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-2">
            Fresh every morning
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            Everything from the tortilleria
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Made the traditional way — no preservatives, no shortcuts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map(({ icon, name, desc }) => (
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

      {/* ── Traditional Process ───────────────────────────────── */}
      <section className="bg-gray-950 border-t border-gray-800 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest mb-2">
              The old way is the right way
            </p>
            <h2 className="text-2xl font-black text-white">
              The Traditional Process
            </h2>
            <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
              Every tortilla at Junior&apos;s follows the same three steps passed
              down for generations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PROCESS_STEPS.map(({ step, title, desc }) => (
              <div
                key={step}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center"
              >
                <div className="text-4xl font-black text-orange-700 mb-3 opacity-60">
                  {step}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bulk / Catering CTA ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="rounded-2xl bg-red-600 px-6 sm:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-black text-white mb-2">
              Need Tortillas for a Big Event?
            </h2>
            <p className="text-red-100 text-sm leading-relaxed max-w-md">
              We do bulk tortilla orders for quinceañeras, weddings, parties,
              and catering. Call ahead and our team will have them ready for you.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/departments/catering"
              className="bg-white hover:bg-gray-100 text-red-700 font-bold px-6 py-3 rounded-xl text-sm transition-colors text-center"
            >
              🎉 Catering Page
            </Link>
            <a
              href={BRAND.phone.link}
              className="bg-red-700 hover:bg-red-800 border border-red-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors text-center"
            >
              📞 {BRAND.phone.display}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
