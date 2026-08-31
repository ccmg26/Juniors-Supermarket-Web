-- ============================================================
-- 011 — Recipes & Catering Requests
-- Run in Supabase SQL Editor
-- ============================================================

-- ── RECIPES ──────────────────────────────────────────────────
create table if not exists public.recipes (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  slug          text not null unique,
  description   text,
  category      text not null default 'BBQ & Grilling',
  cook_time     text,            -- e.g. "45 min"
  prep_time     text,            -- e.g. "15 min"
  servings      text,            -- e.g. "4–6"
  difficulty    text default 'Easy',  -- Easy | Medium | Hard
  ingredients   jsonb not null default '[]'::jsonb,   -- string[]
  instructions  jsonb not null default '[]'::jsonb,   -- string[]
  tips          text,
  image_url     text,
  is_featured   boolean not null default false,
  is_active     boolean not null default true,
  sort_order    int     not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- RLS: public read, admin write
alter table public.recipes enable row level security;

drop policy if exists "public_read_recipes" on public.recipes;
create policy "public_read_recipes"
  on public.recipes for select
  using (is_active = true);

drop policy if exists "admin_all_recipes" on public.recipes;
create policy "admin_all_recipes"
  on public.recipes for all
  using (
    exists (
      select 1 from public.admin_users
      where id = auth.uid()
    )
  );

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists recipes_updated_at on public.recipes;
create trigger recipes_updated_at
  before update on public.recipes
  for each row execute function public.set_updated_at();

-- Indexes
create index if not exists recipes_active_featured_idx
  on public.recipes (is_active, is_featured desc, sort_order asc);
create index if not exists recipes_slug_idx
  on public.recipes (slug);
create index if not exists recipes_category_idx
  on public.recipes (category);


-- ── CATERING REQUESTS ─────────────────────────────────────────
create table if not exists public.catering_requests (
  id                  uuid primary key default gen_random_uuid(),
  name                text not null,
  email               text not null,
  phone               text not null,
  event_type          text not null,
  event_date          date,
  guest_count         text,
  items               text,           -- free text for what they want
  notes               text,
  location_preference text,
  status              text not null default 'new',  -- new | contacted | confirmed | cancelled
  created_at          timestamptz not null default now()
);

-- RLS: public insert only; admin read/write
alter table public.catering_requests enable row level security;

drop policy if exists "public_insert_catering" on public.catering_requests;
create policy "public_insert_catering"
  on public.catering_requests for insert
  with check (true);

drop policy if exists "admin_all_catering" on public.catering_requests;
create policy "admin_all_catering"
  on public.catering_requests for all
  using (
    exists (
      select 1 from public.admin_users
      where id = auth.uid()
    )
  );

create index if not exists catering_status_idx
  on public.catering_requests (status, created_at desc);


-- ── SEED: Sample recipes (optional — remove before prod if desired) ──
insert into public.recipes (title, slug, description, category, cook_time, prep_time, servings, difficulty, ingredients, instructions, tips, is_featured, sort_order)
values
(
  'Classic Carne Asada',
  'classic-carne-asada',
  'Our butchers'' secret: a simple citrus-and-cumin marinade that turns flank steak into the best carne asada you''ve ever made.',
  'Carne Asada',
  '10 min',
  '20 min (+ 2 hrs marinating)',
  '4–6',
  'Easy',
  '["2 lbs Junior''s flank steak or skirt steak","Juice of 2 limes","Juice of 1 orange","4 cloves garlic, minced","1 tsp cumin","1 tsp chili powder","1 tbsp olive oil","Salt and black pepper to taste","Fresh cilantro and onion for serving"]'::jsonb,
  '["Combine lime juice, orange juice, garlic, cumin, chili powder, olive oil, salt, and pepper in a bowl.","Score the steak lightly with a knife on both sides and place in a zip-lock bag or dish.","Pour the marinade over the steak. Marinate in the refrigerator for at least 2 hours (overnight is best).","Remove steak from the fridge 30 minutes before grilling.","Grill over high heat, 3–4 minutes per side for medium. Let rest 5 minutes before slicing.","Slice thin against the grain and serve with warm tortillas, cilantro, and diced onion."]'::jsonb,
  'Ask your Junior''s butcher to score the steak for you — it cuts the marinating time in half.',
  true,
  1
),
(
  'Slow-Cooked Beef Barbacoa',
  'beef-barbacoa',
  'Rich, tender barbacoa made with beef cheeks or chuck roast, slow-cooked with chipotle and bay leaf.',
  'Soups & Stews',
  '4 hrs',
  '20 min',
  '8–10',
  'Easy',
  '["3 lbs Junior''s beef cheeks or chuck roast","3 chipotle peppers in adobo","4 cloves garlic","1 tsp cumin","1 tsp oregano","2 bay leaves","1 cup beef broth","Juice of 1 lime","Salt and pepper to taste"]'::jsonb,
  '["Season the beef generously with salt and pepper.","Blend chipotle peppers, garlic, cumin, oregano, lime juice, and beef broth until smooth.","Place beef in a Dutch oven or slow cooker. Pour sauce over the top. Add bay leaves.","Slow cooker: Cook on LOW 8 hours or HIGH 4–5 hours. Oven: Cover and cook at 300°F for 3.5–4 hours.","Shred the beef with two forks directly in the cooking liquid.","Serve on warm corn tortillas with cilantro, diced onion, and a squeeze of lime."]'::jsonb,
  'Beef cheeks from our meat market give the richest flavor. Ask our butchers if they''re in stock.',
  true,
  2
),
(
  'Carnitas de Puerco',
  'carnitas-de-puerco',
  'Golden, crispy-edged carnitas the way abuelita made them — braised pork shoulder rendered in its own fat.',
  'Soups & Stews',
  '2.5 hrs',
  '15 min',
  '8',
  'Easy',
  '["3 lbs Junior''s pork shoulder (bone-in), cut into 3-inch chunks","1 orange, halved","1 head garlic, halved crosswise","1 tbsp salt","1 tsp cumin","1 tsp oregano","1 bay leaf","Water to cover"]'::jsonb,
  '["Place pork in a wide, heavy pot. Add enough water to just cover. Squeeze in the orange juice and add both halves.","Add garlic, salt, cumin, oregano, and bay leaf.","Bring to a boil, then reduce heat. Simmer uncovered 2 hours, turning occasionally, until water evaporates.","Once water is gone, the pork fries in its own fat — let it get golden and crispy, turning every few minutes.","Remove from heat. Shred the pork and serve with tortillas, salsa, cilantro, and lime."]'::jsonb,
  'Don''t rush the final frying step. Those crispy bits are everything.',
  false,
  3
),
(
  'BBQ Pork Ribs — Low and Slow',
  'bbq-pork-ribs-low-and-slow',
  'Tender fall-off-the-bone pork ribs with a dry rub and simple BBQ glaze. Perfect for Sunday cookouts.',
  'BBQ & Grilling',
  '3.5 hrs',
  '20 min',
  '4',
  'Medium',
  '["2 racks Junior''s pork spare ribs or baby back ribs","2 tbsp brown sugar","1 tbsp smoked paprika","1 tsp garlic powder","1 tsp onion powder","1 tsp cumin","1 tsp black pepper","1 tsp salt","1/2 tsp cayenne pepper","Your favorite BBQ sauce for glazing"]'::jsonb,
  '["Remove the membrane from the back of each rack by sliding a knife under it and pulling it off.","Mix all the dry rub spices together. Coat both sides of each rack generously.","Wrap racks tightly in foil. Refrigerate at least 2 hours or overnight.","Preheat oven to 300°F. Place foil-wrapped racks on a baking sheet. Bake 2.5–3 hours.","Unwrap carefully. Brush with BBQ sauce. Broil or grill 5–8 minutes per side to caramelize.","Let rest 10 minutes, then slice between bones to serve."]'::jsonb,
  'The 3-2-1 method works great on a smoker: 3 hours smoke, 2 hours wrapped, 1 hour sauced.',
  true,
  4
)
on conflict (slug) do nothing;
