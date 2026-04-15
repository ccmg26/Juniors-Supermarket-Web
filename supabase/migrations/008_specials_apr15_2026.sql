-- ============================================================
-- Weekly Ad Specials — April 15–21, 2026
-- Items marked ⚠️ VERIFY need a price double-check before running.
-- Paste into Supabase SQL Editor and run.
-- ============================================================

-- Deactivate last week's specials first
UPDATE specials SET is_active = false
WHERE valid_to < '2026-04-15';

INSERT INTO specials
  (title, price, original_price, category, valid_from, valid_to, disclaimer, is_featured, sort_order, is_active)
VALUES

-- ── MEAT — Featured banner (clearly readable) ─────────────────────────────────
('Split Chicken Breast',                  '99¢/lb',   NULL,      'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                         true,  1,  true),
('Chicken Leg Quarters',                  '59¢/lb',   NULL,      'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                         true,  2,  true),
('Angus Chuck Roast',                     '$5.99/lb', NULL,      'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                         true,  3,  true),  -- ⚠️ VERIFY
('Aguachiles Norteñas',                   '$6.99/lb', NULL,      'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                         false, 4,  true),  -- ⚠️ VERIFY

-- ── MEAT — Interior grid ──────────────────────────────────────────────────────
('USDA Beef Top Round Steak',             '$2.80/lb', NULL,      'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                         false, 5,  true),  -- ⚠️ VERIFY
('Paleta de Puerco (Pork Shoulder)',      '$1.59/lb', NULL,      'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                         false, 6,  true),  -- ⚠️ VERIFY
('Beef Menudo / Menudencias',             '$1.59/lb', NULL,      'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                         false, 7,  true),  -- ⚠️ VERIFY
('Baby Back Pork Ribs',                   '$1.99/lb', NULL,      'Meat', '2026-04-15', '2026-04-21', 'Family Pack. While Supplies Last.',            false, 8,  true),  -- ⚠️ VERIFY
('Country Style Pork Ribs',              '$1.99/lb', NULL,      'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                         false, 9,  true),  -- ⚠️ VERIFY
('Pork Neck Bones / Espinazo',            '99¢/lb',  NULL,      'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                         false, 10, true),  -- ⚠️ VERIFY
('Skin On Pork Ribs',                     '$1.49/lb', NULL,      'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                         false, 11, true),  -- ⚠️ VERIFY
('Tilapia Fillets',                       '$3.99/lb', NULL,      'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                         false, 12, true),  -- ⚠️ VERIFY
('Bar S Smoked Sausage',                  '$2.99',    NULL,      'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                         false, 13, true),  -- ⚠️ VERIFY
('Food Club Breaded Chicken',             '$4.99',    NULL,      'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                         false, 14, true),  -- ⚠️ VERIFY

-- ── GROCERY ───────────────────────────────────────────────────────────────────
('Bagel / Assorted Snacks',               '2/$6',     NULL,      'Grocery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                     false, 1,  true),  -- ⚠️ VERIFY item name
('Food Club Assorted Items',              '2/$5',     NULL,      'Grocery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                     false, 2,  true),  -- ⚠️ VERIFY item name
('Craig''s Assorted',                     '2/$4',     NULL,      'Grocery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                     false, 3,  true),  -- ⚠️ VERIFY
('San Marcos Jalapeños Peppers',          '99¢',      NULL,      'Grocery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                     false, 4,  true),  -- ⚠️ VERIFY
('Naranja / Assorted Naturales',          '2/$4',     NULL,      'Grocery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                     false, 5,  true),  -- ⚠️ VERIFY
('Food Club Beans or Rice',               '89¢',      NULL,      'Grocery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                     false, 6,  true),  -- ⚠️ VERIFY
('La Morena Black Beans / Salsa',         '$1.00',    NULL,      'Grocery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                     false, 7,  true),  -- ⚠️ VERIFY
('El Mexicano Assorted',                  '$2.99',    NULL,      'Grocery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                     false, 8,  true),  -- ⚠️ VERIFY
('Maseca Corn Masa Flour',                '$2.99',    NULL,      'Grocery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                     false, 9,  true),  -- ⚠️ VERIFY
('Food Club Club Top Ramen',              '89¢',      NULL,      'Grocery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                     false, 10, true),  -- ⚠️ VERIFY
('Maxell Assorted Potatoes / Pickles',    '2/$5',     NULL,      'Grocery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                     false, 11, true),  -- ⚠️ VERIFY
('Food Club Club Top Soup',               '$2.99',    NULL,      'Grocery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                     false, 12, true),  -- ⚠️ VERIFY

-- ── DAIRY & FROZEN ────────────────────────────────────────────────────────────
('Clover Valley Shredded Cheese',         '2/$3',     NULL,      'Dairy', '2026-04-15', '2026-04-21', 'While Supplies Last.',                       false, 1,  true),  -- ⚠️ VERIFY
('Yoplait / Assorted Yogurt',             '2/$4',     NULL,      'Dairy', '2026-04-15', '2026-04-21', 'While Supplies Last.',                       false, 2,  true),  -- ⚠️ VERIFY
('Cacique Crema / Sour Cream',            '2/$5',     NULL,      'Dairy', '2026-04-15', '2026-04-21', 'While Supplies Last.',                       false, 3,  true),  -- ⚠️ VERIFY
('Orange Juice / Juice Assorted',         '$2.99',    NULL,      'Dairy', '2026-04-15', '2026-04-21', 'While Supplies Last.',                       false, 4,  true),  -- ⚠️ VERIFY
('Frozen Burritos / Chimichangas',        '$4.99',    NULL,      'Dairy', '2026-04-15', '2026-04-21', 'While Supplies Last.',                       false, 5,  true),  -- ⚠️ VERIFY

-- ── DELI CUTS — Quesos Y Mas ──────────────────────────────────────────────────
('Queso Fresco Assorted',                 '$5.99',    NULL,      'Deli Cuts', '2026-04-15', '2026-04-21', 'While Supplies Last.',                   false, 1,  true),  -- ⚠️ VERIFY
('Requeson / Crema Cheese',               '$3.99',    NULL,      'Deli Cuts', '2026-04-15', '2026-04-21', 'While Supplies Last.',                   false, 2,  true),  -- ⚠️ VERIFY
('Oaxaca Quesillo String Cheese',         '$5.99',    NULL,      'Deli Cuts', '2026-04-15', '2026-04-21', 'While Supplies Last.',                   false, 3,  true),  -- ⚠️ VERIFY

-- ── DELI CUTS — Salchichonería ────────────────────────────────────────────────
('Fud / Assorted Salchichón',             '$3.99',    NULL,      'Deli Cuts', '2026-04-15', '2026-04-21', 'While Supplies Last.',                   false, 4,  true),  -- ⚠️ VERIFY
('Bologna / Ham Assorted',                '$2.99',    NULL,      'Deli Cuts', '2026-04-15', '2026-04-21', 'While Supplies Last.',                   false, 5,  true),  -- ⚠️ VERIFY

-- ── BAKERY / PANADERÍA ────────────────────────────────────────────────────────
('Pan Dulce Assorted (6 pack)',           '$3.99',    NULL,      'Bakery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                      false, 1,  true),  -- ⚠️ VERIFY
('Large Cake / Three Leches',             '$12.99',   NULL,      'Bakery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                      false, 2,  true),  -- ⚠️ VERIFY

-- ── PRODUCE ───────────────────────────────────────────────────────────────────
('Fresh Mangos',                          '2/$3',     NULL,      'Produce', '2026-04-15', '2026-04-21', 'While Supplies Last.',                     false, 1,  true),  -- ⚠️ VERIFY item
('Fresh Jalapeños or Peppers',            '99¢/lb',   NULL,      'Produce', '2026-04-15', '2026-04-21', 'While Supplies Last.',                     false, 2,  true),  -- ⚠️ VERIFY item
('White or Yellow Onions',                '2 lbs/$1', NULL,      'Produce', '2026-04-15', '2026-04-21', 'While Supplies Last.',                     false, 3,  true),  -- ⚠️ VERIFY item
('Fresh Avocados',                        '2/$3',     NULL,      'Produce', '2026-04-15', '2026-04-21', 'While Supplies Last.',                     false, 4,  true),  -- ⚠️ VERIFY item
('Navel Oranges / Limes',                 '99¢/lb',   NULL,      'Produce', '2026-04-15', '2026-04-21', 'While Supplies Last.',                     false, 5,  true);  -- ⚠️ VERIFY item
