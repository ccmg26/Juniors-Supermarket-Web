import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import DealCard from "@/components/ui/DealCard";
import StaticDealCard from "@/components/ui/StaticDealCard";
import { FEATURED_DEALS } from "@/lib/deals";
import type { Special } from "@/types";

interface Props {
  specials: Special[];
}

export default function TopDeals({ specials }: Props) {
  const hasSupabaseDeals = specials.length > 0;

  // Fall back to static FEATURED_DEALS when Supabase returns nothing
  if (!hasSupabaseDeals && FEATURED_DEALS.length === 0) return null;

  return (
    <section className="section-pad bg-bg">
      <div className="container-max">
        <div className="mb-8">
          <SectionHeader label="Don't Miss Out" title="Top Deals This Week" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hasSupabaseDeals
            ? specials.map((special) => (
                <DealCard key={special.id} special={special} />
              ))
            : FEATURED_DEALS.map((deal) => (
                <StaticDealCard key={deal.id} deal={deal} />
              ))}
        </div>

        <p className="text-xs text-muted-fg text-center mt-4">
          * While Supplies Last. Prices valid at participating locations.
        </p>

        {/* Deals Club micro-CTA */}
        <div className="mt-10 bg-brand/5 border border-brand/20 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-black text-fg text-base">
              Get deals <span className="text-brand">before</span> they hit the shelves.
            </p>
            <p className="text-sm text-muted-fg mt-0.5">
              Join the Deals Club — free weekly ad alerts to your phone & email.
            </p>
          </div>
          <Link
            href="#deals-club"
            scroll={true}
            className="btn-primary whitespace-nowrap shrink-0"
          >
            Join Free →
          </Link>
        </div>
      </div>
    </section>
  );
}
