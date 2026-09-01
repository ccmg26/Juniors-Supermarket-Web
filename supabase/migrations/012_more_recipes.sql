-- ============================================================
-- 012 — Additional Recipe Seeds
-- Run in Supabase SQL Editor (idempotent — conflict = skip)
-- ============================================================

insert into public.recipes (title, slug, description, category, cook_time, prep_time, servings, difficulty, ingredients, instructions, tips, is_featured, sort_order)
values

-- ── CHICKEN ──────────────────────────────────────────────────
(
  'Pollo Asado — Grilled Chicken',
  'pollo-asado',
  'Juicy, citrus-marinated chicken thighs grilled over high heat. The Valley''s go-to weeknight dinner, ready in under an hour.',
  'BBQ & Grilling',
  '20 min',
  '15 min (+ 1 hr marinating)',
  '4–6',
  'Easy',
  '["2 lbs Junior''s chicken thighs or leg quarters","Juice of 3 limes","Juice of 1 orange","4 cloves garlic, minced","1 tsp cumin","1 tsp chili powder","1/2 tsp oregano","2 tbsp olive oil","Salt and pepper to taste","Cilantro and lime wedges for serving"]'::jsonb,
  '["Combine lime juice, orange juice, garlic, cumin, chili powder, oregano, olive oil, salt, and pepper.","Add chicken to a zip-lock bag or dish and pour marinade over. Marinate at least 1 hour — overnight is best.","Remove from fridge 20 minutes before grilling.","Grill over medium-high heat, 6–7 minutes per side, until internal temp reaches 165°F.","Let rest 5 minutes, then serve with cilantro, lime, and warm tortillas."]'::jsonb,
  'Ask your Junior''s butcher to remove the skin from thighs — the marinade penetrates deeper.',
  true,
  5
),

-- ── CARNE ASADA TACOS ────────────────────────────────────────
(
  'Street-Style Carne Asada Tacos',
  'carne-asada-tacos',
  'The classic — thin-sliced grilled carne asada on warm corn tortillas from our tortilleria, topped simply with cilantro, onion, and salsa.',
  'Carne Asada',
  '15 min',
  '2 hrs marinating',
  '4',
  'Easy',
  '["1.5 lbs Junior''s pre-marinated carne asada (or marinate your own flank steak)","12 fresh corn tortillas from our tortilleria","1/2 white onion, finely diced","1 bunch fresh cilantro, chopped","Salsa verde or roja to taste","Lime wedges","Guacamole (optional)"]'::jsonb,
  '["If marinating your own: combine lime juice, orange juice, garlic, cumin, and chili powder. Marinate steak 2+ hours.","Grill carne asada over high heat 3–4 minutes per side for medium. Let rest.","Slice thin against the grain, then roughly chop into small pieces.","Warm tortillas on the grill or directly over a gas flame.","Double up tortillas, pile on carne asada, top with onion, cilantro, and a squeeze of lime. Serve with salsa."]'::jsonb,
  'Pick up Junior''s pre-marinated carne asada — skip the marinade step and have tacos on the table in 20 minutes.',
  false,
  6
),

-- ── BIRRIA ───────────────────────────────────────────────────
(
  'Beef Birria — Valley Style',
  'beef-birria',
  'Rich, deeply spiced beef birria with a brick-red consommé. Serve as tacos dorados, in a bowl, or with your tortilleria tortillas for dipping.',
  'Soups & Stews',
  '3.5 hrs',
  '30 min',
  '6–8',
  'Medium',
  '["3 lbs Junior''s beef chuck roast or short ribs","5 guajillo chiles, seeds removed","3 ancho chiles, seeds removed","3 chipotle peppers in adobo","1 head of garlic","1 white onion, halved","2 tomatoes","1 tsp cumin","1 tsp oregano","2 bay leaves","4 cups beef broth","Salt and pepper","Corn tortillas, onion, cilantro, and lime for serving"]'::jsonb,
  '["Toast guajillo and ancho chiles in a dry pan 30 seconds per side. Soak in hot water 20 minutes until soft.","Blend soaked chiles, garlic, onion, tomatoes, chipotle peppers, cumin, oregano, and 1 cup beef broth until smooth.","Season beef with salt and pepper. In a Dutch oven, sear beef in batches until browned all over.","Pour chile sauce over beef. Add remaining broth and bay leaves. Bring to a boil, then reduce heat.","Cover and simmer 3–3.5 hours until beef falls apart easily. Shred beef.","For tacos dorados: dip tortillas in the consommé, fill with beef and cheese, fry in a pan until crispy. Serve with consommé for dipping."]'::jsonb,
  'Ask your Junior''s butcher about short ribs — the extra collagen makes the richest consommé.',
  true,
  7
),

