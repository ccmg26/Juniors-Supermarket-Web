import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { T } from "@/components/T";

export const metadata: Metadata = {
  title: "Deli Cuts — Sliced Fresh to Order",
  description:
    "Junior's Supermarket Deli Cuts offers premium sliced deli meats, cheeses, chorizo, party trays, rotisserie chicken, and prepared foods — cut to your exact thickness, fresh every day.",
  openGraph: {
    title: "Deli Cuts | Junior's Supermarket — Sliced Fresh, Cut to Order",
    description:
      "Turkey, ham, roast beef, Oaxaca cheese, chorizo, party trays, and rotisserie — sliced fresh to order at all 8 Junior's Supermarket locations.",
  },
};

const PRODUCTS = [
  {
    icon: "🥩",
    name: "Deli Meats",
    nameEs: "Carnes Frías",
    desc: "Turkey breast, ham, roast beef, salami, bologna, and more. Sliced thin, thick, or anywhere in between.",
    descEs: "Pechuga de pavo, jamón, rosbif, salami, mortadela y más. Rebanado fino, grueso o al gusto.",
  },
  {
    icon: "🧀",
    name: "Deli Cheeses",
    nameEs: "Quesos Fríos",
    desc: "American, Swiss, pepper jack, provolone, Oaxaca, and more. Cut to your preferred thickness.",
    descEs: "Americano, suizo, pepper jack, provolone, Oaxaca y más. Cortado al grosor de su preferencia.",
  },
  {
    icon: "🌮",
    name: "Chorizo & Specialty",
    nameEs: "Chorizo y Especialidades",
    desc: "Fresh chorizo, longaniza, and specialty deli items. Ask about today's selection.",
    descEs: "Chorizo fresco, longaniza y artículos especiales de la carnicería. Pregunta por la selección de hoy.",
  },
  {
    icon: "🥪",
    name: "Party Trays",
    nameEs: "Charolas para Fiestas",
    desc: "Deli meat and cheese trays for parties and events. Customizable with your choice of meats, cheeses, and garnishes. Order 24 hrs ahead.",
    descEs: "Charolas de carnes frías y quesos para fiestas y eventos. Personalizables con tu elección de carnes, quesos y guarniciones. Ordena con 24 hrs de anticipación.",
  },
  {
    icon: "🐓",
    name: "Rotisserie",
    nameEs: "Pollo Rostizado",
    desc: "Hot rotisserie chickens available daily. Ready to eat or great for meal prep.",
    descEs: "Pollos rostizados calientes disponibles diariamente. Listos para comer o perfectos para preparar comidas.",
  },
  {
    icon: "🥗",
    name: "Prepared Foods",
    nameEs: "Comida Preparada",
    desc: "Ready-to-eat salads, sides, and prepared items made fresh in-store.",
    descEs: "Ensaladas, guarniciones y artículos preparados listos para comer, hechos frescos en tienda.",
  },
];

