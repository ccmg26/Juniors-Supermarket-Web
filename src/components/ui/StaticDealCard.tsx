import { Deal } from '@/lib/deals'

const CATEGORY_STYLES: Record<string, { bar: string; label: string }> = {
  Meat:        { bar: 'bg-red-800',    label: 'text-red-200' },
  Produce:     { bar: 'bg-green-800',  label: 'text-green-200' },
  Dairy:       { bar: 'bg-blue-800',   label: 'text-blue-200' },
  Bakery:      { bar: 'bg-amber-800',  label: 'text-amber-200' },
  Tortilleria: { bar: 'bg-orange-800', label: 'text-orange-200' },
  Grocery:     { bar: 'bg-gray-700',   label: 'text-gray-300' },
}

function savingsPercent(sale: string, orig: string): number {
  const s = parseFloat(sale.replace(/[^0-9.]/g, ''))
  const o = parseFloat(orig.replace(/[^0-9.]/g, ''))
  if (!o) return 0
  return Math.round(((o - s) / o) * 100)
}

interface Props {
  deal: Deal
  size?: 'sm' | 'lg'   // sm = homepage teaser, lg = weekly ad grid
}

export default function StaticDealCard({ deal, size = 'lg' }: Props) {
  const style = CATEGORY_STYLES[deal.category] ?? CATEGORY_STYLES.Grocery
  const savings = savingsPercent(deal.salePrice, deal.origPrice)

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden flex flex-col">
      {/* Category color bar */}
      <div className={`${style.bar} px-3 py-1.5 flex items-center justify-between`}>
        <span className={`text-xs font-semibold uppercase tracking-wider ${style.label}`}>
          {deal.category}
        </span>
        {savings > 0 && (
          <span className="text-xs font-bold bg-white/20 text-white rounded-full px-2 py-0.5">
            Save {savings}%
          </span>
        )}
      </div>

      {/* Body */}
      <div className={`flex flex-col flex-1 ${size === 'sm' ? 'p-3' : 'p-4'}`}>
        <p className={`font-semibold text-gray-900 dark:text-white leading-tight mb-3 ${size === 'sm' ? 'text-sm' : 'text-base'}`}>
          {deal.name}
        </p>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mt-auto">
          <span className={`font-bold text-red-600 dark:text-red-400 ${size === 'sm' ? 'text-lg' : 'text-2xl'}`}>
            {deal.salePrice}{deal.unit}
          </span>
          <span className="text-sm text-gray-400 line-through">
            {deal.origPrice}{deal.unit}
          </span>
        </div>

        {/* Valid dates */}
        <p className="text-xs text-gray-400 mt-1.5">
          Valid {deal.validFrom} – {deal.validThru}
        </p>

        {deal.note && (
          <p className="text-xs text-gray-400 mt-0.5">{deal.note}</p>
        )}
      </div>
    </div>
  )
}
