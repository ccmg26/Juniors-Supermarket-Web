import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { T } from "@/components/T";

export const metadata: Metadata = {
  title: "Bakery — Fresh-Baked Daily",
  description:
    "Junior's Supermarket Bakery bakes pan dulce, bolillos, custom cakes, tres leches, and seasonal pastries fresh every morning starting at 6 AM. Custom cake orders for birthdays, quinceañeras, and weddings.",
  openGraph: {
    title: "Bakery | Junior's Supermarket — Baked Fresh, Every Morning",
    description:
      "Pan dulce, bolillos, custom cakes, tres leches, and seasonal pastries baked fresh daily at Junior's Supermarket.",
  },
};

const PRODUCTS = [
  {
    icon: "🧁",
    name: "Pan Dulce",
    nameEs: "Pan Dulce",
    desc: "Our signature Mexican sweet bread, baked fresh every morning. Conchas, cuernos, polvorones, and seasonal varieties.",
    descEs: "Nuestro pan dulce mexicano, horneado fresco cada mañana. Conchas, cuernos, polvorones y variedades de temporada.",
  },
  {
    icon: "🍞",
    name: "Bolillos & Teleras",
    nameEs: "Bolillos y Teleras",
    desc: "Crusty Mexican rolls baked golden brown. Perfect for tortas or a warm breakfast.",
    descEs: "Bolillos crujientes horneados a dorado perfecto. Perfectos para tortas o un desayuno caliente.",
  },
  {
    icon: "🎂",
    name: "Custom Cakes",
    nameEs: "Pasteles Personalizados",
    desc: "Birthday, quinceañera, graduation, and wedding cakes made to order. Call us 48 hours ahead.",
    descEs: "Pasteles de cumpleaños, quinceañera, graduación y boda hechos a la orden. Llámanos con 48 horas de anticipación.",
  },
  {
    icon: "🧇",
    name: "Tres Leches",
    nameEs: "Tres Leches",
    desc: "Our house-made tres leches cake — moist, rich, and made the traditional way. Available whole or by slice.",
    descEs: "Nuestro pastel de tres leches hecho en casa — húmedo, rico y preparado de manera tradicional. Disponible entero o por rebanada.",
  },
  {
    icon: "🥐",
    name: "Seasonal Pastries",
    nameEs: "Panes de Temporada",
    desc: "Rosca de Reyes for Three Kings Day, pan de muerto for Día de los Muertos, and holiday breads throughout the year.",
    descEs: "Rosca de Reyes para Día de Reyes, pan de muerto para Día de los Muertos y panes de temporada todo el año.",
  },
  {
    icon: "🍰",
    name: "Specialty Cakes",
    nameEs: "Pasteles Especiales",
    desc: "Frutas, flan, cheesecake, and more. Ask our bakery team what's available today.",
    descEs: "Frutas, flan, pastel de queso y más. Pregúntale a nuestro equipo de panadería qué hay disponible hoy.",
  },
];