const STATS = [
  { value: "Custom",  valueEs: "Grosor",   label: "Thickness Every Time", labelEs: "Personalizado Siempre" },
  { value: "Premium", valueEs: "Marcas",   label: "Brand Selection",      labelEs: "Premium" },
  { value: "Sliced",  valueEs: "Cortado",  label: "To Order",             labelEs: "a la Orden" },
  { value: "Fresh",   valueEs: "Fresco",   label: "Every Day",            labelEs: "Cada Día" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: "Junior's Supermarket Deli Cuts",
  description:
    "Premium sliced deli meats and cheeses, chorizo, party trays, rotisserie chicken, and prepared foods — all cut fresh to order.",
  url: "https://www.juniorssupermarket.com/departments/deli-cuts",
  telephone: BRAND.phone.display,
  openingHours: "Mo-Su 07:00-22:00",
  servesCuisine: ["American", "Mexican"],
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

export default function DeliCutsPage() {
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
            DELI
          </span>
        </div>

        {/* Subtle red glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 10% 50%, rgba(100,0,20,0.50) 0%, transparent 70%)",
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
              <span className="h-px w-8 bg-red-500" />
              <span className="text-xs font-semibold text-red-400 uppercase tracking-widest">
                <T en="Deli Cuts · Junior's Supermarket" es="Carnes Frías · Junior's Supermarket" />
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
              <T en="Sliced Fresh," es="Cortado Fresco," />{" "}
              <span className="text-red-400">
                <T en="Cut to Order" es="al Gusto" />
              </span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
              <T
                en="Premium deli meats and cheeses sliced to your exact thickness — every time, fresh every day. Party trays, rotisserie, and prepared foods also available at all 8 locations."
                es="Carnes frías y quesos premium cortados a tu grosor exacto — siempre, fresco cada día. Charolas para fiestas, pollo rostizado y comida preparada también disponibles en las 8 tiendas."
              />
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={BRAND.phone.link}
                className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                🥪 <T en="Order a Party Tray" es="Ordenar una Charola para Fiesta" />
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
                <div className="text-2xl sm:text-3xl font-black text-red-400 mb-1">
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
          <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-2">
            <T en="What we offer" es="Lo que ofrecemos" />
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            <T en="Everything at the deli counter" es="Todo en el mostrador de carnes frías" />
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            <T en="Ask our team — they'll slice it exactly how you like it." es="Pregúntale a nuestro equipo — lo cortarán exactamente como te gusta." />
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

      {/* ── Custom Slicing callout ────────────────────────────── */}
      <section className="bg-gray-950 border-t border-gray-800 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-2xl bg-red-950/30 border border-red-900/40 px-6 sm:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-2">
                <T en="Your way, every time" es="A tu gusto, siempre" />
              </p>
              <h2 className="text-2xl font-black text-white mb-2">
                <T en="Custom Slicing — Any Thickness" es="Corte a la Orden — Cualquier Grosor" />
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-md">
                <T
                  en="Paper-thin for sandwiches. Thick-cut for charcuterie boards. Our deli team slices every order fresh — no pre-packaged slices sitting under a lamp. Just tell us how you want it."
                  es="Muy fino para sándwiches. Grueso para tablas de embutidos. Nuestro equipo corta cada orden fresco — sin rebanadas preempacadas bajo una lámpara. Solo dinos cómo lo quieres."
                />
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <a
                href={BRAND.phone.link}
                className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors text-center"
              >
                📞 {BRAND.phone.display}
              </a>
              <Link
                href="/locations"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors text-center"
              >
                📍 <T en="Find a Location" es="Encontrar una Tienda" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Party trays + catering ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
            <div className="text-3xl mb-4">🥪</div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
              <T en="Party Trays — Order 24 Hrs Ahead" es="Charolas para Fiestas — Ordena con 24 Hrs de Anticipación" />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              <T
                en="Deli meat and cheese trays ready for your next event. Pick your meats, your cheeses, and your garnishes — we'll put it all together. Call at least 24 hours in advance."
                es="Charolas de carnes frías y quesos listas para tu próximo evento. Elige tus carnes, quesos y guarniciones — nosotros lo armamos. Llama con al menos 24 horas de anticipación."
              />
            </p>
            <a
              href={BRAND.phone.link}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              📞 <T en="Call to Order" es="Llamar para Ordenar" />
            </a>
          </div>
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
            <div className="text-3xl mb-4">🎉</div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
              <T en="Catering for Any Event" es="Catering para Cualquier Evento" />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              <T
                en="Feeding a big group? Our deli works alongside our catering team for quinceañeras, weddings, office events, and more. Let us handle the food."
                es="¿Alimentando a un grupo grande? Nuestro departamento trabaja junto con el equipo de catering para quinceañeras, bodas, eventos de oficina y más. Déjanos encargarnos de la comida."
              />
            </p>
            <Link
              href="/departments/catering"
              className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              🎉 <T en="Catering Page →" es="Página de Catering →" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
