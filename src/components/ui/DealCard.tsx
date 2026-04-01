import { formatDateRange } from "@/lib/utils";
import type { Special } from "@/types";

interface DealCardProps {
  special: Special;
}

/**
 * Reusable deal card for displaying a Special item.
 * Used in TopDeals (homepage), SpecialsClient, and anywhere else
 * specials are rendered as cards.
 */
export default function DealCard({ special }: DealCardProps) {
  return (
    <div className="card group">
      {/* Image */}
      <div className="aspect-[4/3] bg-accent flex items-center justify-center relative overflow-hidden">
        {special.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={special.image_url}
            alt={special.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-5xl opacity-40">🛒</div>
        )}
        <span className="absolute top-2 left-2 bg-fg/80 text-bg text-xs font-semibold px-2 py-1 rounded-full">
          {special.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-bold text-fg text-sm leading-tight mb-2">
          {special.title}
        </h3>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-black text-brand">{special.price}</span>
          {special.original_price && (
            <span className="text-sm text-muted-fg line-through">
              {special.original_price}
            </span>
          )}
        </div>

        <p className="text-xs text-muted-fg">
          Valid: {formatDateRange(special.valid_from, special.valid_to)}
        </p>
        {special.disclaimer && (
          <p className="text-xs text-muted-fg mt-1">{special.disclaimer}</p>
        )}
      </div>
    </div>
  );
}
