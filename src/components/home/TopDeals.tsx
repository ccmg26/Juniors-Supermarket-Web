import Link from "next/link";
import { formatDateRange } from "@/lib/utils";
import type { Special } from "@/types";

interface Props {
  specials: Special[];
}

export default function TopDeals({ specials }: Props) {
  return (
    <section className="section-pad bg-white">
      <div className="container-max">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-brand-red text-xs font-bold uppercase tracking-widest mb-2">
              Don&apos;t Miss Out
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-black">
              Top Deals This Week
            </h2>
          </div>
          <Link href="/specials" className="text-brand-red font-semibold text-sm hover:underline hidden sm:block">
            View All Specials →
          </Link>
        </div>

        {specials.length === 0 ? (
          <div className="text-center py-12 text-brand-gray">
            <p>Check back soon for this week&apos;s top deals!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {specials.map((special) => (
              <div key={special.id} className="card group">
                {/* Image area */}
                <div className="aspect-[4/3] bg-brand-warm flex items-center justify-center relative overflow-hidden">
                  {special.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={special.image_url}
                      alt={special.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-5xl opacity-40">🛒</div>
                  )}
                  {/* Category badge */}
                  <span className="absolute top-2 left-2 bg-brand-black/80 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {special.category}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-brand-black text-sm leading-tight mb-2">
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
                  {special.disclaimer && (
                    <p className="text-xs text-gray-400 mt-1">{special.disclaimer}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 text-center sm:hidden">
          <Link href="/specials" className="btn-primary">
            View All Specials
          </Link>
        </div>
        <p className="text-xs text-brand-gray text-center mt-4">* While Supplies Last. Prices valid at participating locations.</p>
      </div>
    </section>
  );
}
