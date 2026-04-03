import { Deal } from '@/lib/deals'

// ── Category visual config ────────────────────────────────────────────────────
const CAT = {
  Meat: {
    bar:    'bg-red-900',
    label:  'text-red-300',
    save:   'bg-red-700 text-red-100',
    accent: 'text-red-500 dark:text-red-400',
  },
  Produce: {
    bar:    'bg-green-900',
    label:  'text-green-300',
    save:   'bg-green-700 text-green-100',
    accent: 'text-green-600 dark:text-green-400',
  },
  Dairy: {
    bar:    'bg-blue-900',
    label:  'text-blue-300',
    save:   'bg-blue-700 text-blue-100',
    accent: 'text-blue-600 dark:text-blue-400',
  },
  Bakery: {
    bar:    'bg-amber-900',
    label:  'text-amber-300',
    save:   'bg-amber-700 text-amber-100',
    accent: 'text-amber-600 dark:text-amber-400',
  },
  Tortilleria: {
    bar:    'bg-orange-900',
    label:  'text-orange-300',
    save:   'bg-orange-700 text-orange-100',
    accent: 'text-orange-600 dark:text-orange-400',
  },
  Grocery: {
    bar:    'bg-gray-800',
    label:  'text-gray-300',
    save:   'bg-gray-600 text-gray-100',
    accent: 'text-gray-600 dark:text-gray-400',
  },
} as const

type CatKey = keyof typeof CAT

function savingsPct(sale: string, orig: string): number {
  const s = parseFloat(sale.replace(/[^0-9.]/g, ''))
  const o = parseFloat(orig.replace(/[^0-9.]/g, ''))
  if (!o || !s) return 0
  return Math.round(((o - s) / o) * 100)
}

interface Props {
  deal: Deal
  size?: 'sm' | 'lg'
}

export default function StaticDealCard({ deal, size = 'lg' }: Props) {
  const cat = (CAT[deal.category as CatKey] ?? CAT.Grocery)
  const pct = savingsPct(deal.salePrice, deal.origPrice)
  const isLg = size === 'lg'

  return (
    <article className="
      group flex flex-col rounded-2xl overflow-hidden
      border border-border bg-card
      hover:border-border/60 hover:shadow-md
      transition-all duration-200
    ">

      {/* ── Category bar ───────────────────────────────────────── */}
      <div className={`${cat.bar} flex items-center justify-between px-3 py-2`}>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${cat.label}`}>
          {deal.category}
        </span>
        {pct > 0 && (
          <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 ${cat.save}`}>
            Save {pct}%
          </span>
        )}
      </div>

      {/* ── Body ───────────────────────────────────────────────── */}
      <div className={`flex flex-col flex-1 ${isLg ? 'p-4' : 'p-3'}`}>

        {/* Name */}
        <p className={`
          font-bold text-fg leading-snug
          ${isLg ? 'text-base mb-4' : 'text-sm mb-3'}
        `}>
          {deal.name}
        </p>

        {/* Pricing — pushed to bottom */}
        <div className="mt-auto">
          <div className="flex items-end gap-2 flex-wrap">
            <span className={`
              font-black leading-none ${cat.accent}
              ${isLg ? 'text-3xl' : 'text-xl'}
            `}>
              {deal.salePrice}
              {deal.unit && (
                <span className={`font-semibold ${isLg ? 'text-base' : 'text-sm'}`}>
                  {deal.unit}
                </span>
              )}
            </span>
            <span className="text-sm text-muted-fg line-through leading-none pb-0.5">
              {deal.origPrice}{deal.unit}
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-border mt-3 pt-2.5 flex items-center justify-between gap-2">
            <span className="text-xs text-muted-fg leading-tight">
              Valid {deal.validFrom} – {deal.validThru}
            </span>
            {deal.note && (
              <span className="text-[10px] text-muted-fg bg-muted rounded-full px-2 py-0.5 shrink-0 leading-tight">
                {deal.note}
              </span>
            )}
          </div>
        </div>

      </div>
    </article>
  )
}
