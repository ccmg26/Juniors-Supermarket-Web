-- ============================================================
-- Weekly Ad Specials — April 8–14, 2026
-- Paste into Supabase SQL Editor and run.
-- Existing specials are NOT deleted — this only adds new ones.
-- ============================================================

INSERT INTO specials
  (title, price, original_price, category, valid_from, valid_to, disclaimer, is_featured, sort_order, is_active)
VALUES

-- ── MEAT ──────────────────────────────────────────────────────────────────────
('USDA Beef Jumbo Chicken Wings',         '$1.29/lb',  NULL,       'Meat', '2026-04-08', '2026-04-14', '5 lbs or more. While Supplies Last.',          true,  1,  true),
('USDA Beef Boneless Chuck Roast',        '$5.99/lb',  NULL,       'Meat', '2026-04-08', '2026-04-14', 'While Supplies Last.',                         false, 2,  true),
('T-Bone Steak',                          '$6.99/lb',  NULL,       'Meat', '2026-04-08', '2026-04-14', 'While Supplies Last.',                         false, 3,  true),
('Agujas Norteñas',                       '$4.99/lb',  NULL,       'Meat', '2026-04-08', '2026-04-14', 'While Supplies Last.',                         false, 4,  true),
('USDA Beef Boneless Chicken Breast',     '$2.29/lb',  NULL,       'Meat', '2026-04-08', '2026-04-14', 'While Supplies Last.',                         true,  5,  true),
('Angus Choice Loaded Short Ribs',        '$7.99/lb',  NULL,       'Meat', '2026-04-08', '2026-04-14', 'While Supplies Last.',                         false, 6,  true),
('Baby Back Pork Ribs (Portions)',        '$1.99/lb',  NULL,       'Meat', '2026-04-08', '2026-04-14', 'Family Pack. While Supplies Last.',            false, 7,  true),
('End Cut Pork Chops',                    '$1.69/lb',  NULL,       'Meat', '2026-04-08', '2026-04-14', 'Family Pack. While Supplies Last.',            false, 8,  true),
('Pork Head / Cabeza de Puerco',          '99¢/lb',    NULL,       'Meat', '2026-04-08', '2026-04-14', 'While Supplies Last.',                         false, 9,  true),
('Ham End Pork Roast',                    '$1.49/lb',  NULL,       'Meat', '2026-04-08', '2026-04-14', 'While Supplies Last.',                         false, 10, true),
('Peyton''s Bacon 12oz',                  '$3.99',     NULL,       'Meat', '2026-04-08', '2026-04-14', 'While Supplies Last.',                         false, 11, true),
('Peyton''s Meat Franks 12oz',            '$1.99',     NULL,       'Meat', '2026-04-08', '2026-04-14', 'While Supplies Last.',                         false, 12, true),
('Peyton''s Beef or Pork Chorizo 8oz',   '$3.99',     NULL,       'Meat', '2026-04-08', '2026-04-14', 'While Supplies Last.',                         false, 13, true),
('John Morrell Assorted Sausage 7oz',    '$1.99',     NULL,       'Meat', '2026-04-08', '2026-04-14', 'While Supplies Last.',                         false, 14, true),
('Eckrich Bologna 16oz',                  '$2.99',     NULL,       'Meat', '2026-04-08', '2026-04-14', 'While Supplies Last.',                         false, 15, true),
('Lunchables Fun Pack Assorted',          '$2.99',     NULL,       'Meat', '2026-04-08', '2026-04-14', '8.9–10.7oz. While Supplies Last.',             false, 16, true),
('Fud Smoked Sausage 40oz',              '$8.49',     NULL,       'Meat', '2026-04-08', '2026-04-14', 'While Supplies Last.',                         false, 17, true),

-- ── PRODUCE ───────────────────────────────────────────────────────────────────
('Fresh White Potato',                   '$1.99',     NULL,       'Produce', '2026-04-08', '2026-04-14', '5lb bag. While Supplies Last.',               true,  1,  true),
('Fresh Spinach Bunch',                  '2/$3',      NULL,       'Produce', '2026-04-08', '2026-04-14', 'While Supplies Last.',                        false, 2,  true),
('Fresh Bosc Pear',                      '99¢/lb',    NULL,       'Produce', '2026-04-08', '2026-04-14', 'While Supplies Last.',                        false, 3,  true),
('Fresh Broccoli Crowns',                '69¢/lb',    NULL,       'Produce', '2026-04-08', '2026-04-14', 'While Supplies Last.',                        false, 4,  true),
('Zesty Yellow Onions',                  '79¢/lb',    NULL,       'Produce', '2026-04-08', '2026-04-14', 'While Supplies Last.',                        false, 5,  true),
('Fresh Crisp Cucumbers',                '69¢/lb',    NULL,       'Produce', '2026-04-08', '2026-04-14', 'While Supplies Last.',                        false, 6,  true),
('Fresh Mini Cucumbers',                 '$2.69',     NULL,       'Produce', '2026-04-08', '2026-04-14', '12oz bag. While Supplies Last.',              false, 7,  true),
('Dole Classic Romaine or Spring Mix',   '$1.69',     NULL,       'Produce', '2026-04-08', '2026-04-14', '11oz. While Supplies Last.',                  false, 8,  true),

