import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Meat Market – The Real Meat People",
  description:
    "Junior's Supermarket Meat Market: USDA-grade fresh-cut beef, pork, chicken, and specialty meats. Custom butcher orders, marinated carne asada, bulk family packs, and more at 8 Rio Grande Valley locations.",
  openGraph: {
    title: "Junior's Meat Market – The Real Meat People | RGV",
    description:
      "Fresh-cut USDA-grade meats, custom butcher orders, marinated carne asada, and bulk packs at 8 RGV locations. Order by WhatsApp.",
  },
};

const CUTS = [
  {
    emoji: "🥩",
    name: "Beef",
    description:
      "Flank steak, skirt steak, ribeye, T-bone, chuck roast, beef cheeks, brisket, short ribs, and more. USDA-grade, cut fresh daily.",
    highlights: ["Carne asada cuts", "Roasts & brisket", "Ground beef daily"],
  },
  {
    emoji: "🐷",
    name: "Pork",
    description:
      "Pork shoulder, ribs, chops, carnitas cuts, chicharrón, and specialty pork items. Ask about our seasoned options.",
    highlights: ["Carnitas cuts", "Baby back & spare ribs", "Fresh chorizo"],
  },
  {
    emoji: "🐔",
    name: "Chicken",
    description:
      "Whole chickens, leg quarters, thighs, breast, wings, and more. Marinated or fresh — your choice.",
    highlights: ["Whole birds", "Marinated pollo", "Wings & drumsticks"],
  },
  {
    emoji: "🥓",
    name: "Specialty & Charcuterie",
    description:
      "Beef cheeks (cachete), lengua, tripas, buche, menudo cuts, and other specialty items you won't find at a chain store.",
    highlights: ["Beef cheeks & lengua", "Tripas & buche", "Menudo cuts"],
  },
  {
    emoji: "🌶️",
    name: "Marinated Ready-to-Cook",
    description:
      "Our butchers marinate carne asada, al pastor, and pollo in-house using our signature blends. Just throw it on the grill.",
    highlights: ["Carne asada", "Al pastor", "Pollo asado"],
  },
  {
    emoji: "📦",
    name: "Family & Bulk Packs",
    description:
      "Feed the whole family without breaking the bank. Bulk packs for every cut, party bundles, and catering quantities available.",
    highlights: ["Family packs", "Party bundles", "Catering quantities"],
  },
];

const SERVICES = [
  {
    icon: "🔪",
    title: "Custom Butcher Orders",
    desc: "Tell us exactly what you need — thickness, weight, cut. Our butchers will prepare it fresh while you shop.",
  },
  {
    icon: "🌡️",
    title: "Fresh-Cut Daily",
    desc: "Every piece of meat in our case was cut today. We don't sell yesterday's product — full stop.",
  },
  {
    icon: "✅",
    title: "USDA-Grade Only",
    desc: "We carry USDA-grade beef and inspected meats across the board. No compromises on quality.",
  },
  {
    icon: "⚖️",
    title: "Sold by the Pound",
    desc: "Buy exactly what you need. No pre-packaged minimums — we cut to your order, down to the ounce.",
  },
];

