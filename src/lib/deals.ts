// ─── FALLBACK DEALS ──────────────────────────────────────────────────────────
// Shown on the homepage TopDeals section ONLY when the Supabase `specials`
// table is empty (e.g. during initial setup or between ad cycles).
// The live site pulls from Supabase; update the DB via Admin → Specials.
// UPDATE THIS ARRAY every Wednesday if you ever need to use it as a fallback.

export type DealCategory =
  | 'All'
  | 'Meat'
  | 'Produce'
  | 'Dairy'
  | 'Bakery'
  | 'Tortilleria'
  | 'Grocery'
  | 'Deli Cuts'

export interface Deal {
  id: string
  name: string
  category: Exclude<DealCategory, 'All'>
  salePrice: string
  origPrice: string
  unit?: string
  validFrom: string
  validThru: string
  note?: string
  featured?: boolean
}

// Reflects Apr 15–21 weekly ad (update each Wednesday from Admin → Specials)
export const CURRENT_DEALS: Deal[] = [
  {
    id: 'split-chicken-breast',
    name: 'Split Chicken Breast',
    category: 'Meat',
    salePrice: '99¢',
    origPrice: '',
    unit: '/lb',
    validFrom: 'Apr 15',
    validThru: 'Apr 21, 2026',
    note: 'While Supplies Last',
    featured: true,
  },
  {
    id: 'chicken-leg-quarters',
    name: 'Chicken Leg Quarters',
    category: 'Meat',
    salePrice: '59¢',
    origPrice: '',
    unit: '/lb',
    validFrom: 'Apr 15',
    validThru: 'Apr 21, 2026',
    note: 'While Supplies Last',
    featured: true,
  },
  {
    id: 'fresh-avocados',
    name: 'Fresh Avocados',
    category: 'Produce',
    salePrice: '2/$3',
    origPrice: '',
    validFrom: 'Apr 15',
    validThru: 'Apr 21, 2026',
    note: 'While Supplies Last',
    featured: true,
  },
  {
    id: 'pork-neck-bones',
    name: 'Pork Neck Bones / Espinazo',
    category: 'Meat',
    salePrice: '99¢',
    origPrice: '',
    unit: '/lb',
    validFrom: 'Apr 15',
    validThru: 'Apr 21, 2026',
    note: 'While Supplies Last',
  },
  {
    id: 'pan-dulce',
    name: 'Pan Dulce Assorted',
    category: 'Bakery',
    salePrice: '$3.99',
    origPrice: '',
    validFrom: 'Apr 15',
    validThru: 'Apr 21, 2026',
    note: 'While Supplies Last',
  },
  {
    id: 'white-onions',
    name: 'White or Yellow Onions',
    category: 'Produce',
    salePrice: '2 lbs/$1',
    origPrice: '',
    validFrom: 'Apr 15',
    validThru: 'Apr 21, 2026',
    note: 'While Supplies Last',
  },
  {
    id: 'maseca',
    name: 'Maseca Corn Masa Flour',
    category: 'Grocery',
    salePrice: '$2.99',
    origPrice: '',
    validFrom: 'Apr 15',
    validThru: 'Apr 21, 2026',
    note: '4.4lb bag',
  },
  {
    id: 'queso-fresco',
    name: 'Queso Fresco / Panela Assorted',
    category: 'Deli Cuts',
    salePrice: '$5.99',
    origPrice: '',
    validFrom: 'Apr 15',
    validThru: 'Apr 21, 2026',
    note: 'While Supplies Last',
  },
]

export const FEATURED_DEALS = CURRENT_DEALS.filter((d) => d.featured)

export const ACTIVE_CATEGORIES: DealCategory[] = [
  'All',
  ...Array.from(new Set(CURRENT_DEALS.map((d) => d.category))),
]
