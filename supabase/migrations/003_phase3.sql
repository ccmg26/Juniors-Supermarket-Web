-- ============================================================
-- Phase 3: Admin workflow upgrades
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor)
-- Safe to run multiple times (all use IF NOT EXISTS / IF NOT EXISTS equivalents)
-- ============================================================

-- ── 1. Weekly Ads: status workflow + mobile image ─────────────────────────

-- Status lifecycle: draft → scheduled → published → archived
-- published = is_active = true (shown on website)
-- Everything else = is_active = false
ALTER TABLE weekly_ads
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published'
    CHECK (status IN ('draft', 'scheduled', 'published', 'archived'));

ALTER TABLE weekly_ads
  ADD COLUMN IF NOT EXISTS mobile_image_url TEXT;

-- Back-fill status from is_active for existing rows
UPDATE weekly_ads SET status = 'published' WHERE is_active = TRUE  AND status = 'published';
UPDATE weekly_ads SET status = 'archived'  WHERE is_active = FALSE AND status = 'published';

-- ── 2. Specials: featured flag + sort order ───────────────────────────────

ALTER TABLE specials
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE specials
  ADD COLUMN IF NOT EXISTS sort_order INT NOT NULL DEFAULT 0;

-- ── 3. Site Settings (single-row homepage content config) ─────────────────

CREATE TABLE IF NOT EXISTS site_settings (
  -- Enforces exactly one row
  id   INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),

  -- Announcement/promo strip (top of every page)
  promo_strip_text TEXT NOT NULL DEFAULT 'Fresh Meat · Real Deals · 8 RGV Locations',

  -- Homepage hero
  hero_headline     TEXT NOT NULL DEFAULT 'Fresh Meat. Real Deals. Family Value.',
  hero_subheadline  TEXT NOT NULL DEFAULT '8 locations across the Rio Grande Valley. Fresh meat, produce, bakery, and more — all at prices your family will love.',

  -- Deals Club section
  deals_club_headline    TEXT NOT NULL DEFAULT 'Get the Weekly Ad Delivered to You',
  deals_club_subheadline TEXT NOT NULL DEFAULT 'Sign up for exclusive deals, weekly ad delivery, and special member offers.',

  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed the single row (idempotent)
INSERT INTO site_settings (id)
VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- ── 4. RLS for site_settings ──────────────────────────────────────────────

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  -- Drop and recreate to ensure idempotency
  DROP POLICY IF EXISTS "Public can read site_settings"  ON site_settings;
  DROP POLICY IF EXISTS "Admins can manage site_settings" ON site_settings;
END $$;

CREATE POLICY "Public can read site_settings"
  ON site_settings FOR SELECT
  USING (TRUE);

CREATE POLICY "Admins can manage site_settings"
  ON site_settings FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- ── 5. Auto-update trigger for site_settings ─────────────────────────────

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
