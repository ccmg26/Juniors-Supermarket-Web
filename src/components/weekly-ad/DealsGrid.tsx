"use client";

import { useState } from "react";
import StaticDealCard from "@/components/ui/StaticDealCard";
import { CURRENT_DEALS, ACTIVE_CATEGORIES } from "@/lib/deals";
import type { DealCategory } from "@/lib/deals";

export default function DealsGrid() {
  const [active, setActive] = useState<DealCategory>("All");

  const filtered =
    active === "All"
      ? CURRENT_DEALS
      : CURRENT_DEALS.filter((d) => d.category === active);

  return (
    <section className="section-pad bg-bg">
      <div className="container-max">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-fg mb-1">This Week&apos;s Deals</h2>
          <p className="text-sm text-muted-fg">
            {CURRENT_DEALS[0]?.validFrom} – {CURRENT_DEALS[0]?.validThru} · While Supplies Last
          </p>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {ACTIVE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                active === cat
                  ? "bg-brand text-brand-fg border-brand"
                  : "bg-card text-muted-fg border-border hover:border-brand/40 hover:text-fg"
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-1.5 text-xs opacity-70">
                  ({CURRENT_DEALS.filter((d) => d.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((deal) => (
            <StaticDealCard key={deal.id} deal={deal} />
          ))}
        </div>

        <p className="text-xs text-muted-fg text-center mt-6">
          * While Supplies Last. Prices valid at participating locations. Ad resets every Wednesday.
        </p>
      </div>
    </section>
  );
}