-- ── GROCERY ───────────────────────────────────────────────────────────────────
('Coca-Cola, Sprite, Fanta or Dr Pepper','$10.99',    '$14.99',   'Grocery', '2026-04-08', '2026-04-14', '20pk 12oz. While Supplies Last.',             true,  1,  true),
('Junior''s Drinking Water',              '$2.99',     '$3.50',    'Grocery', '2026-04-08', '2026-04-14', 'While Supplies Last.',                        false, 2,  true),
('Food Club Lentils, Pinto Beans or Rice','89¢',      '$1.19',    'Grocery', '2026-04-08', '2026-04-14', 'While Supplies Last.',                        false, 3,  true),
('Crisco Vegetable Oil',                 '$3.69',     '$5.79',    'Grocery', '2026-04-08', '2026-04-14', '40oz. While Supplies Last.',                  false, 4,  true),
('Kellogg''s Assorted Cereals',          '$3.99',     '$5.59',    'Grocery', '2026-04-08', '2026-04-14', '8.9–16oz. Apple Jacks, Froot Loops, Cocoa Krispies, Frosted Flakes or Special K. While Supplies Last.', false, 5, true),
('Kool-Aid Assorted Jammers',            '2/$5',      '$5.09',    'Grocery', '2026-04-08', '2026-04-14', 'While Supplies Last.',                        false, 6,  true),
('Food Club Pasta Sauce or Spaghetti',   '2/$3',      '$2.99',    'Grocery', '2026-04-08', '2026-04-14', '24oz sauce or 16oz pasta. While Supplies Last.', false, 7, true),
('Food Club Assorted Coffee',            '$12.99',    '$18.19',   'Grocery', '2026-04-08', '2026-04-14', '22.56–24.2oz. While Supplies Last.',          false, 8,  true),
('Cheetos or Frito Assorted',            '$3.99',     NULL,       'Grocery', '2026-04-08', '2026-04-14', 'While Supplies Last.',                        false, 9,  true),
('Food Club Macaroni Cheese Dinner',     '2/$1',      NULL,       'Grocery', '2026-04-08', '2026-04-14', '7oz. While Supplies Last.',                   false, 10, true),
('Food Club Baked Beans Assorted',       '$1.99',     NULL,       'Grocery', '2026-04-08', '2026-04-14', '28oz. While Supplies Last.',                  false, 11, true),
('Squirt, 7UP, Big Red or Sunkist',      '$3.99',     NULL,       'Grocery', '2026-04-08', '2026-04-14', '6pk 16.9oz. While Supplies Last.',            false, 12, true),
('Del Primo Assorted Salsas',            '$1.99',     NULL,       'Grocery', '2026-04-08', '2026-04-14', '10.58oz. While Supplies Last.',               false, 13, true),
('Skippy Peanut Butter',                 '$1.89',     NULL,       'Grocery', '2026-04-08', '2026-04-14', '16.3oz Natural, Creamy or Crunchy. While Supplies Last.', false, 14, true),
('Food Club Granulated Sugar',           '$2.99',     NULL,       'Grocery', '2026-04-08', '2026-04-14', '4lb bag. While Supplies Last.',               false, 15, true),

-- ── DAIRY ─────────────────────────────────────────────────────────────────────
('La Vaquita Shredded Cheese',           '2/$5',      NULL,       'Dairy', '2026-04-08', '2026-04-14', '8oz. While Supplies Last.',                     false, 1,  true),
('Blue Bunny Assorted Sundae or Ice Cream','2/$4',    NULL,       'Dairy', '2026-04-08', '2026-04-14', '5.5–14oz. While Supplies Last.',                false, 2,  true),
('Plain Happy Orange Juice',             '$4.89',     NULL,       'Dairy', '2026-04-08', '2026-04-14', '64oz. While Supplies Last.',                    false, 3,  true),
('Blue Bunny Assorted Yogurt',           '4/$5',      NULL,       'Dairy', '2026-04-08', '2026-04-14', '7oz. While Supplies Last.',                     false, 4,  true),

-- ── DELI CUTS (Quesos Y Mas) ──────────────────────────────────────────────────
('Chimex Grill Sausage',                 '$3.69',     NULL,       'Deli Cuts', '2026-04-08', '2026-04-14', '14oz. While Supplies Last.',                false, 1,  true),
('Bar S Cooked Ham',                     '$3.69',     NULL,       'Deli Cuts', '2026-04-08', '2026-04-14', '16oz. While Supplies Last.',                false, 2,  true),
('Fud Tradicional Queso Fresco',         '$5.78',     NULL,       'Deli Cuts', '2026-04-08', '2026-04-14', 'While Supplies Last.',                      false, 3,  true),
('Fud Oaxaca Cheese',                    '$5.78',     NULL,       'Deli Cuts', '2026-04-08', '2026-04-14', 'While Supplies Last.',                      false, 4,  true),
('La Vaquita Crema Salvadoreña',         '$3.49',     NULL,       'Deli Cuts', '2026-04-08', '2026-04-14', 'While Supplies Last.',                      false, 5,  true),
('Los Altos Queso Panela',               '$6.49',     NULL,       'Deli Cuts', '2026-04-08', '2026-04-14', 'While Supplies Last.',                      false, 6,  true);
