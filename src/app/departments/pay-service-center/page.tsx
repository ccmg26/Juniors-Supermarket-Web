import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { T } from "@/components/T";

export const metadata: Metadata = {
  title: "Financial Services & Pay Center",
  description:
    "Money orders, bill pay, wire transfers, prepaid cards, check cashing, and more — available at all 8 Junior's Supermarket locations across Edinburg, Pharr, San Juan, Hidalgo, Penitas, and Alton.",
  openGraph: {
    title: "Financial Services | Junior's Supermarket Pay & Service Center",
    description:
      "Wire transfers, bill pay, money orders, prepaid phone cards, check cashing, and lottery — at all 8 RGV locations.",
  },
};

const SERVICES = [
  {
    icon: "💸",
    name: "Wire Transfers",
    nameEs: "Transferencias de Dinero",
    desc: "Send money domestically and internationally. Fast, reliable transfers to Mexico and beyond. Competitive rates.",
    descEs: "Envía dinero nacional e internacionalmente. Transferencias rápidas y confiables a México y más. Tarifas competitivas.",
    badge: "Popular",
    badgeEs: "Popular",
  },
  {
    icon: "📄",
    name: "Money Orders",
    nameEs: "Giros Postales",
    desc: "Safe, guaranteed payment accepted everywhere. Available at all locations — no bank account needed.",
    descEs: "Pago seguro y garantizado aceptado en todas partes. Disponible en todas las tiendas — no se necesita cuenta bancaria.",
    badge: null,
    badgeEs: null,
  },
  {
    icon: "💳",
    name: "Bill Payment",
    nameEs: "Pago de Facturas",
    desc: "Pay utility bills, rent, insurance, and more without a bank. We accept major billers.",
    descEs: "Paga facturas de servicios, renta, seguro y más sin banco. Aceptamos los principales emisores de facturas.",
    badge: null,
    badgeEs: null,
  },
  {
    icon: "📱",
    name: "Prepaid Phone Cards",
    nameEs: "Tarjetas de Teléfono de Prepago",
    desc: "Top-up any carrier — AT&T, T-Mobile, Verizon, Cricket, MetroPCS, and popular Mexican carriers.",
    descEs: "Recarga cualquier compañía — AT&T, T-Mobile, Verizon, Cricket, MetroPCS y compañías mexicanas populares.",
    badge: null,
    badgeEs: null,
  },
  {
    icon: "🏦",
    name: "Check Cashing",
    nameEs: "Cambio de Cheques",
    desc: "Cash your paycheck, government check, or personal check quickly at select locations.",
    descEs: "Cambia tu cheque de nómina, cheque del gobierno o cheque personal rápidamente en tiendas seleccionadas.",
    badge: "Select locations",
    badgeEs: "Tiendas seleccionadas",
  },
  {
    icon: "🎟️",
    name: "Lottery Tickets",
    nameEs: "Billetes de Lotería",
    desc: "Texas Lottery scratch-offs and draw games available at all stores.",
    descEs: "Raspaditos y juegos de sorteo de la Lotería de Texas disponibles en todas las tiendas.",
    badge: null,
    badgeEs: null,
  },
];

const WIRE_DESTINATIONS = [
  { en: "Mexico",                   es: "México" },
  { en: "Guatemala",                es: "Guatemala" },
  { en: "El Salvador",              es: "El Salvador" },
  { en: "Honduras",                 es: "Honduras" },
  { en: "Colombia",                 es: "Colombia" },
  { en: "Dominican Republic",       es: "República Dominicana" },
  { en: "United States (domestic)", es: "Estados Unidos (doméstico)" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "Junior's Supermarket Pay & Service Center",
  description:
    "Wire transfers, money orders, bill payment, prepaid phone cards, check cashing, and lottery. Available at 8 RGV locations.",
  url: "https://www.juniorssupermarket.com/departments/pay-service-center",
  provider: {
    "@type": "GroceryStore",
    name: "Junior's Supermarket",
    url: "https://www.juniorssupermarket.com",
    telephone: BRAND.phone.display,
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Rio Grande Valley, Texas",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Financial Services",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      name: s.name,
      description: s.desc,
    })),
  },
};

