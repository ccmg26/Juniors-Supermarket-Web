-- ============================================================
-- 006_storage_buckets.sql
-- Provisions the 4 required storage buckets and their policies.
-- Safe to run multiple times (ON CONFLICT + DROP IF EXISTS).
-- Run in Supabase SQL Editor.
-- ============================================================

INSERT INTO storage.buckets (id, name, public)
VALUES
  ('weekly-ads',         'weekly-ads',         true),
  ('specials-images',    'specials-images',     true),
  ('department-gallery', 'department-gallery',  true),
  ('suggestion-uploads', 'suggestion-uploads',  false)
ON CONFLICT (id) DO NOTHING;

-- ── weekly-ads (public read, admin write) ─────────────────────────────────────
DROP POLICY IF EXISTS "Public read weekly ads"  ON storage.objects;
DROP POLICY IF EXISTS "Admin upload weekly ads" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete weekly ads" ON storage.objects;

CREATE POLICY "Public read weekly ads"
  ON storage.objects FOR SELECT USING (bucket_id = 'weekly-ads');
CREATE POLICY "Admin upload weekly ads"
  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'weekly-ads' AND is_admin());
CREATE POLICY "Admin delete weekly ads"
  ON storage.objects FOR DELETE USING (bucket_id = 'weekly-ads' AND is_admin());

-- ── specials-images (public read, admin write) ────────────────────────────────
DROP POLICY IF EXISTS "Public read specials images"  ON storage.objects;
DROP POLICY IF EXISTS "Admin upload specials images" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete specials images" ON storage.objects;

CREATE POLICY "Public read specials images"
  ON storage.objects FOR SELECT USING (bucket_id = 'specials-images');
CREATE POLICY "Admin upload specials images"
  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'specials-images' AND is_admin());
CREATE POLICY "Admin delete specials images"
  ON storage.objects FOR DELETE USING (bucket_id = 'specials-images' AND is_admin());

-- ── department-gallery (public read, admin write) ─────────────────────────────
DROP POLICY IF EXISTS "Public read department gallery"  ON storage.objects;
DROP POLICY IF EXISTS "Admin upload department gallery" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete department gallery" ON storage.objects;

CREATE POLICY "Public read department gallery"
  ON storage.objects FOR SELECT USING (bucket_id = 'department-gallery');
CREATE POLICY "Admin upload department gallery"
  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'department-gallery' AND is_admin());
CREATE POLICY "Admin delete department gallery"
  ON storage.objects FOR DELETE USING (bucket_id = 'department-gallery' AND is_admin());

-- ── suggestion-uploads (admin read, public write) ─────────────────────────────
DROP POLICY IF EXISTS "Admin read suggestion uploads"    ON storage.objects;
DROP POLICY IF EXISTS "Public upload suggestion uploads" ON storage.objects;

CREATE POLICY "Admin read suggestion uploads"
  ON storage.objects FOR SELECT USING (bucket_id = 'suggestion-uploads' AND is_admin());
CREATE POLICY "Public upload suggestion uploads"
  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'suggestion-uploads');
