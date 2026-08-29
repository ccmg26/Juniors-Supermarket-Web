-- ============================================================
-- Weekly Ad Specials — April 15–21, 2026
-- Generated from weekly ad image.
-- Items marked ⚠️ need a quick price confirm from the physical ad.
-- Run AFTER confirming flagged items.
-- ============================================================

-- Deactivate last week's specials
UPDATE specials SET is_active = false
WHERE valid_to < '2026-04-15';

INSERT INTO specials
  (title, price, original_price, category, valid_from, valid_to, disclaimer, is_featured, sort_order, is_active)
VALUES

-- ── MEAT — Top banner featured ────────────────────────────────────────────────
('Split Chicken Breast',                  '99¢/lb',   NULL,     'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                        true,  1,  true),
('Chicken Leg Quarters',                  '59¢/lb',   NULL,     'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                        true,  2,  true),
('Angus Chuck Roast',                     '$5.99/lb', NULL,     'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                        true,  3,  true),  -- ⚠️ VERIFY price
('Aguachiles Norteñas',                   '$6.99/lb', NULL,     'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                        true,  4,  true),  -- ⚠️ VERIFY price

-- ── MEAT — Interior grid ──────────────────────────────────────────────────────
('USDA Beef Top Round Steak',             '$1.59/lb', NULL,     'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                        false, 5,  true),  -- ⚠️ VERIFY
('Paleta de Puerco (Pork Shoulder)',      '$1.59/lb', NULL,     'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                        false, 6,  true),  -- ⚠️ VERIFY
('Beef Menudo / Menudencias',             '$1.99/lb', NULL,     'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                        false, 7,  true),  -- ⚠️ VERIFY
('Country Style Pork Ribs',               '$1.99/lb', NULL,     'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                        false, 8,  true),  -- ⚠️ VERIFY
('Skin On Pork Ribs',                     '$1.49/lb', NULL,     'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                        false, 9,  true),  -- ⚠️ VERIFY
('Pork Neck Bones / Espinazo',            '99¢/lb',   NULL,     'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                        false, 10, true),  -- ⚠️ VERIFY
('Tilapia Fillets',                       '$3.99/lb', NULL,     'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                        false, 11, true),  -- ⚠️ VERIFY
('Bar S Smoked Franks / Sausage',         '$2.99',    NULL,     'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                        false, 12, true),  -- ⚠️ VERIFY
('Food Club Breaded Chicken',             '$4.99',    NULL,     'Meat', '2026-04-15', '2026-04-21', 'While Supplies Last.',                        false, 13, true),  -- ⚠️ VERIFY

-- ── GROCERY ───────────────────────────────────────────────────────────────────
('Party Snacks / Popcorn Assorted',       '2/$6',     NULL,     'Grocery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                    false, 1,  true),  -- ⚠️ VERIFY item name
('Food Club Pasta or Canned Goods',       '2/$5',     NULL,     'Grocery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                    false, 2,  true),  -- ⚠️ VERIFY
('Assorted Snack Chips',                  '2/$4',     NULL,     'Grocery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                    false, 3,  true),  -- ⚠️ VERIFY
('Food Club Beans or Rice',               '99¢',      NULL,     'Grocery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                    false, 4,  true),  -- ⚠️ VERIFY
('San Marcos Jalapeños / Peppers',        '99¢',      NULL,     'Grocery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                    false, 5,  true),  -- ⚠️ VERIFY
('La Morena / El Mexicano Assorted',      '$1.99',    NULL,     'Grocery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                    false, 6,  true),  -- ⚠️ VERIFY
('Maseca Corn Masa Flour',                '$2.99',    NULL,     'Grocery', '2026-04-15', '2026-04-21', '4.4lb bag. While Supplies Last.',          false, 7,  true),  -- ⚠️ VERIFY
('Naranja / Assorted Naturales',          '2/$4',     NULL,     'Grocery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                    false, 8,  true),  -- ⚠️ VERIFY
('Maxwell House / Assorted Coffee',       '$2.99',    NULL,     'Grocery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                    false, 9,  true),  -- ⚠️ VERIFY
('Food Club Club Top Soup',               '89¢',      NULL,     'Grocery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                    false, 10, true),  -- ⚠️ VERIFY

-- ── DAIRY & FROZEN ────────────────────────────────────────────────────────────
('Assorted Cheese Slices / Shredded',     '2/$3',     NULL,     'Dairy', '2026-04-15', '2026-04-21', 'While Supplies Last.',                      false, 1,  true),  -- ⚠️ VERIFY
('Yoplait / Assorted Yogurt',             '2/$4',     NULL,     'Dairy', '2026-04-15', '2026-04-21', 'While Supplies Last.',                      false, 2,  true),  -- ⚠️ VERIFY
('La Vaquita / Cacique Crema',            '2/$5',     NULL,     'Dairy', '2026-04-15', '2026-04-21', 'While Supplies Last.',                      false, 3,  true),  -- ⚠️ VERIFY
('Orange Juice 64oz',                     '$2.99',    NULL,     'Dairy', '2026-04-15', '2026-04-21', 'While Supplies Last.',                      false, 4,  true),  -- ⚠️ VERIFY
('Frozen Burritos / El Monterey',         '$4.99',    NULL,     'Dairy', '2026-04-15', '2026-04-21', 'While Supplies Last.',                      false, 5,  true),  -- ⚠️ VERIFY

-- ── DELI CUTS — Quesos Y Mas ──────────────────────────────────────────────────
('Queso Fresco / Panela Assorted',        '$5.99',    NULL,     'Deli Cuts', '2026-04-15', '2026-04-21', 'While Supplies Last.',                  false, 1,  true),  -- ⚠️ VERIFY
('Oaxaca / Quesillo String Cheese',       '$5.99',    NULL,     'Deli Cuts', '2026-04-15', '2026-04-21', 'While Supplies Last.',                  false, 2,  true),  -- ⚠️ VERIFY
('Crema / Requeson Assorted',             '$3.49',    NULL,     'Deli Cuts', '2026-04-15', '2026-04-21', 'While Supplies Last.',                  false, 3,  true),  -- ⚠️ VERIFY

-- ── DELI CUTS — Salchichonería ────────────────────────────────────────────────
('Fud / Asst Salchichón Sausage',         '$3.99',    NULL,     'Deli Cuts', '2026-04-15', '2026-04-21', 'While Supplies Last.',                  false, 4,  true),  -- ⚠️ VERIFY
('Eckrich / Bologna Assorted',            '$2.99',    NULL,     'Deli Cuts', '2026-04-15', '2026-04-21', 'While Supplies Last.',                  false, 5,  true),  -- ⚠️ VERIFY
('Cooked Ham / Headcheese',               '$3.69',    NULL,     'Deli Cuts', '2026-04-15', '2026-04-21', 'While Supplies Last.',                  false, 6,  true),  -- ⚠️ VERIFY

-- ── BAKERY / PANADERÍA ────────────────────────────────────────────────────────
('Pan Dulce Assorted',                    '$3.99',    NULL,     'Bakery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                      false, 1,  true),
('Tres Leches / Large Cake',              '$12.99',   NULL,     'Bakery', '2026-04-15', '2026-04-21', 'While Supplies Last.',                      false, 2,  true),  -- ⚠️ VERIFY

-- ── PRODUCE ───────────────────────────────────────────────────────────────────
('Fresh Mangos',                          '2/$3',     NULL,     'Produce', '2026-04-15', '2026-04-21', 'While Supplies Last.',                     false, 1,  true),  -- ⚠️ VERIFY item
('Fresh Jalapeños or Chile Peppers',      '99¢/lb',   NULL,     'Produce', '2026-04-15', '2026-04-21', 'While Supplies Last.',                     false, 2,  true),  -- ⚠️ VERIFY item
('White or Yellow Onions',                '2 lbs/$1', NULL,     'Produce', '2026-04-15', '2026-04-21', 'While Supplies Last.',                     false, 3,  true),  -- ⚠️ VERIFY item
('Fresh Avocados',                        '2/$3',     NULL,     'Produce', '2026-04-15', '2026-04-21', 'While Supplies Last.',                     false, 4,  true),  -- ⚠️ VERIFY item
('Navel Oranges or Limes',                '99¢/lb',   NULL,     'Produce', '2026-04-15', '2026-04-21', 'While Supplies Last.',                     false, 5,  true);  -- ⚠️ VERIFY item
