export interface Store {
  slug:     string
  name:     string
  address:  string
  city:     string
  state:    string
  zip:      string
  phone:    string
  phoneRaw: string
  mapQuery: string    // URL-encoded for Google Maps
}

export const STORES: Store[] = [
  {
    slug:     'alton',
    name:     'Alton',
    address:  '215 W Main Ave',
    city:     'Alton',
    state:    'TX',
    zip:      '78573',
    phone:    '(956) 585-1371',
    phoneRaw: '9565851371',
    mapQuery: '215+W+Main+Ave,+Alton,+TX+78573',
  },
  {
    slug:     'edinburg-closner',
    name:     'Edinburg Closner',
    address:  '3621 N Closner Blvd',
    city:     'Edinburg',
    state:    'TX',
    zip:      '78541',
    phone:    '(956) 383-7178',
    phoneRaw: '9563837178',
    mapQuery: '3621+N+Closner+Blvd,+Edinburg,+TX+78541',
  },
  {
    slug:     'edinburg-university',
    name:     'Edinburg University',
    address:  '2239 W University Dr',
    city:     'Edinburg',
    state:    'TX',
    zip:      '78539',
    phone:    '(956) 348-2203',
    phoneRaw: '9563482203',
    mapQuery: '2239+W+University+Dr,+Edinburg,+TX+78539',
  },
  {
    slug:     'hidalgo',
    name:     'Hidalgo',
    address:  '1410 E Ramon Ayala Dr',
    city:     'Hidalgo',
    state:    'TX',
    zip:      '78557',
    phone:    '(956) 843-1835',
    phoneRaw: '9568431835',
    mapQuery: '1410+E+Ramon+Ayala+Dr,+Hidalgo,+TX+78557',
  },
  {
    slug:     'penitas',
    name:     'Penitas',
    address:  '38828 FM 2221',
    city:     'Penitas',
    state:    'TX',
    zip:      '78576',
    phone:    '(956) 519-1211',
    phoneRaw: '9565191211',
    mapQuery: '38828+FM+2221,+Penitas,+TX+78576',
  },
  {
    slug:     'pharr-south-cage',
    name:     'Pharr South Cage',
    address:  '6501 S Cage Blvd',
    city:     'Pharr',
    state:    'TX',
    zip:      '78577',
    phone:    '(956) 781-7040',
    phoneRaw: '9567817040',
    mapQuery: '6501+S+Cage+Blvd,+Pharr,+TX+78577',
  },
  {
    slug:     'pharr-veterans',
    name:     'Pharr Veterans',
    address:  '5901 N Veterans Blvd',
    city:     'Pharr',
    state:    'TX',
    zip:      '78577',
    phone:    '(956) 781-6645',
    phoneRaw: '9567816645',
    mapQuery: '5901+N+Veterans+Blvd,+Pharr,+TX+78577',
  },
  {
    slug:     'san-juan',
    name:     'San Juan',
    address:  '108 E Expressway 83',
    city:     'San Juan',
    state:    'TX',
    zip:      '78589',
    phone:    '(956) 787-1452',
    phoneRaw: '9567871452',
    mapQuery: '108+E+Expressway+83,+San+Juan,+TX+78589',
  },
]

export const HOURS = 'Open Daily · 7:00 AM – 10:00 PM'