const STATS = [
  { value: "6 AM",        valueEs: "6 AM",       label: "Fresh Baking Starts", labelEs: "Empieza el Horneado" },
  { value: "Pan Dulce",   valueEs: "Pan Dulce",   label: "Daily",               labelEs: "Cada Día" },
  { value: "Custom Cakes",valueEs: "Pasteles",    label: "Made to Order",       labelEs: "a la Orden" },
  { value: "7 Days",      valueEs: "7 Días",      label: "A Week",              labelEs: "a la Semana" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: "Junior's Supermarket Bakery",
  description:
    "Fresh-baked pan dulce, bolillos, custom cakes, tres leches, and seasonal pastries made every morning at Junior's Supermarket.",
  url: "https://www.juniorssupermarket.com/departments/bakery",
  telephone: BRAND.phone.display,
  openingHours: "Mo-Su 07:00-22:00",
  servesCuisine: "Mexican",
  hasMenu: {
    "@type": "Menu",
    hasMenuSection: PRODUCTS.map((p) => ({
      "@type": "MenuSection",
      name: p.name,
      description: p.desc,
    })),
  },
  parentOrganization: {
    "@type": "GroceryStore",
    name: "Junior's Supermarket",
    url: "https://www.juniorssupermarket.com",
    areaServed: "Rio Grande Valley, Texas",
  },
};

export default function BakeryPage() {
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
          <span className="text-[160px] font-black text-white leading-none tracking-tighter">
            PAN
          </span>
        </div>

        {/* Amber/gold glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 10% 50%, rgba(120,70,0,0.55) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="max-w-2xl">
            <Link
              href="/departments"
              className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors mb-5"
            >
              <T en="← All Departments" es="← Todos los Departamentos" />
            </Link>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-amber-500" />
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                <T en="Bakery · Junior's Supermarket" es="Panadería · Junior's Supermarket" />
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
              <T en="Baked Fresh," es="Horneado Fresco," />{" "}
              <span className="text-amber-400">
                <T en="Every Morning" es="Cada Mañana" />
              </span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
              <T
                en="From pan dulce and bolillos to custom cakes and tres leches — everything in our bakery is made from scratch, starting at 6 AM, seven days a week."
                es="Desde pan dulce y bolillos hasta pasteles personalizados y tres leches — todo en nuestra panadería se hace desde cero, comenzando a las 6 AM, siete días a la semana."
              />
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={BRAND.phone.link}
                className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                🎂 <T en="Order a Custom Cake" es="Ordenar un Pastel Personalizado" />
              </a>
              <Link
                href="/locations"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                📍 <T en="Find a Store" es="Encontrar una Tienda" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stat bar ──────────────────────────────────────────── */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-800">
            {STATS.map(({ value, valueEs, label, labelEs }) => (
              <div key={label} className="py-6 px-4 text-center">
                <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">
                  <T en={value} es={valueEs} />
                </div>
                <div className="text-xs text-gray-500 leading-snug">
                  <T en={label} es={labelEs} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Products grid ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="mb-8">
          <p className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-2">
            <T en="What we bake" es="Lo que horneamos" />
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            <T en="Fresh from our oven" es="Fresco de nuestro horno" />
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            <T en="Baked every morning — no day-old bread here." es="Horneado cada mañana — sin pan del día anterior." />
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map(({ icon, name, nameEs, desc, descEs }) => (
            <div
              key={name}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6"
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                <T en={name} es={nameEs} />
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                <T en={desc} es={descEs} />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Custom Cake callout ───────────────────────────────── */}
      <section className="bg-gray-950 border-t border-gray-800 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-2xl bg-amber-700/20 border border-amber-700/40 px-6 sm:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">
                <T en="Made to order" es="Hecho a la orden" />
              </p>
              <h2 className="text-2xl font-black text-white mb-2">
                <T en="Order a Custom Cake" es="Ordenar un Pastel Personalizado" />
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-md">
                <T
                  en="Birthday, quinceañera, graduation, baby shower, wedding — our bakery team makes cakes for every occasion. Call us at least 48 hours in advance and we'll take care of everything."
                  es="Cumpleaños, quinceañera, graduación, baby shower, boda — nuestro equipo de panadería hace pasteles para toda ocasión. Llámanos con al menos 48 horas de anticipación y nos encargamos de todo."
                />
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <a
                href={BRAND.phone.link}
                className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors text-center"
              >
                📞 {BRAND.phone.display}
              </a>
              <Link
                href="/departments/catering"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors text-center"
              >
                🎉 <T en="Catering & Events" es="Catering y Eventos" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── EBT / WIC + find a store ──────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="rounded-2xl bg-green-950/40 border border-green-900/50 p-6 flex gap-5 items-start">
            <div className="text-3xl shrink-0">✅</div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                <T en="EBT & WIC Accepted" es="Se Acepta EBT y WIC" />
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                <T
                  en="EBT and WIC accepted at all 8 Junior's locations. Fresh bread and pastries for every family."
                  es="Se acepta EBT y WIC en las 8 tiendas Junior's. Pan fresco y postres para cada familia."
                />
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                <T en="Fresh at All 8 Locations" es="Fresco en las 8 Tiendas" />
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                <T
                  en="Every Junior's Supermarket has a full bakery baking fresh every morning across the Rio Grande Valley."
                  es="Cada tienda Junior's Supermarket tiene una panadería completa que hornea fresco cada mañana en todo el Valle del Río Grande."
                />
              </p>
            </div>
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              📍 <T en="Find My Store →" es="Encontrar Mi Tienda →" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
