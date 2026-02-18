import Link from "next/link";
import EbtBadge from "@/components/ui/EbtBadge";
import { BRAND } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative bg-hero-pattern overflow-hidden">
      {/* Background pattern */}
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

          {/* Tagline */}
          <p className="text-brand-red text-sm font-bold uppercase tracking-[0.2em] mb-3">
            {BRAND.tagline}
          </p>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
            Fresh Meat.{" "}
            <span className="text-brand-red">Real Deals.</span>{" "}
            Family Value.
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
            8 locations across the Rio Grande Valley. Fresh meat, produce, bakery, and more —
            all at prices your family will love.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <Link href="/weekly-ad" className="btn-primary text-base px-8 py-4">
              View Weekly Ad
            </Link>
            <Link href="/specials" className="btn-secondary text-base px-8 py-4 border-white text-white hover:bg-white hover:text-brand-black">
              Browse Specials
            </Link>
          </div>

          {/* Quick stats */}
          <div className="mt-10 flex flex-wrap gap-8">
            {[
              { value: "8", label: "Store Locations" },
              { value: "7AM–10PM", label: "Open Daily" },
              { value: "EBT/WIC", label: "Always Accepted" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