const STATS = [
  { value: "USDA", label: "Grade Beef" },
  { value: "Fresh", label: "Cut Daily" },
  { value: "Custom", label: "Butcher Orders" },
  { value: "Bulk", label: "Pricing Available" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MeatEstablishment",
  name: "Junior's Supermarket Meat Market",
  description:
    "USDA-grade fresh-cut beef, pork, chicken, and specialty meats. Custom butcher orders, marinated carne asada, and bulk family packs at 8 Rio Grande Valley locations.",
  url: "https://www.juniorssupermarket.com/departments/meat-market",
  telephone: BRAND.phone.number,
  servesCuisine: ["Mexican", "American", "Tex-Mex"],
  hasMenu: "https://www.juniorssupermarket.com/departments/meat-market/cuts",
  parentOrganization: {
    "@type": "GroceryStore",
    name: "Junior's Supermarket",
    url: "https://www.juniorssupermarket.com",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Rio Grande Valley, Texas",
  },
  openingHours: "Mo-Su 07:00-22:00",
  priceRange: "$$",
};

export default function MeatMarketPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative bg-gray-950 overflow-hidden">
        {/* Background watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-end pr-6 sm:pr-16 opacity-[0.04] select-none"
        >
          <span className="text-[180px] sm:text-[220px] font-black text-white leading-none tracking-tighter">
            🥩
          </span>
        </div>

        {/* Red glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 90% at 5% 50%, rgba(130,0,0,0.55) 0%, transparent 65%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-5">
              <span className="h-px w-8 bg-red-500" />
              <span className="text-xs font-semibold text-red-400 uppercase tracking-widest">
                Meat Market
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
              The Real{" "}
              <span className="text-red-400">Meat People</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
              USDA-grade cuts, real butchers, custom orders. Everything you need —
              the way it&apos;s supposed to be done. Fresh-cut every single morning
              at all 8 of our Rio Grande Valley locations.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={BRAND.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors inline-flex items-center gap-2"
              >
                💬 Order by WhatsApp
              </a>
              <Link
                href="/catering"
                className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                🎉 Catering Orders
              </Link>
              <Link
                href="/departments/meat-market/cuts"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                📖 Cuts Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stat bar ─────────────────────────────────────────── */}
      <div className="bg-gray-900 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-800">
            {STATS.map(({ value, label }) => (
              <div key={label} className="py-6 px-4 text-center">
                <div className="text-2xl sm:text-3xl font-black text-red-400 mb-1">
                  {value}
                </div>
                <div className="text-xs text-gray-500 leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── What we cut ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="mb-10">
          <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-2">
            Our Selection
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-3">
            Everything the Valley needs
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-base">
            From the classic cuts to the specialty items your abuelita asks for —
            if it belongs in a Valley kitchen, we carry it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CUTS.map(({ emoji, name, description, highlights }) => (
            <div
              key={name}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex flex-col"
            >
              <div className="text-4xl mb-4">{emoji}</div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                {name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-1">
                {description}
              </p>
              <ul className="space-y-1">
                {highlights.map((h) => (
                  <li key={h} className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-red-500 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Butcher services ─────────────────────────────────── */}
      <section className="bg-gray-950 border-t border-b border-gray-800 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10">
            <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-2">
              Full Service
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Real butchers. Real service.
            </h2>
            <p className="text-gray-400 max-w-2xl text-base">
              This isn&apos;t a grab-and-go meat section. Our butchers are here every
              day to cut exactly what you need, the way you need it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
              >
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Marinated section ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="rounded-2xl bg-red-950/40 border border-red-900/50 p-8 sm:p-10 flex flex-col sm:flex-row gap-8 items-start sm:items-center">
          <div className="text-5xl shrink-0">🔥</div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-2">
              Ready to Grill
            </p>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
              Marinated in-house — just fire up the grill
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xl mb-4">
              Our butchers season and marinate carne asada, al pastor, and pollo
              asado fresh every day using our own blends. You skip the prep — we
              handle the flavor.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Carne Asada", "Al Pastor", "Pollo Asado", "Costillas"].map((m) => (
                <span
                  key={m}
                  className="bg-red-900/50 border border-red-800 text-red-200 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
          <div className="shrink-0">
            <Link
              href="/recipes"
              className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors inline-block"
            >
              🍽️ See Our Recipes
            </Link>
          </div>
        </div>
      </section>

      {/* ── Cuts guide promo ─────────────────────────────────── */}
      <section className="bg-gray-50 dark:bg-gray-900 border-t border-b border-gray-200 dark:border-gray-800 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-3">
                Know Your Cuts
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-4">
                Not sure which cut to buy?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6">
                Our Cuts Guide breaks down every cut of beef, pork, and chicken
                — what it&apos;s best for, how to cook it, and pro tips from our
                butchers. Bookmark it before your next cookout.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/departments/meat-market/cuts"
                  className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
                >
                  📖 Browse the Cuts Guide
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "🥩", label: "Beef", count: "9 cuts" },
                { icon: "🐷", label: "Pork", count: "6 cuts" },
                { icon: "🐔", label: "Chicken", count: "5 cuts" },
                { icon: "🔥", label: "Grill", count: "High-heat" },
                { icon: "🫕", label: "Braise", count: "Low & slow" },
                { icon: "🍳", label: "Pan", count: "Sear & fry" },
              ].map(({ icon, label, count }) => (
                <div
                  key={label}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center"
                >
                  <div className="text-2xl mb-2">{icon}</div>
                  <div className="text-xs font-bold text-gray-900 dark:text-white">{label}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Order CTA ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="rounded-2xl bg-red-600 px-6 sm:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-black text-white mb-2">
              Ready to order? We&apos;re one message away.
            </h2>
            <p className="text-red-100 text-sm leading-relaxed max-w-md">
              Send us a WhatsApp message with your order — cuts, weight, and any
              special requests. We&apos;ll have it ready when you arrive.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={BRAND.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors text-center"
            >
              💬 WhatsApp Order
            </a>
            <a
              href={BRAND.phone.link}
              className="bg-red-700 hover:bg-red-800 border border-red-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors text-center"
            >
              📞 {BRAND.phone.display}
            </a>
            <Link
              href="/catering"
              className="bg-white hover:bg-gray-100 text-red-700 font-bold px-6 py-3 rounded-xl text-sm transition-colors text-center"
            >
              🎉 Catering Orders
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
