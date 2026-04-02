export type DealCategory =
  | 'All'
  | 'Meat'
  | 'Produce'
  | 'Dairy'
  | 'Bakery'
  | 'Tortilleria'
  | 'Grocery'

export interface Deal {
  id: string
  name: string
  category: Exclude<DealCategory, 'All'>
  salePrice: string
  origPrice: string
  unit?: string          // e.g. "/lb" — shown after price
  validFrom: string      // display string e.g. "Feb 18"
  validThru: string      // display string e.g. "Feb 25, 2026"
  note?: string          // e.g. "While Supplies Last"
  featured?: boolean     // first 3 shown on homepage
}

// ─── UPDATE THIS ARRAY EVERY WEDNESDAY ───────────────────────────────────────
// This is the single source of truth. Homepage and Weekly Ad both read from here.
export const CURRENT_DEALS: Deal[] = [
  {
    id: 'brisket',
    name: 'Whole Beef Brisket',
    category: 'Meat',
    salePrice: '$2.49',
    origPrice: '$3.99',
    unit: '/lb',
    validFrom: 'Feb 18',
    validThru: 'Feb 25, 2026',
    note: 'While Supplies Last',
    featured: true,
  },
  {
    id: 'carnitas',
    name: 'Pork Shoulder (Carnitas)',
    category: 'Meat',
    salePrice: '$1.99',
    origPrice: '$2.79',
    unit: '/lb',
    validFrom: 'Feb 18',
    validThru: 'Feb 25, 2026',
    note: 'While Supplies Last',
    featured: true,
  },
  {
    id: 'avocados',
    name: 'Fresh Avocados 3-pack',
    category: 'Produce',
    salePrice: '$2.99',
    origPrice: '$4.99',
    validFrom: 'Feb 18',
    validThru: 'Feb 25, 2026',
    note: 'While Supplies Last',
    featured: true,
  },
  {
    id: 'tomatoes',
    name: 'Fresh Roma Tomatoes',
    category: 'Produce',
    salePrice: '$0.79',
    origPrice: '$1.29',
    unit: '/lb',
    validFrom: 'Feb 18',
    validThru: 'Feb 25, 2026',
    note: 'While Supplies Last',
  },
  {
    id: 'chicken',
    name: 'Whole Chicken',
    category: 'Meat',
    salePrice: '$1.29',
    origPrice: '$1.79',
    unit: '/lb',
    validFrom: 'Feb 18',
    validThru: 'Feb 25, 2026',
    note: 'While Supplies Last',
  },
  {
    id: 'eggs',
    name: 'Large Eggs (18-count)',
    category: 'Dairy',
    salePrice: '$3.49',
    origPrice: '$4.99',
    validFrom: 'Feb 18',
    validThru: 'Feb 25, 2026',
    note: 'While Supplies Last',
  },
  {
    id: 'pan-dulce',
    name: 'Pan Dulce (Dozen)',
    category: 'Bakery',
    salePrice: '$4.99',
    origPrice: '$6.99',
    validFrom: 'Feb 18',
    validThru: 'Feb 25, 2026',
    note: 'While Supplies Last',
  },
  {
    id: 'tortillas',
    name: 'Flour Tortillas (3 lb bag)',
    category: 'Tortilleria',
    salePrice: '$3.99',
    origPrice: '$5.49',
    validFrom: 'Feb 18',
    validThru: 'Feb 25, 2026',
    note: 'While Supplies Last',
  },
]

// Convenience: the 3 featured deals for the homepage teaser
export const FEATURED_DEALS = CURRENT_DEALS.filter((d) => d.featured)

// All unique categories present in the current ad (for filter tabs)
export const ACTIVE_CATEGORIES: DealCategory[] = [
  'All',
  ...Array.from(new Set(CURRENT_DEALS.map((d) => d.category))),
]