-- ── LENTEN / SEAFOOD ─────────────────────────────────────────
(
  'Camarones a la Diabla',
  'camarones-a-la-diabla',
  'Spicy, bold shrimp in a fiery guajillo-chipotle sauce. A Lenten favorite and a crowd-pleaser all year long. Ready in 25 minutes.',
  'Quick Weeknight',
  '15 min',
  '10 min',
  '4',
  'Easy',
  '["1.5 lbs large shrimp, peeled and deveined","4 guajillo chiles, seeds removed","3 chipotle peppers in adobo","4 cloves garlic","1/2 white onion","2 tomatoes, roasted","1 tbsp butter","1 tbsp olive oil","Salt and pepper to taste","White rice and warm tortillas for serving"]'::jsonb,
  '["Toast guajillo chiles in a dry pan. Soak in hot water 15 minutes.","Blend soaked chiles, chipotle peppers, garlic, onion, and roasted tomatoes until smooth.","Heat butter and oil in a large skillet over high heat. Season shrimp with salt and pepper.","Sear shrimp 1 minute per side until pink. Remove and set aside.","Pour sauce into the same pan. Simmer 5 minutes, stirring.","Return shrimp to the pan. Coat with sauce and cook 1 more minute. Serve immediately with rice and tortillas."]'::jsonb,
  'For Lent, look for our fresh shrimp at the meat counter — we stock large Gulf shrimp on Fridays.',
  false,
  8
),

-- ── SIDES ────────────────────────────────────────────────────
(
  'Mexican Rice — Arroz Rojo',
  'arroz-rojo',
  'The perfect side for every plate — fluffy, tomato-seasoned Mexican rice that goes with carne asada, carnitas, pollo, and everything else.',
  'Sides & Salsas',
  '25 min',
  '10 min',
  '6',
  'Easy',
  '["2 cups long-grain white rice","3 tbsp vegetable oil","4 cloves garlic, minced","1/4 white onion, finely diced","1 can (8 oz) tomato sauce","3 cups chicken broth","1 tsp cumin","Salt to taste","Cilantro for garnish (optional)"]'::jsonb,
  '["Heat oil in a heavy pot or Dutch oven over medium-high heat.","Add dry rice and toast, stirring, until golden and lightly browned — about 5 minutes. Don''t skip this step.","Add garlic and onion. Cook 1 minute, stirring.","Pour in tomato sauce, chicken broth, cumin, and salt. Stir to combine.","Bring to a boil, then reduce heat to the lowest setting. Cover tightly.","Cook 20 minutes without lifting the lid. Remove from heat and let rest 5 minutes. Fluff with a fork and serve."]'::jsonb,
  'Toasting the rice dry is the secret to non-sticky, fluffy arroz. Keep stirring and watch the color carefully.',
  false,
  9
),

