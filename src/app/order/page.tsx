import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Order by WhatsApp",
  description:
    "Order fresh meat, produce, and groceries from Junior's Supermarket by WhatsApp. Tell us what you need — we'll have it ready for pickup. Available at all 8 RGV locations.",
  openGraph: {
    title: "Order by WhatsApp | Junior's Supermarket",
    description: "Send us your order on WhatsApp — fresh meat, custom cuts, bulk orders, and more. We'll have it ready.",
  },
};

const DEPARTMENTS = [
  {
    icon: "🥩",
    name: "Meat Market",
    examples: "Carne asada, skirt steak, ground beef, custom cuts, ribs, carnitas",
    href: `https://wa.me/${BRAND.phone.display.replace(/\D/g, "")}?text=Hi%2C%20I%27d%20like%20to%20order%20from%20the%20Meat%20Market.%20`,
  },
  {
    icon: "🍖",
    name: "Deli Cuts",
    examples: "Lunch meats, sliced turkey, ham, cheese, specialty cuts",
    href: `https://wa.me/${BRAND.phone.display.replace(/\D/g, "")}?text=Hi%2C%20I%27d%20like%20to%20order%20from%20the%20Deli.%20`,
  },
  {
    icon: "🥖",
    name: "Bakery",
    examples: "Custom cakes, pan dulce, tortillas, special orders",
    href: `https://wa.me/${BRAND.phone.display.replace(/\D/g, "")}?text=Hi%2C%20I%27d%20like%20to%20order%20from%20the%20Bakery.%20`,
  },
  {
    icon: "🫓",
    name: "Tortilleria",
    examples: "Flour tortillas, corn tortillas, tostadas, bulk orders",
    href: `https://wa.me/${BRAND.phone.display.replace(/\D/g, "")}?text=Hi%2C%20I%27d%20like%20to%20order%20from%20the%20Tortilleria.%20`,
  },
  {
    icon: "🥦",
    name: "Produce",
    examples: "Fresh vegetables, fruits, bulk produce, seasonal items",
    href: `https://wa.me/${BRAND.phone.display.replace(/\D/g, "")}?text=Hi%2C%20I%27d%20like%20to%20order%20Produce.%20`,
  },
  {
    icon: "🎉",
    name: "Catering / Bulk Order",
    examples: "Event orders, large quantities, custom catering packages",
    href: "/catering",
    internal: true,
  },
];

const STEPS = [
  { step: "1", title: "Pick a Department", desc: "Tap the WhatsApp button for the department you need — a pre-filled message opens in WhatsApp." },
  { step: "2", title: "Send Your Order", desc: "Tell us what you need, the quantity, and your preferred pickup location and time." },
  { step: "3", title: "We Confirm", desc: "A team member will confirm your order and let you know when it's ready." },
  { step: "4", title: "Pick Up & Pay", desc: "Come in, pick up your order, and pay at checkout. It's that simple." },
];

export default function OrderPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-hero-pattern py-16 px-4">
        <div className="container-max">
          <div className="flex items-start gap-4 mt-3">
            <div className="text-5xl">💬</div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-brand-fg leading-tight">
                Order by WhatsApp
              </h1>
              <p className="text-brand-fg/80 mt-3 text-base max-w-xl leading-relaxed">
                Skip the line. Send us your order on WhatsApp and we&apos;ll have it
                fresh-cut and ready for you to pick up at any of our 8 locations.
              </p>
              <div className="flex flex-wrap gap-3 mt-5">
                <a
                  href={`https://wa.me/${BRAND.phone.display.replace(/\D/g, "")}?text=Hi%2C%20I%27d%20like%20to%20place%20an%20order.%20`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm"
                >
                  💬 Open WhatsApp
                </a>
                <Link href="/catering" className="btn-secondary bg-brand-fg/10 border-brand-fg/20 text-brand-fg hover:bg-brand-fg/20 text-sm">
                  🎉 Catering Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-pad bg-accent">
        <div className="container-max">

          {/* How it works */}
          <div className="mb-12">
            <h2 className="text-xl font-black text-fg mb-1">How It Works</h2>
            <p className="text-muted-fg text-sm mb-6">Four easy steps to get your order ready.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {STEPS.map((s) => (
                <div key={s.step} className="card p-5">
                  <div className="w-8 h-8 rounded-full bg-brand text-brand-fg text-sm font-black flex items-center justify-center mb-3">
                    {s.step}
                  </div>
                  <h3 className="font-black text-fg mb-1 text-sm">{s.title}</h3>
                  <p className="text-muted-fg text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Department buttons */}
          <div className="mb-12">
            <h2 className="text-xl font-black text-fg mb-1">Order by Department</h2>
            <p className="text-muted-fg text-sm mb-6">
              Select your department below to open WhatsApp with a pre-filled message.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DEPARTMENTS.map((dept) => (
                <div key={dept.name} className="card p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{dept.icon}</span>
                    <h3 className="font-black text-fg">{dept.name}</h3>
                  </div>
                  <p className="text-muted-fg text-xs flex-1 leading-relaxed">{dept.examples}</p>
                  {dept.internal ? (
                    <Link href={dept.href} className="btn-primary text-sm text-center">
                      🎉 Request Catering Quote
                    </Link>
                  ) : (
                    <a
                      href={dept.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm text-center"
                    >
                      💬 Order {dept.name}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="card p-6">
              <h3 className="font-black text-fg mb-3">Good to Know</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "Orders are subject to availability",
                  "Large orders: please place 24–48 hrs ahead",
                  "Pickup only — delivery not available",
                  "Payment at the store, cash or card",
                  "Custom cuts welcome — just describe what you need",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-muted-fg">
                    <span className="text-brand font-bold mt-0.5">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6 bg-fg text-center flex flex-col justify-center">
              <h3 className="font-black text-bg mb-2">Prefer to Call?</h3>
              <p className="text-bg/70 text-sm mb-4">
                Reach any store directly by phone. We speak English and Spanish.
              </p>
              <a href={BRAND.phone.link} className="btn-primary w-full">
                📞 {BRAND.phone.display}
              </a>
              <Link href="/locations" className="mt-2 text-bg/60 hover:text-bg text-xs underline transition-colors">
                Find your nearest store
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
