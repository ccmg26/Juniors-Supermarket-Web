-- ============================================================
-- Junior's Supermarket – Seed Data
-- ============================================================

-- ── Stores ───────────────────────────────────────────────────
INSERT INTO stores (
  name, slug, address, city, state, zip, phone, hours,
  ebt_wic, google_maps_url, services, is_active
) VALUES

-- 1. Edinburg University
(
  'Edinburg University',
  'edinburg-university',
  '2239 W University Dr',
  'Edinburg', 'TX', '78539',
  '(956) 348-2203',
  'Open Daily 7:00 AM – 10:00 PM',
  TRUE,
  'https://maps.google.com/maps?q=2239+W+University+Dr,+Edinburg,+TX+78539',
  ARRAY['Meat', 'Produce', 'Dairy', 'Grocery', 'Deli Cuts', 'Restaurant', 'Bakery', 'Tortilleria', 'Pay & Service Center'],
  TRUE
),

-- 2. Pharr Veterans
(
  'Pharr Veterans',
  'pharr-veterans',
  '5901 N Veterans Blvd',
  'Pharr', 'TX', '78577',
  '(956) 781-6645',
  'Open Daily 7:00 AM – 10:00 PM',
  TRUE,
  'https://maps.google.com/maps?q=5901+N+Veterans+Blvd,+Pharr,+TX+78577',
  ARRAY['Meat', 'Produce', 'Dairy', 'Grocery', 'Deli Cuts', 'Restaurant', 'Bakery', 'Tortilleria', 'Pay & Service Center'],
  TRUE
),

-- 3. Penitas
(
  'Penitas',
  'penitas',
  '38828 FM 2221',
  'Penitas', 'TX', '78576',
  '(956) 519-1211',
  'Open Daily 7:00 AM – 10:00 PM',
  TRUE,
  'https://maps.google.com/maps?q=38828+FM+2221,+Penitas,+TX+78576',
  ARRAY['Meat', 'Produce', 'Dairy', 'Grocery', 'Deli Cuts', 'Restaurant', 'Bakery', 'Tortilleria', 'Pay & Service Center'],
  TRUE
),

-- 4. Pharr South Cage
(
  'Pharr South Cage',
  'pharr-south-cage',
  '6501 S Cage Blvd',
  'Pharr', 'TX', '78577',
  '(956) 781-7040',
  'Open Daily 7:00 AM – 10:00 PM',
  TRUE,
  'https://maps.google.com/maps?q=6501+S+Cage+Blvd,+Pharr,+TX+78577',
  ARRAY['Meat', 'Produce', 'Dairy', 'Grocery', 'Deli Cuts', 'Restaurant', 'Bakery', 'Tortilleria', 'Pay & Service Center'],
  TRUE
),

-- 5. San Juan
(
  'San Juan',
  'san-juan',
  '108 E Expressway 83',
  'San Juan', 'TX', '78589',
  '(956) 787-1452',
  'Open Daily 7:00 AM – 10:00 PM',
  TRUE,
  'https://maps.google.com/maps?q=108+E+Expressway+83,+San+Juan,+TX+78589',
  ARRAY['Meat', 'Produce', 'Dairy', 'Grocery', 'Deli Cuts', 'Restaurant', 'Bakery', 'Tortilleria', 'Pay & Service Center'],
  TRUE
),

-- 6. Edinburg Closner
(
  'Edinburg Closner',
  'edinburg-closner',
  '3621 N Closner Blvd',
  'Edinburg', 'TX', '78541',
  '(956) 383-7178',
  'Open Daily 7:00 AM – 10:00 PM',
  TRUE,
  'https://maps.google.com/maps?q=3621+N+Closner+Blvd,+Edinburg,+TX+78541',
  ARRAY['Meat', 'Produce', 'Dairy', 'Grocery', 'Deli Cuts', 'Restaurant', 'Bakery', 'Tortilleria', 'Pay & Service Center'],
  TRUE
),

-- 7. Alton
(
  'Alton',
  'alton',
  '215 W Main Ave',
  'Alton', 'TX', '78573',
  '(956) 585-1371',
  'Open Daily 7:00 AM – 10:00 PM',
  TRUE,
  'https://maps.google.com/maps?q=215+W+Main+Ave,+Alton,+TX+78573',
  ARRAY['Meat', 'Produce', 'Dairy', 'Grocery', 'Deli Cuts', 'Restaurant', 'Bakery', 'Tortilleria', 'Pay & Service Center'],
  TRUE
),

-- 8. Hidalgo
(
  'Hidalgo',
  'hidalgo',
  '1410 E Ramon Ayala Dr',
  'Hidalgo', 'TX', '78557',
  '(956) 843-1835',
  'Open Daily 7:00 AM – 10:00 PM',
  TRUE,
  'https://maps.google.com/maps?q=1410+E+Ramon+Ayala+Dr,+Hidalgo,+TX+78557',
  ARRAY['Meat', 'Produce', 'Dairy', 'Grocery', 'Deli Cuts', 'Restaurant', 'Bakery', 'Tortilleria', 'Pay & Service Center'],
  TRUE
)

ON CONFLICT (slug) DO NOTHING;

