"use client";

import { useState } from "react";
import { SPECIAL_CATEGORIES } from "@/lib/constants";
import { formatDateRange } from "@/lib/utils";
import type { Special, SpecialCategory } from "@/types";

interface Props {
  specials: Special[];
}

const ALL = "All";

export default function SpecialsClient({ specials }: Props) {
  const [active, setActive] = useState<string>(ALL);

  const filtered = active === ALL
    ? specials
    : specials.filter((s) => s.category === active);

  return (
    <section className="section-pad bg-brand-cream">
      <div className="container-max">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActive(ALL)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              active === ALL
                ? "bg-brand-red text-white shadow-sm"
                : "bg-white text-brand-gray border border-gray-200 hover:border-brand-red hover:text-brand-red"
            }`}
          >
            All ({specials.length})
          </button>
          {SPECIAL_CATEGORIES.map((cat) => {
            const count = specials.filter((s) => s.category === cat).length;
            if (count === 0) return null;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  active === cat
                    ? "bg-brand-red text-white shadow-sm"
                    : "bg-white text-brand-gray border border-gray-200 hover:border-brand-red hover:text-brand-red"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-brand-gray">
            <div className="text-5xl mb-4">🏷️</div>
            <p className="text-xl font-semibold text-brand-black mb-2">No specials in this category yet</p>
            <p>Check back soon or browse all categories.</p>
            <button onClick={() => setActive(ALL)} className="btn-primary mt-6">
              View All Specials
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((special) => (
              <div key={special.id} className="card group">
                {/* Image */}
                <div className="aspect-[4/3] bg-brand-warm flex items-center justify-center relative overflow-hidden">
                  {special.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={special.image_url}
                      alt={special.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-5xl opacity-30">🛒</div>
                  )}
                  <span className="absolute top-2 left-2 bg-brand-black/80 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {special.category}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-brand-black text-sm leading-snug mb-2">
                    {special.title}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl font-black text-brand-red">{special.price}</span>
                    {special.original_price && (
                      <span className="text-sm text-gray-400 line-through">{special.original_price}</span>
                    )}
                  </div>

                  <p className="text-xs text-brand-gray">
                    Valid: {formatDateRange(special.valid_from, special.valid_to)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {special.disclaimer ?? "While Supplies Last"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-brand-gray text-center mt-8">
          * All specials are subject to availability. While Supplies Last. Prices valid at participating locations.
        </p>
      </div>
    </section>
  );
}
