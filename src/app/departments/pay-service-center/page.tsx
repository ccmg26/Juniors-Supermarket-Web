import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

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
    desc: "Send money domestically and internationally. Fast, reliable transfers to Mexico and beyond. Competitive rates.",
    badge: "Popular",
  },
  {
    icon: "📄",
    name: "Money Orders",
    desc: "Safe, guaranteed payment accepted everywhere. Available at all locations — no bank account needed.",
    badge: null,
  },
  {
    icon: "💳",
    name: "Bill Payment",
    desc: "Pay utility bills, rent, insurance, and more without a bank. We accept major billers.",
    badge: null,
  },
  {
    icon: "📱",
    name: "Prepaid Phone Cards",
    desc: "Top-up any carrier — AT&T, T-Mobile, Verizon, Cricket, MetroPCS, and popular Mexican carriers.",
    badge: null,
  },
  {
    icon: "🏦",
    name: "Check Cashing",
    desc: "Cash your paycheck, government check, or personal check quickly at select locations.",
    badge: "Select locations",
  },
  {
    icon: "🎟️",
    name: "Lottery Tickets",
    desc: "Texas Lottery scratch-offs and draw games available at all stores.",
    badge: null,
  },
];

const WIRE_DESTINATIONS = [
  "Mexico", "Guatemala", "El Salvador", "Honduras",
  "Colombia", "Dominican Republic", "United States (domestic)",
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
            ← All Departments
          </Link>
          <div className="flex items-start gap-4 mt-3">
            <div className="text-6xl">💳</div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-brand-fg leading-tight">
                Pay &amp; Service Center
              </h1>
              <p className="text-brand-fg/80 font-semibold text-sm uppercase tracking-wide mt-1">
                Financial Services · Junior&apos;s Supermarket
              </p>
              <p className="text-brand-fg/80 mt-3 text-base max-w-xl">
                Take care of your finances while you shop. Wire transfers, bill pay, money
                orders, and more — all under one roof at all 8 RGV locations.
              </p>
              <a href={BRAND.phone.link} className="btn-primary mt-5 inline-flex text-sm">
                📞 Call Any Location
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
              { icon: "🏪", title: "8 Locations", body: "Every Junior's store has a full Pay & Service Center — no appointment needed." },
              { icon: "⏰", title: "Open Daily", body: "Same hours as the store. 7 AM – 10 PM, Monday through Sunday." },
              { icon: "🆔", title: "No Bank Required", body: "Most services need only a valid ID. No bank account, no credit check." },
            ].map((item) => (
              <div key={item.title} className="card p-5 text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-black text-fg text-base mb-1">{item.title}</h3>
                <p className="text-muted-fg text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Services grid */}
          <div className="mb-14">
            <h2 className="text-2xl font-black text-fg mb-1">Our Services</h2>
            <p className="text-muted-fg text-sm mb-6">All available at every location unless noted.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map((service) => (
                <div key={service.name} className="card p-6 flex flex-col gap-3 relative">
                  {service.badge && (
                    <span className="absolute top-4 right-4 text-xs font-bold px-2 py-0.5 rounded-full bg-brand text-brand-fg">
                      {service.badge}
                    </span>
                  )}
                  <span className="text-3xl">{service.icon}</span>
                  <h3 className="font-black text-fg text-base">{service.name}</h3>
                  <p className="text-muted-fg text-sm leading-relaxed flex-1">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Wire transfers highlight */}
          <div className="grid lg:grid-cols-2 gap-6 mb-14">
            <div className="card p-6 sm:p-8">
              <h2 className="font-black text-fg text-xl mb-2">Wire Transfers</h2>
              <p className="text-muted-fg text-sm leading-relaxed mb-5">
                Send money safely to family and friends — locally or internationally. Competitive
                rates, fast processing, and bilingual service in every store.
              </p>
              <h3 className="font-semibold text-fg text-sm mb-3">Available Destinations</h3>
              <ul className="grid grid-cols-2 gap-2">
                {WIRE_DESTINATIONS.map((dest) => (
                  <li key={dest} className="flex items-center gap-2 text-sm text-muted-fg">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                    {dest}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-fg mt-4">
                * Additional destinations available. Ask at the service counter.
              </p>
            </div>

            <div className="space-y-4">
              <div className="card p-6">
                <h3 className="font-black text-fg mb-3">What to Bring</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    "Valid government-issued photo ID",
                    "Recipient&apos;s full name and address",
                    "Payment in cash or debit card",
                    "Recipient&apos;s bank details (for wire transfers)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted-fg">
                      <span className="text-brand font-bold mt-0.5">✓</span>
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-6 bg-fg text-center">
                <h3 className="font-black text-bg mb-2">Find Your Nearest Store</h3>
                <p className="text-bg/70 text-sm mb-4">
                  All 8 Junior&apos;s locations have a full service center — find the closest one.
                </p>
                <Link href="/locations" className="btn-primary w-full">
                  View All Locations
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-10">
            <h2 className="text-xl font-black text-fg mb-5">Common Questions</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  q: "Do I need a bank account to use these services?",
                  a: "No. Our services are designed for everyone — just bring a valid ID and cash or debit card.",
                },
                {
                  q: "How long does a wire transfer take?",
                  a: "Most transfers are received within minutes to a few hours. Ask at the counter for exact timing to your destination.",
                },
                {
                  q: "What is the maximum amount I can send?",
                  a: "Limits vary by service and destination. Ask at any location for current limits.",
                },
                {
                  q: "Can I pay bills for someone else?",
                  a: "Yes — as long as you have the account number and biller information, we can process the payment.",
                },
              ].map((faq) => (
                <div key={faq.q} className="card p-5">
                  <p className="font-bold text-fg text-sm mb-2">{faq.q}</p>
                  <p className="text-muted-fg text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <div className="card p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 justify-between">
            <div>
              <h2 className="font-black text-fg text-lg mb-1">Have a Question?</h2>
              <p className="text-muted-fg text-sm">
                Our team speaks English and Spanish. Call any store directly.
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
