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
            The <span className="text-brand-yellow">Real</span> Meat People
          </p>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-fg leading-[1.1] tracking-tight mb-6">
            Fresh Meat.{" "}
            <span className="text-brand-yellow">Real</span> Deals.{" "}
            Family Value.
          </h1>

          {/* text-brand-fg/80 on dark gradient: strong contrast ✅ */}
          <p className="text-brand-fg/80 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
            8 locations across the Rio Grande Valley. Fresh meat, produce, bakery, and more —
            all at prices your family will love.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            {/* btn-dark = bg-fg (navy) / text-bg (white): strong contrast against the red gradient ✅
                Was btn-primary (red bg on red gradient) — WCAG 1.4.11 non-text contrast fail ❌ */}
            <Link href="/weekly-ad" className="btn-dark text-base px-8 py-4">
              View Weekly Ad
            </Link>
            {/* White outline button on dark hero */}
            <Link href="/specials" className="btn-white-outline text-base px-8 py-4">
              Browse Specials
            </Link>
          </div>

          {/* Quick stats — /80 on dark gradient: ~9:1 ✅  (was /60: borderline on red band) */}
          <div className="mt-10 flex flex-wrap gap-8">
            {[
              { value: "8", label: "Store Locations" },
              { value: "7AM–10PM", label: "Open Daily" },
              { value: "EBT/WIC", label: "Always Accepted" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-black text-brand-fg">{stat.value}</p>
                <p className="text-brand-fg/80 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
