import Link from "next/link";
import StaticDealCard from "@/components/ui/StaticDealCard";
import DealCard from "@/components/ui/DealCard";
import { FEATURED_DEALS } from "@/lib/deals";
import type { Special } from "@/types";

interface Props {
  specials: Special[];
}

export default function TopDeals({ specials }: Props) {
  return (
    <section className="py-10 bg-card">
      <div className="container-max px-4">

        {/* Section header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="label-eyebrow text-brand mb-1">
              Don&apos;t miss out
            </p>
            <h2 className="text-2xl font-bold text-fg">
              Top Deals This Week
            </h2>
          </div>
          <Link
            href="/weekly-ad"
            className="text-sm text-brand hover:text-brand/80 font-medium whitespace-nowrap"
          >
            See all deals →
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
        <div className="rounded-xl bg-brand/10 border border-brand/20 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-fg text-sm">
              {specials.length > 0 ? `${specials.length} deals` : 'Fresh deals'} this week — ad resets every Wednesday
            </p>
            <p className="text-xs text-muted-fg mt-0.5">
              Prices valid while supplies last at participating locations
            </p>
          </div>
          <Link
            href="/weekly-ad"
            className="btn-primary shrink-0 text-sm"
          >
            View Full Weekly Ad →
          </Link>
        </div>

      </div>
    </section>
  );
}