-- ── Departments ───────────────────────────────────────────────
INSERT INTO departments (name, slug, description, icon, sort_order, is_active) VALUES
(
  'Meat Market', 'meat-market',
  'USDA-grade fresh cuts, custom butcher orders, and an unmatched selection of beef, pork, and chicken. We are The Real Meat People.',
  '🥩', 1, TRUE
),
(
  'Produce', 'produce',
  'Farm-fresh fruits and vegetables sourced locally and from trusted farms across the Valley and beyond.',
  '🥦', 2, TRUE
),
(
  'Dairy', 'dairy',
  'Milk, cheese, eggs, yogurt, and all your refrigerated essentials at competitive prices.',
  '🥛', 3, TRUE
),
(
  'Grocery', 'grocery',
  'Full aisles of pantry staples, canned goods, snacks, beverages, and household essentials.',
  '🛒', 4, TRUE
),
(
  'Deli Cuts', 'deli-cuts',
  'Premium sliced deli meats and cheeses, cut fresh to your order every day.',
  '🍖', 5, TRUE
),
(
  'Restaurant', 'restaurant',
  'Hot, ready-to-eat meals made fresh in-store. Perfect for a quick family meal.',
  '🍽️', 6, TRUE
),
(
  'Bakery', 'bakery',
  'Fresh-baked pan dulce, bolillos, cakes, and pastries made daily in our store.',
  '🥖', 7, TRUE
),
(
  'Tortilleria', 'tortilleria',
  'Handmade corn and flour tortillas made fresh every single day the traditional way.',
  '🫓', 8, TRUE
),
(
  'Pay & Service Center', 'pay-service-center',
  'Money orders, bill pay, wire transfers, and more — all under one roof.',
  '💳', 9, TRUE
)

ON CONFLICT (slug) DO NOTHING;

-- ── Sample Weekly Ad ──────────────────────────────────────────
INSERT INTO weekly_ads (title, valid_from, valid_to, pdf_url, is_active) VALUES
(
  'Weekly Ad – Jan 1–7, 2025',
  '2025-01-01',
  '2025-01-07',
  'https://your-supabase-project.supabase.co/storage/v1/object/public/weekly-ads/sample-ad.pdf',
  FALSE
)
ON CONFLICT DO NOTHING;

-- ── Sample Specials ───────────────────────────────────────────
INSERT INTO specials (title, price, original_price, category, valid_from, valid_to, disclaimer, is_active) VALUES
(
  'Whole Beef Brisket', '$2.49/lb', '$3.99/lb', 'Meat',
  CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days',
  'While Supplies Last', TRUE
),
(
  'Pork Shoulder (Carnitas)', '$1.99/lb', '$2.79/lb', 'Meat',
  CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days',
  'While Supplies Last', TRUE
),
(
  'Fresh Roma Tomatoes', '$0.79/lb', '$1.29/lb', 'Produce',
  CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days',
  'While Supplies Last', TRUE
),
(
  'Whole Chicken', '$1.29/lb', '$1.79/lb', 'Meat',
  CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days',
  'While Supplies Last', TRUE
),
(
  'Fresh Avocados 3-pack', '$2.99', '$4.99', 'Produce',
  CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days',
  'While Supplies Last', TRUE
),
(
  'Large Eggs (18-count)', '$3.49', '$4.99', 'Dairy',
  CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days',
  'While Supplies Last', TRUE
),
(
  'Pan Dulce (Dozen)', '$4.99', '$6.99', 'Bakery',
  CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days',
  'While Supplies Last', TRUE
),
(
  'Flour Tortillas (3lb bag)', '$3.99', '$5.49', 'Tortilleria',
  CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days',
  'While Supplies Last', TRUE
)
ON CONFLICT DO NOTHING;

-- ── Sample Events ─────────────────────────────────────────────
INSERT INTO events (title, description, start_date, end_date, is_featured, is_active) VALUES
(
  'BBQ Season Kickoff',
  'Fire up the grill! Special pricing on brisket, ribs, and all your BBQ essentials. All locations. While supplies last.',
  CURRENT_DATE,
  CURRENT_DATE + INTERVAL '14 days',
  TRUE, TRUE
),
(
  'Lenten Specials',
  'Fridays during Lent — amazing deals on fresh fish, shrimp, and seafood across all departments.',
  CURRENT_DATE,
  CURRENT_DATE + INTERVAL '40 days',
  FALSE, TRUE
)
ON CONFLICT DO NOTHING;

-- ── Sample Jobs ───────────────────────────────────────────────
INSERT INTO jobs (title, department, location, type, description, paycom_url, is_active) VALUES
(
  'Meat Cutter',
  'Meat Market',
  'Multiple Locations',
  'Full-Time',
  'Experienced meat cutters needed at multiple Valley locations. USDA knowledge preferred.',
  'https://www.paycomonline.net',
  TRUE
),
(
  'Cashier',
  'Front End',
  'All Locations',
  'Full-Time',
  'Friendly and reliable cashiers wanted for day, evening, and weekend shifts.',
  'https://www.paycomonline.net',
  TRUE
),
(
  'Produce Clerk',
  'Produce',
  'All Locations',
  'Full-Time',
  'Maintain fresh and attractive produce displays. Early morning shifts available.',
  'https://www.paycomonline.net',
  TRUE
),
(
  'Bakery Associate',
  'Bakery',
  'Select Locations',
  'Part-Time',
  'Assist in daily bakery production including pan dulce, bread, and pastries.',
  'https://www.paycomonline.net',
  TRUE
)
ON CONFLICT DO NOTHING;

-- ============================================================
-- ADMIN USER SETUP
-- ============================================================
-- After creating your first admin user in Supabase Auth,
-- insert their UUID here to grant admin privileges:
--
-- INSERT INTO admin_users (id, email) VALUES
--   ('your-user-uuid-here', 'admin@juniorssupermarket.com');
-- ============================================================
