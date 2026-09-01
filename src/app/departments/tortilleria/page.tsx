import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { T } from "@/components/T";

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
    nameEs: "Tortillas de Maíz",
    desc: "Made from stone-ground masa the traditional way. Soft, flavorful, and fresh off the press every morning.",
    descEs: "Hechas de masa molida en piedra de manera tradicional. Suaves, sabrosas y recién prensadas cada mañana.",
  },
  {
    icon: "🫓",
    name: "Flour Tortillas",
    nameEs: "Tortillas de Harina",
    desc: "Thin, soft, and perfectly pliable. Available in 6-inch, 8-inch, and large burrito size.",
    descEs: "Delgadas, suaves y perfectamente flexibles. Disponibles en tamaño de 6, 8 pulgadas y grande para burrito.",
  },
  {
    icon: "🫙",
    name: "Masa Preparada",
    nameEs: "Masa Preparada",
    desc: "Ready-to-use fresh masa for tamales, gorditas, or any recipe calling for masa. Sold by the pound.",
    descEs: "Masa fresca lista para usar en tamales, gorditas o cualquier receta que requiera masa. Se vende por libra.",
  },
  {
    icon: "🌯",
    name: "Gorditas",
    nameEs: "Gorditas",
    desc: "Thick hand-pressed corn cakes, perfect for stuffing. Made fresh and available daily.",
    descEs: "Gorditas de maíz gruesas prensadas a mano, perfectas para rellenar. Hechas frescas y disponibles diariamente.",
  },
  {
    icon: "🫔",
    name: "Tostadas",
    nameEs: "Tostadas",
    desc: "Crispy, golden tostada shells made in-house from our own corn tortillas.",
    descEs: "Tostadas crujientes y doradas hechas en casa con nuestras propias tortillas de maíz.",
  },
  {
    icon: "📦",
    name: "Bulk Orders",
    nameEs: "Órdenes al Por Mayor",
    desc: "Planning a big event? We do bulk tortilla orders for catering and parties. Call ahead.",
    descEs: "¿Planeando un gran evento? Hacemos órdenes de tortillas al por mayor para catering y fiestas. Llama con anticipación.",
  },
];

const STATS = [
  { value: "Fresh Corn",    valueEs: "Maíz Fresco",      label: "Tortillas Daily",  labelEs: "Tortillas Cada Día" },
  { value: "Fresh Flour",   valueEs: "Harina Fresca",    label: "Tortillas Daily",  labelEs: "Tortillas Cada Día" },
  { value: "Stone-Ground",  valueEs: "Molida en Piedra", label: "Masa",             labelEs: "Masa" },
  { value: "Every Morning", valueEs: "Cada Mañana",      label: "Made Fresh",       labelEs: "Hecho Fresco" },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Stone-Ground Masa",
    titleEs: "Masa Molida en Piedra",
    desc: "We start with dried corn kernels nixtamalized and stone-ground into fresh masa — the foundation of real tortillas.",
    descEs: "Comenzamos con granos de maíz seco nixtamalizados y molidos en piedra para obtener masa fresca — la base de las tortillas de verdad.",
  },
  {
    step: "02",
    title: "Hand-Pressed Fresh",
    titleEs: "Prensadas a Mano",
    desc: "Each tortilla is pressed by hand, the way families have done it for generations. No shortcuts, no preservatives.",
    descEs: "Cada tortilla se prensa a mano, como las familias lo han hecho por generaciones. Sin atajos, sin conservadores.",
  },
  {
    step: "03",
    title: "Hot Off the Press",
    titleEs: "Recién del Comal",
    desc: "Cooked on a hot comal and stacked warm. Come in the morning for the freshest batch — they go fast.",
    descEs: "Cocidas en comal caliente y apiladas tibias. Ven en la mañana para la tanda más fresca — se van rápido.",
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
              <T en="← All Departments" es="← Todos los Departamentos" />
            </Link>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-orange-500" />
              <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">
                <T en="Tortilleria · Junior's Supermarket" es="Tortillería · Junior's Supermarket" />
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
              <T en="Made by Hand." es="Hecho a Mano." />{" "}
              <span className="text-orange-400">
                <T en="Every Single Day." es="Cada Día." />
              </span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
              <T
                en="From stone-ground masa to fresh-pressed tortillas — our tortilleria does it the way abuela did it. Traditional, fresh, and made every morning at all 8 locations."
                es="Desde masa molida en piedra hasta tortillas recién prensadas — nuestra tortillería lo hace como lo hacía la abuela. Tradicional, fresco y hecho cada mañana en las 8 tiendas."
              />
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={BRAND.phone.link}
                className="bg-orange-700 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                📞 <T en="Bulk Order Inquiry" es="Consulta de Orden al Por Mayor" />
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
              <div key={`${value}-${label}`} className="py-6 px-4 text-center">
                <div className="text-2xl sm:text-3xl font-black text-orange-400 mb-1">
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
          <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-2">
            <T en="Fresh every morning" es="Fresco cada mañana" />
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            <T en="Everything from the tortilleria" es="Todo de la tortillería" />
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            <T en="Made the traditional way — no preservatives, no shortcuts." es="Hecho de manera tradicional — sin conservadores, sin atajos." />
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

      {/* ── Traditional Process ───────────────────────────────── */}
      <section className="bg-gray-950 border-t border-gray-800 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest mb-2">
              <T en="The old way is the right way" es="La manera antigua es la correcta" />
            </p>
            <h2 className="text-2xl font-black text-white">
              <T en="The Traditional Process" es="El Proceso Tradicional" />
            </h2>
            <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
              <T
                en="Every tortilla at Junior's follows the same three steps passed down for generations."
                es="Cada tortilla en Junior's sigue los mismos tres pasos transmitidos por generaciones."
              />
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PROCESS_STEPS.map(({ step, title, titleEs, desc, descEs }) => (
              <div
                key={step}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center"
              >
                <div className="text-4xl font-black text-orange-700 mb-3 opacity-60">
                  {step}
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  <T en={title} es={titleEs} />
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  <T en={desc} es={descEs} />
                </p>
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
              <T en="Need Tortillas for a Big Event?" es="¿Necesitas Tortillas para un Gran Evento?" />
            </h2>
            <p className="text-red-100 text-sm leading-relaxed max-w-md">
              <T
                en="We do bulk tortilla orders for quinceañeras, weddings, parties, and catering. Call ahead and our team will have them ready for you."
                es="Hacemos órdenes de tortillas al por mayor para quinceañeras, bodas, fiestas y catering. Llama con anticipación y nuestro equipo las tendrá listas para ti."
              />
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/departments/catering"
              className="bg-white hover:bg-gray-100 text-red-700 font-bold px-6 py-3 rounded-xl text-sm transition-colors text-center"
            >
              🎉 <T en="Catering Page" es="Página de Catering" />
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
