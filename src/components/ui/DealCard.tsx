import { formatDateRange } from "@/lib/utils";
import type { Special } from "@/types";

interface DealCardProps {
  special: Special;
}

/** Map department categories to icons for the no-image placeholder */
const CATEGORY_ICONS: Record<string, string> = {
  Meat: "🥩",
  Produce: "🥦",
  Dairy: "🥛",
  Grocery: "🛒",
  "Deli Cuts": "🍖",
  Restaurant: "🍽️",
  Bakery: "🥖",
  Tortilleria: "🫓",
  "Pay & Service Center": "💳",
};

function parsePriceNumber(price: string): number | null {
  const n = parseFloat(price.replace(/[^0-9.]/g, ""));
  return isNaN(n) ? null : n;
}

/**
 * Reusable deal card for displaying a Special item.
 * Used in TopDeals (homepage) and anywhere else specials are rendered as cards.
 */
export default function DealCard({ special }: DealCardProps) {
  const icon = CATEGORY_ICONS[special.category] ?? "🏷️";

  // Compute savings percentage if both prices are present and parseable
  const salePrice = parsePriceNumber(special.price);
  const origPrice = special.original_price
    ? parsePriceNumber(special.original_price)
    : null;
  const savingsPct =
    salePrice && origPrice && origPrice > salePrice
      ? Math.round(((origPrice - salePrice) / origPrice) * 100)
      : null;

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
          <div className="flex flex-col items-center gap-2">
            <span className="text-5xl">{icon}</span>
            <span className="text-xs font-semibold text-muted-fg uppercase tracking-wide">
              {special.category}
            </span>
          </div>
        )}

        {/* Category badge (only shown when image is present — icon already shows category otherwise) */}
        {special.image_url && (
          <span className="absolute top-2 left-2 bg-fg/80 text-bg text-xs font-semibold px-2 py-1 rounded-full">
            {special.category}
          </span>
        )}

        {/* Savings badge */}
        {savingsPct && (
          <span className="absolute top-2 right-2 bg-brand text-brand-fg text-xs font-black px-2 py-1 rounded-full">
            -{savingsPct}%
          </span>
        )}
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
