import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { T } from "@/components/T";

export const metadata: Metadata = {
  title: "Restaurant — Hot Food Ready Now",
  description:
    "Junior's Supermarket Restaurant serves tacos, burritos, daily plates, menudo, pozole, chicharrón, carnitas, and catering trays — all made fresh in-store every day. Hot food, ready when you are.",
  openGraph: {
    title: "Restaurant | Junior's Supermarket — Hot Food, Ready When You Are",
    description:
      "Tacos, burritos, daily plates, menudo, pozole, carnitas, and catering trays made fresh in-store daily at Junior's Supermarket.",
  },
};

const MENU_ITEMS = [
  {
    icon: "🌮",
    name: "Tacos & Burritos",
    nameEs: "Tacos y Burritos",
    desc: "Carne asada, al pastor, carnitas, pollo, and more. Made fresh to order with your choice of toppings.",
    descEs: "Carne asada, al pastor, carnitas, pollo y más. Hechos frescos a la orden con tu elección de ingredientes.",
  },
  {
    icon: "🍚",
    name: "Rice & Beans",
    nameEs: "Arroz y Frijoles",
    desc: "Spanish rice and pinto beans made fresh daily. Fluffy, seasoned, and the perfect side for any plate.",
    descEs: "Arroz rojo y frijoles pintos hechos frescos diariamente. Esponjosos, sazonados y el acompañamiento perfecto.",
  },
  {
    icon: "🥩",
    name: "Daily Plates",
    nameEs: "Platos del Día",
    desc: "Hot daily plates with meat, rice, beans, and tortillas. Affordable family meals ready to go.",
    descEs: "Platos calientes del día con carne, arroz, frijoles y tortillas. Comidas familiares accesibles listas para llevar.",
  },
  {
    icon: "🍜",
    name: "Menudo & Pozole",
    nameEs: "Menudo y Pozole",
    desc: "Traditional menudo and pozole available on weekends. Made the traditional way, served hot.",
    descEs: "Menudo y pozole tradicionales disponibles los fines de semana. Hechos de manera tradicional, servidos calientes.",
  },
  {
    icon: "🐔",
    name: "Chicharrón & Carnitas",
    nameEs: "Chicharrón y Carnitas",
    desc: "Crispy pork chicharrón and slow-cooked carnitas available at the steam table daily.",
    descEs: "Chicharrón de cerdo crujiente y carnitas de cocción lenta disponibles en la mesa de vapor diariamente.",
  },
  {
    icon: "🎉",
    name: "Catering Trays",
    nameEs: "Charolas para Catering",
    desc: "Feeding a crowd? Our restaurant team prepares catering trays for events. Ask for pricing.",
    descEs: "¿Alimentando a una multitud? Nuestro equipo de restaurante prepara charolas para eventos. Pregunta por los precios.",
  },
];

const STATS = [
  { value: "Made",   valueEs: "Hecho",     label: "In-Store Daily",       labelEs: "En Tienda Cada Día" },
  { value: "Family", valueEs: "Porciones", label: "Portions Available",   labelEs: "Familiares Disponibles" },
  { value: "Open",   valueEs: "Abierto",   label: "Every Day",            labelEs: "Cada Día" },
  { value: "Fresh",  valueEs: "Fresco",    label: "Never Reheated",       labelEs: "Nunca Recalentado" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Junior's Supermarket Restaurant",
  description:
    "Hot food made fresh in-store every day. Tacos, burritos, daily plates, menudo, pozole, carnitas, chicharrón, and catering trays.",
  url: "https://www.juniorssupermarket.com/departments/restaurant",
  telephone: BRAND.phone.display,
  openingHours: "Mo-Su 07:00-22:00",
  servesCuisine: "Mexican",
  priceRange: "$",
  hasMenu: {
    "@type": "Menu",
    hasMenuSection: MENU_ITEMS.map((m) => ({
      "@type": "MenuSection",
      name: m.name,
      description: m.desc,
    })),
  },
  parentOrganization: {
    "@type": "GroceryStore",
    name: "Junior's Supermarket",
    url: "https://www.juniorssupermarket.com",
    areaServed: "Rio Grande Valley, Texas",
  },
};

export default function RestaurantPage() {
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
          <span className="text-[110px] font-black text-white leading-none tracking-tighter">
            TACOS
          </span>
        </div>

        {/* Warm red/orange glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 10% 50%, rgba(130,30,0,0.55) 0%, transparent 70%)",
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
                <T en="Restaurant · Junior's Supermarket" es="Restaurante · Junior's Supermarket" />
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
              <T en="Hot Food," es="Comida Caliente," />{" "}
              <span className="text-orange-400">
                <T en="Ready When You Are" es="Lista Cuando Tú Llegues" />
              </span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
              <T
                en="Tacos, burritos, daily plates, menudo on weekends, carnitas at the steam table — all made fresh in-store every day. Authentic food at supermarket prices."
                es="Tacos, burritos, platos del día, menudo los fines de semana, carnitas en la mesa de vapor — todo hecho fresco en tienda cada día. Comida auténtica a precios de supermercado."
              />
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={BRAND.phone.link}
                className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                🎉 <T en="Inquire About Catering" es="Consultar sobre Catering" />
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

      {/* ── Menu grid ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="mb-8">
          <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-2">
            <T en="On the menu" es="En el menú" />
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            <T en="Fresh food made in-store" es="Comida fresca hecha en tienda" />
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            <T en="Made every morning — never reheated, never pre-packaged elsewhere." es="Hecho cada mañana — nunca recalentado, nunca preempacado en otro lugar." />
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MENU_ITEMS.map(({ icon, name, nameEs, desc, descEs }) => (
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

      {/* ── Fresh Every Morning callout ───────────────────────── */}
      <section className="bg-gray-950 border-t border-gray-800 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-2xl bg-red-950/30 border border-red-900/40 px-6 sm:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest mb-2">
                <T en="Our commitment" es="Nuestro compromiso" />
              </p>
              <h2 className="text-2xl font-black text-white mb-2">
                <T en="Fresh Every Morning" es="Fresco Cada Mañana" />
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-md">
                <T
                  en="Our restaurant team starts cooking early every morning. Everything at the steam table — the rice, the beans, the meats — is prepared in-store that day. We don't reheat yesterday's food. We don't bring it in from somewhere else. It's all made right here."
                  es="Nuestro equipo de restaurante comienza a cocinar temprano cada mañana. Todo en la mesa de vapor — el arroz, los frijoles, las carnes — se prepara en tienda ese día. No recalentamos la comida de ayer. No la traemos de otro lugar. Todo se hace aquí mismo."
                />
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Link
                href="/locations"
                className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors text-center"
              >
                📍 <T en="Find a Store" es="Encontrar una Tienda" />
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

      {/* ── Catering CTA ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="rounded-2xl bg-red-600 px-6 sm:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-black text-white mb-2">
              <T en="Feeding a Crowd?" es="¿Alimentando a una Multitud?" />
            </h2>
            <p className="text-red-100 text-sm leading-relaxed max-w-md">
              <T
                en="Our restaurant team prepares catering trays for quinceañeras, birthday parties, office events, and more. Tacos, rice, beans, carnitas — ask us about pricing and lead time."
                es="Nuestro equipo de restaurante prepara charolas para quinceañeras, fiestas de cumpleaños, eventos de oficina y más. Tacos, arroz, frijoles, carnitas — pregúntanos sobre precios y tiempo de anticipación."
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
