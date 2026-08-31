BEGIN;

-- Production may predate the Phase 3 workflow migration. Keep this migration
-- self-contained so the deployed application and database cannot drift.
ALTER TABLE public.weekly_ads
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'published'
    CHECK (status IN ('draft', 'scheduled', 'published', 'archived')),
  ADD COLUMN IF NOT EXISTS mobile_image_url text;

UPDATE public.weekly_ads
SET status = CASE WHEN is_active THEN 'published' ELSE 'archived' END;

-- Limit public weekly-ad uploads to the formats and size accepted by the app.
UPDATE storage.buckets
SET file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
WHERE id = 'weekly-ads';

-- Repair any historical duplicate-active state before enforcing the invariant.
WITH ranked AS (
  SELECT id, row_number() OVER (ORDER BY valid_from DESC, updated_at DESC, id DESC) AS position
  FROM public.weekly_ads
  WHERE is_active = true
)
UPDATE public.weekly_ads AS ads
SET is_active = false,
    status = 'archived'
FROM ranked
WHERE ads.id = ranked.id
  AND ranked.position > 1;

CREATE UNIQUE INDEX IF NOT EXISTS weekly_ads_one_active_idx
  ON public.weekly_ads (is_active)
  WHERE is_active = true;

-- Publishing is atomic: the old ad is archived and the new ad becomes active
-- in the same transaction. The advisory lock serializes simultaneous admins.
CREATE OR REPLACE FUNCTION public.publish_weekly_ad(
  p_id uuid,
  p_title text,
  p_valid_from date,
  p_valid_to date,
  p_file_url text,
  p_mobile_image_url text DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  published_id uuid;
BEGIN
  IF auth.uid() IS NULL OR NOT public.is_admin() THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  IF length(trim(p_title)) < 2 THEN
    RAISE EXCEPTION 'Title is required';
  END IF;
  IF p_valid_from IS NULL OR p_valid_to IS NULL OR p_valid_to < p_valid_from THEN
    RAISE EXCEPTION 'Invalid ad date range';
  END IF;
  IF p_valid_to > p_valid_from + 13 THEN
    RAISE EXCEPTION 'Ad range cannot exceed 14 days';
  END IF;
  IF p_file_url IS NULL OR p_file_url !~* '/storage/v1/object/public/weekly-ads/.+\.(png|jpg|jpeg|webp|pdf)$' THEN
    RAISE EXCEPTION 'Invalid weekly ad file';
  END IF;

  PERFORM pg_advisory_xact_lock(hashtext('public.weekly_ads.publish'));

  UPDATE public.weekly_ads
  SET status = 'archived', is_active = false
  WHERE is_active = true AND (p_id IS NULL OR id <> p_id);

  IF p_id IS NULL THEN
    INSERT INTO public.weekly_ads (
      title, valid_from, valid_to, pdf_url, mobile_image_url, status, is_active
    ) VALUES (
      trim(p_title), p_valid_from, p_valid_to, p_file_url,
      nullif(p_mobile_image_url, ''), 'published', true
    ) RETURNING id INTO published_id;
  ELSE
    UPDATE public.weekly_ads
    SET title = trim(p_title),
        valid_from = p_valid_from,
        valid_to = p_valid_to,
        pdf_url = p_file_url,
        mobile_image_url = nullif(p_mobile_image_url, ''),
        status = 'published',
        is_active = true
    WHERE id = p_id
    RETURNING id INTO published_id;

    IF published_id IS NULL THEN
      RAISE EXCEPTION 'Weekly ad not found';
    END IF;
  END IF;

  RETURN published_id;
END;
$$;

REVOKE ALL ON FUNCTION public.publish_weekly_ad(uuid, text, date, date, text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.publish_weekly_ad(uuid, text, date, date, text, text) FROM anon;
GRANT EXECUTE ON FUNCTION public.publish_weekly_ad(uuid, text, date, date, text, text) TO authenticated;

COMMIT;
