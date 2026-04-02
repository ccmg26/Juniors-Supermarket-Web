import type { Deal } from "@/lib/deals";

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

export default function StaticDealCard({ deal }: { deal: Deal }) {
  const icon = CATEGORY_ICONS[deal.category] ?? "🏷️";

  const saleNum = parsePriceNumber(deal.salePrice);
  const origNum = parsePriceNumber(deal.origPrice);
  const savingsPct =
    saleNum && origNum && origNum > saleNum
      ? Math.round(((origNum - saleNum) / origNum) * 100)
      : null;

  return (
    <div className="card group">
      {/* Image placeholder */}
      <div className="aspect-[4/3] bg-accent flex flex-col items-center justify-center relative overflow-hidden gap-2">
        <span className="text-5xl">{icon}</span>
        <span className="text-xs font-semibold text-muted-fg uppercase tracking-wide">
          {deal.category}
        </span>

        {savingsPct && (
          <span className="absolute top-2 right-2 bg-brand text-brand-fg text-xs font-black px-2 py-1 rounded-full">
            -{savingsPct}%
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-bold text-fg text-sm leading-tight mb-2">{deal.name}</h3>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-black text-brand">
            {deal.salePrice}
            {deal.unit && (
              <span className="text-sm font-semibold text-muted-fg">{deal.unit}</span>
            )}
          </span>
          <span className="text-sm text-muted-fg line-through">
            {deal.origPrice}
            {deal.unit}
          </span>
        </div>

        <p className="text-xs text-muted-fg">
          Valid: {deal.validFrom} – {deal.validThru}
        </p>
        {deal.note && (
          <p className="text-xs text-muted-fg mt-1">{deal.note}</p>
        )}
      </div>
    </div>
  );
}