-- ── BREAKFAST ────────────────────────────────────────────────
(
  'Machaca con Huevo',
  'machaca-con-huevo',
  'A classic Valley breakfast — dried, shredded beef (machaca) scrambled with eggs, onion, tomato, and jalapeño. Served with fresh tortillas and refried beans.',
  'Breakfast',
  '15 min',
  '10 min',
  '4',
  'Easy',
  '["1 cup machaca (dried shredded beef), available at the Junior''s deli","6 large eggs","1/4 white onion, finely diced","1 jalapeño, seeded and diced","2 Roma tomatoes, diced","2 tbsp vegetable oil","Salt to taste","Fresh flour tortillas and refried beans for serving"]'::jsonb,
  '["Heat oil in a skillet over medium heat. Add onion and jalapeño. Cook 2 minutes until soft.","Add tomatoes. Cook another 2 minutes.","Add machaca and stir to combine. Cook 3 minutes until heated through.","Beat eggs in a bowl with a pinch of salt. Pour over the machaca mixture.","Scramble gently, folding eggs into the meat, until just set — don''t overcook.","Serve immediately with warm flour tortillas and refried beans."]'::jsonb,
  'Ask the deli at Junior''s for machaca — we carry the traditional dried shredded beef you need for the real deal.',
  false,
  10
),

-- ── FAJITAS ──────────────────────────────────────────────────
(
  'Fajitas de Res y Pollo',
  'fajitas-de-res-y-pollo',
  'Sizzling beef and chicken fajitas — the real-deal RGV style with thin-sliced skirt steak, seasoned chicken, and caramelized peppers and onions.',
  'BBQ & Grilling',
  '20 min',
  '20 min (+ 1 hr marinating)',
  '6',
  'Easy',
  '["1 lb Junior''s skirt steak or flank steak","1 lb Junior''s chicken breast or thighs","3 bell peppers (red, green, yellow), sliced","1 large white onion, sliced","Juice of 2 limes","3 cloves garlic, minced","1 tsp cumin","1 tsp chili powder","2 tbsp oil","Salt and pepper","Flour tortillas, guacamole, sour cream, pico de gallo for serving"]'::jsonb,
  '["Combine lime juice, garlic, cumin, chili powder, oil, salt, and pepper. Marinate both meats at least 1 hour.","Heat a large cast-iron skillet or grill pan over high heat until smoking hot.","Cook beef 3–4 minutes per side. Rest and slice thin against the grain.","Cook chicken 5–6 minutes per side until cooked through. Slice thin.","In the same pan, cook peppers and onions with a little oil over high heat, 6–8 minutes, until charred at the edges.","Serve on a sizzling platter with warm flour tortillas and all the fixings."]'::jsonb,
  'Get both meats from the same Junior''s butcher visit — ask for skirt steak sliced thin for the best texture.',
  false,
  11
),

-- ── PORK ─────────────────────────────────────────────────────
(
  'Chile Verde — Green Pork Stew',
  'chile-verde',
  'Tender chunks of pork shoulder slow-cooked in a bright, spicy tomatillo-and-green-chile sauce. A comforting Valley staple.',
  'Soups & Stews',
  '1.5 hrs',
  '20 min',
  '6',
  'Easy',
  '["2 lbs Junior''s pork shoulder, cut into 1.5-inch cubes","1 lb tomatillos, husked and halved","4 Hatch or Anaheim green chiles (or 2 cans roasted green chiles)","4 cloves garlic","1/2 white onion","1 jalapeño","1 cup chicken broth","1 tsp cumin","Salt and pepper","Cilantro and lime for serving","Flour or corn tortillas for serving"]'::jsonb,
  '["Roast tomatillos, chiles, garlic, onion, and jalapeño under the broiler 8–10 minutes until charred.","Blend roasted vegetables with chicken broth, cumin, salt, and pepper until smooth.","Season pork with salt and pepper. In a Dutch oven, sear pork in batches until browned.","Pour salsa verde over pork. Bring to a boil, then reduce heat.","Cover and simmer 1–1.5 hours until pork is tender and sauce has thickened.","Taste and adjust salt. Serve with warm tortillas, fresh cilantro, and a squeeze of lime."]'::jsonb,
  'Pork shoulder from Junior''s is ideal — ask for it cut into 1.5-inch cubes to save prep time.',
  false,
  12
)

on conflict (slug) do nothing;
