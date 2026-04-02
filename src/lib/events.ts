export type EventStatus = 'active' | 'upcoming' | 'ended'

export interface StoreEvent {
  id:          string
  title:       string
  emoji:       string
  description: string
  dateFrom:    string   // display string
  dateTo:      string   // display string
  locations:   string   // 'All Locations' or specific store name
  featured:    boolean
  status:      EventStatus
  // Optional department tie-in for deals link
  dealCategory?: string
  // Optional social callout
  socialCallout?: string
}

// ── UPDATE THIS ARRAY when events change ─────────────────────────────────────
export const EVENTS: StoreEvent[] = [
  {
    id:           'bbq-kickoff',
    title:        'BBQ Season Kickoff',
    emoji:        '🔥',
    description:  'Fire up the grill! Special pricing on brisket, ribs, whole chickens, and all your BBQ essentials. Stock up while supplies last — these prices won\'t last long.',
    dateFrom:     'Feb 18',
    dateTo:       'Mar 4, 2026',
    locations:    'All Locations',
    featured:     true,
    status:       'active',
    dealCategory: 'Meat',
    socialCallout: 'Show this post at checkout for an extra 5% off your grill order',
  },
  {
    id:           'lenten-specials',
    title:        'Lenten Friday Seafood Specials',
    emoji:        '🐟',
    description:  'Every Friday during Lent — incredible deals on fresh fish, Gulf shrimp, tilapia, and seafood across all departments. Perfect for the whole family.',
    dateFrom:     'Feb 20',
    dateTo:       'Mar 30, 2026',
    locations:    'All Locations',
    featured:     false,
    status:       'active',
    dealCategory: 'Produce',
    socialCallout: 'Follow us on Instagram for Friday fish deal previews',
  },
]
