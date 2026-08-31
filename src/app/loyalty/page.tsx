import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Rewards Program",
  description:
    "Junior's Supermarket Rewards — earn points on every purchase, get exclusive deals, and unlock member-only savings. Coming soon to all 8 RGV locations.",
};

const FEATURES = [
  {
    icon: "⭐",
    title: "Earn Points",
    desc: "Earn points on every dollar you spend across all departments — meat, produce, bakery, and more.",
  },
  {
    icon: "🏷️",
    title: "Member-Only Deals",
    desc: "Exclusive discounts on your favorite products before they go live for everyone else.",
  },
  {
    icon: "🎂",
    title: "Birthday Perks",
    desc: "Get a special birthday bonus every year just for being a member.",
  },
  {
    icon: "📲",
    title: "Digital Card",
    desc: "No plastic card to lose. Your rewards live on your phone — scan at checkout.",
  },
  {
    icon: "🔔",
    title: "Early Ad Access",
    desc: "See the weekly ad before it drops — plan your shopping list ahead of time.",
  },
  {
    icon: "💰",
    title: "Redeem for Savings",
    desc: "Turn your points into real savings on your next visit.",
  },
];

export default function LoyaltyPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-hero-pattern py-20 px-4">
        <div className="container-max text-center">
          <div className="inline-flex items-center gap-2 bg-brand-fg/10 text-brand-fg border border-brand-fg/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-6">
            🚀 Coming Soon
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-brand-fg leading-tight max-w-2xl mx-auto">
            Junior&apos;s Rewards
          </h1>
          <p className="text-brand-fg/80 mt-4 text-lg max-w-xl mx-auto leading-relaxed">
            Shop. Earn. Save. A loyalty program built for the RGV — rewarding you
            every time you shop with us.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <button
              disabled
              className="btn-primary opacity-60 cursor-not-allowed"
              aria-label="Rewards program not yet available"
            >
              Join the Waitlist — Coming Soon
            </button>
            <Link
              href="/weekly-ad"
              className="btn-secondary bg-brand-fg/10 border-brand-fg/20 text-brand-fg hover:bg-brand-fg/20"
            >
              See This Week&apos;s Deals
            </Link>
          </div>
        </div>
      </div>

      <section className="section-pad bg-accent">
        <div className="container-max">
          {/* Features */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-fg mb-2">
              What You&apos;ll Get
            </h2>
            <p className="text-muted-fg text-sm">
              We&apos;re building something great for our loyal customers. Here&apos;s what&apos;s coming.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {FEATURES.map((f) => (
              <div key={f.title} className="card p-6">
                <span className="text-3xl block mb-3">{f.icon}</span>
                <h3 className="font-black text-fg mb-1">{f.title}</h3>
                <p className="text-muted-fg text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Current way to save */}
          <div className="card p-6 sm:p-8 mb-8">
            <div className="grid sm:grid-cols-2 gap-6 items-center">
              <div>
                <h2 className="font-black text-fg text-xl mb-2">
                  Save Now With Junior&apos;s Deals Club
                </h2>
                <p className="text-muted-fg text-sm leading-relaxed mb-4">
                  While Rewards is being built, sign up for our Deals Club — get
                  weekly deals and exclusive offers sent to your phone.
                </p>
                <div className="flex flex-col gap-2 text-sm">
                  {[
                    "Weekly ad delivered to your inbox",
                    "Exclusive email-only specials",
                    "No points, no fuss — just savings",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-muted-fg">
                      <span className="text-brand font-bold">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-4">🏷️</div>
                <Link href="/#deals-club" className="btn-primary w-full sm:w-auto">
                  Join Deals Club — It&apos;s Free
                </Link>
              </div>
            </div>
          </div>

          {/* Push notifications */}
          <div className="card p-6 sm:p-8 bg-fg">
            <div className="grid sm:grid-cols-2 gap-6 items-center">
              <div>
                <h2 className="font-black text-bg text-lg mb-2">
                  Get Deal Alerts on Your Phone
                </h2>
                <p className="text-bg/70 text-sm leading-relaxed">
                  Enable push notifications to get instant alerts when new specials
                  drop — straight to your home screen.
                </p>
              </div>
              <div className="text-center">
                <a href={BRAND.phone.link} className="btn-primary w-full mb-2">
                  📞 Call Any Store
                </a>
                <Link href="/weekly-ad" className="btn-secondary bg-bg/10 border-bg/20 text-bg hover:bg-bg/20 w-full">
                  This Week&apos;s Ad
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
