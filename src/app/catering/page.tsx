import type { Metadata } from "next";
import Link from "next/link";
import CateringForm from "./CateringForm";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Catering & Bulk Orders",
  description:
    "Catering and bulk meat orders for quinceañeras, BBQs, weddings, birthday parties, and more. Fresh carne asada, pollo, costillas, and sides. Junior's Supermarket serves all 8 RGV locations.",
  openGraph: {
    title: "Catering & Bulk Orders | Junior's Supermarket",
    description:
      "Fresh meat catering for your next big event. Carne asada, barbacoa, pollo, costillas, and more. Request a quote today.",
  },
};

const CATERING_ITEMS = [
  { icon: "🥩", name: "Carne Asada", desc: "Marinated flank steak, ready to grill" },
  { icon: "🍗", name: "Pollo Asado", desc: "Seasoned chicken for grilling or frying" },
  { icon: "🍖", name: "Costillas (Ribs)", desc: "Pork or beef ribs, any quantity" },
  { icon: "🐄", name: "Barbacoa", desc: "Traditional beef cheek barbacoa" },
  { icon: "🥘", name: "Carnitas", desc: "Slow-cooked pulled pork" },
  { icon: "🌮", name: "Fajita Mix", desc: "Beef & chicken combo packs" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Catering & Bulk Orders",
  provider: {
    "@type": "GroceryStore",
    name: "Junior's Supermarket",
    url: "https://www.juniorssupermarket.com",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Rio Grande Valley, Texas",
  },
  description:
    "Fresh meat catering for quinceañeras, BBQs, weddings, birthday parties, and corporate events. Bulk orders of carne asada, barbacoa, carnitas, ribs, and more.",
  url: "https://www.juniorssupermarket.com/catering",
};

export default function CateringPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="bg-hero-pattern py-16 px-4">
        <div className="container-max">
          <p className="text-brand-fg/70 text-xs font-semibold uppercase tracking-wider mb-3">
            Events &amp; Parties
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-brand-fg leading-tight">
            Catering &amp; Bulk Orders
          </h1>
          <p className="text-brand-fg/80 mt-3 text-base max-w-xl leading-relaxed">
            Quinceañeras, BBQs, weddings, family gatherings — we&apos;ve got the
            freshest meat in the RGV for your event. Custom orders, any quantity.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href="#form" className="btn-primary">
              Request a Quote
            </a>
            <a href={BRAND.phone.link} className="btn-secondary bg-brand-fg/10 border-brand-fg/20 text-brand-fg hover:bg-brand-fg/20">
              📞 {BRAND.phone.display}
            </a>
          </div>
        </div>
      </div>

      <section className="section-pad bg-accent">
        <div className="container-max">

          {/* Why Junior's for catering */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-fg mb-2">
              Why Choose Junior&apos;s for Your Event?
            </h2>
            <p className="text-muted-fg max-w-xl mx-auto text-sm">
              We&apos;ve been The Real Meat People in the RGV for years. Our butchers
              handle every order personally.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-14">
            {[
              { icon: "🔪", title: "Fresh-Cut Daily", body: "Every order is cut fresh by our butchers — never pre-packaged or frozen." },
              { icon: "📦", title: "Any Quantity", body: "From 25 to 500+ guests. We can handle it. Give us 48 hours notice for large orders." },
              { icon: "💲", title: "Best Price in the Valley", body: "Direct from our meat market. No middlemen, no catering markups — just fair prices." },
            ].map((item) => (
              <div key={item.title} className="card p-6 text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-black text-fg mb-1">{item.title}</h3>
                <p className="text-muted-fg text-sm">{item.body}</p>
              </div>
            ))}
          </div>

          {/* What we offer */}
          <div className="mb-14">
            <h2 className="text-xl font-black text-fg mb-1">What We Offer</h2>
            <p className="text-muted-fg text-sm mb-5">
              All items available fresh-cut. Ask about marinades, seasonings, and custom prep.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CATERING_ITEMS.map((item) => (
                <div key={item.name} className="card p-4 flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-bold text-fg text-sm">{item.name}</p>
                    <p className="text-muted-fg text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="grid lg:grid-cols-5 gap-8" id="form">
            <div className="lg:col-span-3">
              <h2 className="text-xl font-black text-fg mb-1">Request a Quote</h2>
              <p className="text-muted-fg text-sm mb-6">
                Fill out the form and we&apos;ll call you within 24 hours to confirm
                your order and pricing.
              </p>
              <div className="card p-6 sm:p-8">
                <CateringForm />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="card p-6">
                <h3 className="font-black text-fg mb-4">Order Checklist</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    "Know your approximate guest count",
                    "Have your event date ready",
                    "Think about which cuts you want",
                    "Consider if you need seasoning/marinade",
                    "Budget ~1 lb per person for meats",
                    "Order 48+ hrs ahead for large events",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted-fg">
                      <span className="text-brand font-bold mt-0.5 text-xs">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-6 bg-fg text-center">
                <h3 className="font-black text-bg mb-2">Need to Talk Now?</h3>
                <p className="text-bg/70 text-sm mb-4">
                  Call any store directly to place or discuss a catering order.
                </p>
                <a href={BRAND.phone.link} className="btn-primary w-full">
                  📞 {BRAND.phone.display}
                </a>
              </div>

              <div className="card p-6">
                <h3 className="font-black text-fg mb-2">Also Available</h3>
                <p className="text-muted-fg text-sm mb-3">
                  Order by WhatsApp — send us your list and we&apos;ll get it ready.
                </p>
                <Link href="/order" className="btn-secondary w-full text-sm">
                  WhatsApp Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
