-- ============================================================
-- Weekly Ad Specials — April 15–21, 2026
-- VERIFY prices marked with -- ⚠️ VERIFY before running
-- Paste into Supabase SQL Editor after confirming.
-- ============================================================

-- First, deactivate last week's specials
UPDATE specials SET is_active = false
WHERE valid_to < '2026-04-15';

INSERT INTO specials
  (title, price, original_price, category, valid_from, valid_to, disclaimer, is_featured, sort_order, is_active)
VALUES

-- ── MEAT — Featured (top banner, clearly readable) ────────────────────────────
('Split Chicken Breast',                  '99¢/lb',    NULL,    'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                  true,  1,  true),
('Chicken Leg Quarters',                  '59¢/lb',    NULL,    'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                  true,  2,  true),  -- ⚠️ VERIFY price
('Angus Choice Chuck Roast',              '$5.99/lb',  NULL,    'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                  true,  3,  true),  -- ⚠️ VERIFY price
('Aguachiles Norteñas',                   '$6.99/lb',  NULL,    'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                  false, 4,  true),  -- ⚠️ VERIFY price

-- ── MEAT — Interior items ─────────────────────────────────────────────────────
('USDA Top Round Steak',                  '$2.80/lb',  NULL,    'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                  false, 5,  true),  -- ⚠️ VERIFY
('Paleta de Puerco (Pork Shoulder)',      '$1.59/lb',  NULL,    'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                  false, 6,  true),  -- ⚠️ VERIFY
('Beef Menudo / Menudencias',             '$1.59/lb',  NULL,    'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                  false, 7,  true),  -- ⚠️ VERIFY
('Baby Back Pork Ribs',                   '$1.99/lb',  NULL,    'Meat', '2026-04-15', '2026-04-21', 'Family Pack. While Supplies Last.',     false, 8,  true),  -- ⚠️ VERIFY
('Pork Neck Bones',                       '99¢/lb',    NULL,    'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                  false, 9,  true),  -- ⚠️ VERIFY
('Tilapia Fillets',                       '$3.99/lb',  NULL,    'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                  false, 10, true),  -- ⚠️ VERIFY

-- ── PRODUCE (bottom-right section) ───────────────────────────────────────────
('Fresh Roma Tomatoes',                   '2/$3',      NULL,    'Produce', '2026-04-15', '2026-04-21', 'While Supplies Last.',               false, 1,  true),  -- ⚠️ VERIFY item
('Fresh Jalapeños',                       '99¢/lb',    NULL,    'Produce', '2026-04-15', '2026-04-21', 'While Supplies Last.',               false, 2,  true),  -- ⚠️ VERIFY item
('White Onions',                          '2 lbs/$1',  NULL,    'Produce', '2026-04-15', '2026-04-21', 'While Supplies Last.',               false, 3,  true),  -- ⚠️ VERIFY item
('Fresh Avocados',                        '2/$3',      NULL,    'Produce', '2026-04-15', '2026-04-21', 'While Supplies Last.',               false, 4,  true),  -- ⚠️ VERIFY item

-- ── DAIRY & FROZEN ────────────────────────────────────────────────────────────
('La Vaquita Shredded Cheese',            '2/$5',      NULL,    'Dairy', '2026-04-15', '2026-04-21', 'While Supplies Last.',                false, 1,  true),  -- ⚠️ VERIFY
('Assorted Ice Cream / Frozen Items',     '2/$5',      NULL,    'Dairy', '2026-04-15', '2026-04-21', 'While Supplies Last.',                false, 2,  true),  -- ⚠️ VERIFY

-- ── DELI CUTS / SALCHICHONERÍA ────────────────────────────────────────────────
('Assorted Deli Sausage',                 '$3.99',     NULL,    'Deli Cuts', '2026-04-15', '2026-04-21', 'While Supplies Last.',            false, 1,  true),  -- ⚠️ VERIFY
('Queso Fresco',                          '$5.99',     NULL,    'Deli Cuts', '2026-04-15', '2026-04-21', 'While Supplies Last.',            false, 2,  true),  -- ⚠️ VERIFY

-- ── BAKERY / PANADERÍA ────────────────────────────────────────────────────────
('Pan Dulce Assorted',                    '$3.99',     NULL,    'Bakery', '2026-04-15', '2026-04-21', 'While Supplies Last.',               false, 1,  true);  -- ⚠️ VERIFY
