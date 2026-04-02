import Link from "next/link";
import StaticDealCard from "@/components/ui/StaticDealCard";
import DealCard from "@/components/ui/DealCard";
import { FEATURED_DEALS, CURRENT_DEALS } from "@/lib/deals";
import type { Special } from "@/types";

interface Props {
  specials: Special[];
}

export default function TopDeals({ specials }: Props) {
  return (
    <section className="py-10 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-1">
              Don&apos;t miss out
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Top Deals This Week
            </h2>
          </div>
          <Link
            href="/weekly-ad"
            className="text-sm text-red-600 hover:text-red-700 font-medium whitespace-nowrap"
          >
            See all {CURRENT_DEALS.length} deals →
          </Link>
        </div>

        {/* 3-column teaser grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {specials.length > 0
            ? specials.slice(0, 3).map((special) => (
                <DealCard key={special.id} special={special} />
              ))
            : FEATURED_DEALS.map((deal) => (
                <StaticDealCard key={deal.id} deal={deal} size="lg" />
              ))}
        </div>

        {/* CTA bar */}
        <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/40 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-red-900 dark:text-red-200 text-sm">
              {CURRENT_DEALS.length} deals this week — ad resets every Wednesday
            </p>
            <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">
              Prices valid while supplies last at participating locations
            </p>
          </div>
          <Link
            href="/weekly-ad"
            className="shrink-0 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            View Full Weekly Ad →
          </Link>
        </div>

      </div>
    </section>
  );
}
