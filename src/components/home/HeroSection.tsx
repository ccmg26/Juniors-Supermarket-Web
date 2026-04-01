import Link from "next/link";
import EbtBadge from "@/components/ui/EbtBadge";
import { STORE_HOURS_RANGE } from "@/lib/constants";
import { formatDateRange } from "@/lib/utils";
import type { WeeklyAd } from "@/types";

interface Props {
  weeklyAd?: WeeklyAd | null;
  storeCount?: number;
}

export default function HeroSection({ weeklyAd, storeCount = 8 }: Props) {
  let adDateRange: string | null = null;
  if (weeklyAd) {
    adDateRange = formatDateRange(weeklyAd.valid_from, weeklyAd.valid_to);
  }

  return (
    <section className="relative bg-hero-pattern overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)",
          }}
        />
      </div>

      <div className="relative container-max section-pad">
        <div className="max-w-3xl">
          {/* EBT badge */}
          <div className="mb-6">
            <EbtBadge size="sm" />
          </div>

          {/* Tagline */}
          <p className="text-brand-fg text-sm font-bold uppercase tracking-[0.2em] mb-3 opacity-80">
            The <span className="text-brand-yellow">Real</span> Meat People
          </p>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-fg leading-[1.1] tracking-tight mb-6">
            Fresh Meat.{" "}
            <span className="text-brand-yellow">Real</span> Deals.{" "}
            Family Value.
          </h1>

          {/* Subheading — uses live store count */}
          <p className="text-brand-fg/80 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
            {storeCount} locations across the Rio Grande Valley. Fresh meat,
            produce, bakery, and more — all at prices your family will love.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link href="/weekly-ad" className="btn-dark text-base px-8 py-4">
              View Weekly Ad
              {adDateRange && (
                <span className="ml-2 text-xs font-normal opacity-70 hidden sm:inline">
                  Valid {adDateRange}
                </span>
              )}
            </Link>
            <Link href="/locations" className="btn-white-outline text-base px-8 py-4">
              Find Your Store
            </Link>
          </div>

          {/* Live ad validity pill — shown on mobile below buttons */}
          {adDateRange && (
            <p className="mt-3 text-brand-fg/60 text-xs sm:hidden">
              Weekly Ad valid {adDateRange}
            </p>
          )}

          {/* Stats — store count is live from Supabase */}
          <div className="mt-10 flex flex-wrap gap-8">
            {[
              { value: String(storeCount), label: "Store Locations" },
              { value: STORE_HOURS_RANGE, label: "Open Daily" },
              { value: "EBT / WIC", label: "Always Accepted" },
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
