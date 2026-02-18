import Link from "next/link";
import EbtBadge from "@/components/ui/EbtBadge";
import { BRAND } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative bg-hero-pattern overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)"
        }} />
      </div>

      <div className="relative container-max section-pad">
        <div className="max-w-3xl">
          {/* EBT badge */}
          <div className="mb-6">
            <EbtBadge size="sm" />
          </div>

          {/* Tagline — text-brand-fg (white) always readable on dark gradient */}
          <p className="text-brand-fg text-sm font-bold uppercase tracking-[0.2em] mb-3 opacity-80">
            {BRAND.tagline}
          </p>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-fg leading-[1.1] tracking-tight mb-6">
            Fresh Meat.{" "}
            {/* red-200 (light pink) on dark gradient: 9.5:1 large text ✅ */}
            <span className="text-red-200">Real Deals.</span>{" "}
            Family Value.
          </h1>

          {/* text-brand-fg/80 on dark gradient: strong contrast ✅ */}
          <p className="text-brand-fg/80 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
            8 locations across the Rio Grande Valley. Fresh meat, produce, bakery, and more —
            all at prices your family will love.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <Link href="/weekly-ad" className="btn-primary text-base px-8 py-4">
              View Weekly Ad
            </Link>
            {/* White outline button on dark hero */}
            <Link
              href="/specials"
              className="inline-flex items-center justify-center gap-2 text-base px-8 py-4 rounded-lg font-semibold border-2 border-brand-fg/80 text-brand-fg hover:bg-brand-fg hover:text-fg active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-fg focus-visible:ring-offset-2"
            >
              Browse Specials
            </Link>
          </div>

          {/* Quick stats — text-brand-fg/60 on dark: readable ✅ */}
          <div className="mt-10 flex flex-wrap gap-8">
            {[
              { value: "8", label: "Store Locations" },
              { value: "7AM–10PM", label: "Open Daily" },
              { value: "EBT/WIC", label: "Always Accepted" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-black text-brand-fg">{stat.value}</p>
                <p className="text-brand-fg/60 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