export default function FinancialServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="bg-hero-pattern py-16 px-4">
        <div className="container-max">
          <Link
            href="/departments"
            className="text-brand-fg/70 hover:text-brand-fg text-sm mb-4 inline-flex items-center gap-1 transition-colors"
          >
            <T en="← All Departments" es="← Todos los Departamentos" />
          </Link>
          <div className="flex items-start gap-4 mt-3">
            <div className="text-6xl">💳</div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-brand-fg leading-tight">
                <T en="Pay & Service Center" es="Centro de Servicios" />
              </h1>
              <p className="text-brand-fg/80 font-semibold text-sm uppercase tracking-wide mt-1">
                <T en="Financial Services · Junior's Supermarket" es="Servicios Financieros · Junior's Supermarket" />
              </p>
              <p className="text-brand-fg/80 mt-3 text-base max-w-xl">
                <T
                  en="Take care of your finances while you shop. Wire transfers, bill pay, money orders, and more — all under one roof at all 8 RGV locations."
                  es="Atiende tus finanzas mientras compras. Transferencias de dinero, pago de facturas, giros postales y más — todo bajo un mismo techo en las 8 tiendas del Valle."
                />
              </p>
              <a href={BRAND.phone.link} className="btn-primary mt-5 inline-flex text-sm">
                📞 <T en="Call Any Location" es="Llamar a Cualquier Tienda" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="section-pad bg-accent">
        <div className="container-max">

          {/* Quick value props */}
          <div className="grid sm:grid-cols-3 gap-4 mb-14">
            {[
              {
                icon: "🏪",
                title: "8 Locations",
                titleEs: "8 Tiendas",
                body: "Every Junior's store has a full Pay & Service Center — no appointment needed.",
                bodyEs: "Cada tienda Junior's tiene un Centro de Servicios completo — sin cita previa.",
              },
              {
                icon: "⏰",
                title: "Open Daily",
                titleEs: "Abierto Diariamente",
                body: "Same hours as the store. 7 AM – 10 PM, Monday through Sunday.",
                bodyEs: "Mismo horario que la tienda. 7 AM – 10 PM, lunes a domingo.",
              },
              {
                icon: "🆔",
                title: "No Bank Required",
                titleEs: "Sin Banco Necesario",
                body: "Most services need only a valid ID. No bank account, no credit check.",
                bodyEs: "La mayoría de los servicios solo necesitan una identificación válida. Sin cuenta bancaria, sin revisión de crédito.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-5 text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-black text-fg text-base mb-1">
                  <T en={item.title} es={item.titleEs} />
                </h3>
                <p className="text-muted-fg text-sm leading-relaxed">
                  <T en={item.body} es={item.bodyEs} />
                </p>
              </div>
            ))}
          </div>

          {/* Services grid */}
          <div className="mb-14">
            <h2 className="text-2xl font-black text-fg mb-1">
              <T en="Our Services" es="Nuestros Servicios" />
            </h2>
            <p className="text-muted-fg text-sm mb-6">
              <T en="All available at every location unless noted." es="Disponibles en todas las tiendas salvo indicación." />
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map((service) => (
                <div key={service.name} className="card p-6 flex flex-col gap-3 relative">
                  {service.badge && service.badgeEs && (
                    <span className="absolute top-4 right-4 text-xs font-bold px-2 py-0.5 rounded-full bg-brand text-brand-fg">
                      <T en={service.badge} es={service.badgeEs} />
                    </span>
                  )}
                  <span className="text-3xl">{service.icon}</span>
                  <h3 className="font-black text-fg text-base">
                    <T en={service.name} es={service.nameEs} />
                  </h3>
                  <p className="text-muted-fg text-sm leading-relaxed flex-1">
                    <T en={service.desc} es={service.descEs} />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Wire transfers highlight */}
          <div className="grid lg:grid-cols-2 gap-6 mb-14">
            <div className="card p-6 sm:p-8">
              <h2 className="font-black text-fg text-xl mb-2">
                <T en="Wire Transfers" es="Transferencias de Dinero" />
              </h2>
              <p className="text-muted-fg text-sm leading-relaxed mb-5">
                <T
                  en="Send money safely to family and friends — locally or internationally. Competitive rates, fast processing, and bilingual service in every store."
                  es="Envía dinero de forma segura a familiares y amigos — local o internacionalmente. Tarifas competitivas, procesamiento rápido y servicio bilingüe en cada tienda."
                />
              </p>
              <h3 className="font-semibold text-fg text-sm mb-3">
                <T en="Available Destinations" es="Destinos Disponibles" />
              </h3>
              <ul className="grid grid-cols-2 gap-2">
                {WIRE_DESTINATIONS.map((dest) => (
                  <li key={dest.en} className="flex items-center gap-2 text-sm text-muted-fg">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                    <T en={dest.en} es={dest.es} />
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-fg mt-4">
                <T
                  en="* Additional destinations available. Ask at the service counter."
                  es="* Destinos adicionales disponibles. Pregunta en el mostrador de servicio."
                />
              </p>
            </div>

            <div className="space-y-4">
              <div className="card p-6">
                <h3 className="font-black text-fg mb-3">
                  <T en="What to Bring" es="Qué Traer" />
                </h3>
                <ul className="space-y-2 text-sm">
                  {[
                    {
                      en: "Valid government-issued photo ID",
                      es: "Identificación oficial con fotografía",
                    },
                    {
                      en: "Recipient's full name and address",
                      es: "Nombre completo y dirección del destinatario",
                    },
                    {
                      en: "Payment in cash or debit card",
                      es: "Pago en efectivo o tarjeta de débito",
                    },
                    {
                      en: "Recipient's bank details (for wire transfers)",
                      es: "Datos bancarios del destinatario (para transferencias)",
                    },
                  ].map((item) => (
                    <li key={item.en} className="flex items-start gap-2 text-muted-fg">
                      <span className="text-brand font-bold mt-0.5">✓</span>
                      <span><T en={item.en} es={item.es} /></span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-6 bg-fg text-center">
                <h3 className="font-black text-bg mb-2">
                  <T en="Find Your Nearest Store" es="Encuentra Tu Tienda Más Cercana" />
                </h3>
                <p className="text-bg/70 text-sm mb-4">
                  <T
                    en="All 8 Junior's locations have a full service center — find the closest one."
                    es="Las 8 tiendas de Junior's tienen un centro de servicios completo — encuentra la más cercana."
                  />
                </p>
                <Link href="/locations" className="btn-primary w-full">
                  <T en="View All Locations" es="Ver Todas las Tiendas" />
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-10">
            <h2 className="text-xl font-black text-fg mb-5">
              <T en="Common Questions" es="Preguntas Frecuentes" />
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  q: "Do I need a bank account to use these services?",
                  qEs: "¿Necesito una cuenta bancaria para usar estos servicios?",
                  a: "No. Our services are designed for everyone — just bring a valid ID and cash or debit card.",
                  aEs: "No. Nuestros servicios están diseñados para todos — solo trae una identificación válida y efectivo o tarjeta de débito.",
                },
                {
                  q: "How long does a wire transfer take?",
                  qEs: "¿Cuánto tarda una transferencia de dinero?",
                  a: "Most transfers are received within minutes to a few hours. Ask at the counter for exact timing to your destination.",
                  aEs: "La mayoría de las transferencias se reciben en minutos a pocas horas. Pregunta en el mostrador el tiempo exacto para tu destino.",
                },
                {
                  q: "What is the maximum amount I can send?",
                  qEs: "¿Cuál es el monto máximo que puedo enviar?",
                  a: "Limits vary by service and destination. Ask at any location for current limits.",
                  aEs: "Los límites varían según el servicio y el destino. Pregunta en cualquier tienda por los límites actuales.",
                },
                {
                  q: "Can I pay bills for someone else?",
                  qEs: "¿Puedo pagar facturas para otra persona?",
                  a: "Yes — as long as you have the account number and biller information, we can process the payment.",
                  aEs: "Sí — siempre que tengas el número de cuenta e información del emisor, podemos procesar el pago.",
                },
              ].map((faq) => (
                <div key={faq.q} className="card p-5">
                  <p className="font-bold text-fg text-sm mb-2">
                    <T en={faq.q} es={faq.qEs} />
                  </p>
                  <p className="text-muted-fg text-sm">
                    <T en={faq.a} es={faq.aEs} />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <div className="card p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 justify-between">
            <div>
              <h2 className="font-black text-fg text-lg mb-1">
                <T en="Have a Question?" es="¿Tienes una Pregunta?" />
              </h2>
              <p className="text-muted-fg text-sm">
                <T
                  en="Our team speaks English and Spanish. Call any store directly."
                  es="Nuestro equipo habla inglés y español. Llama directamente a cualquier tienda."
                />
              </p>
            </div>
            <a href={BRAND.phone.link} className="btn-primary shrink-0">
              📞 {BRAND.phone.display}
            </a>
          </div>

        </div>
      </section>
    </>
  );
}
