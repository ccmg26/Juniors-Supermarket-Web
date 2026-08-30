BEGIN;

-- Remove anonymous UPDATE access to subscriber PII. Duplicate subscriptions are
-- handled as an idempotent success by the application.
DROP POLICY IF EXISTS "Anyone can update their own deals club row"
  ON deals_club_subscribers;

-- Uploaded suggestions remain private. Restrict supported content and size at
-- the storage layer as a second line of defense behind application validation.
UPDATE storage.buckets
SET public = false,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp']
WHERE id = 'suggestion-uploads';

-- Preserve store and category selections collected by the consolidated contact
-- experience instead of silently discarding them.
ALTER TABLE customer_suggestions
  ADD COLUMN IF NOT EXISTS preferred_location TEXT,
  ADD COLUMN IF NOT EXISTS category TEXT;

-- Older application versions stored a public URL. Keep only the object path so
-- the admin can issue short-lived signed URLs after the bucket becomes private.
UPDATE customer_suggestions
SET image_url = split_part(image_url, '/suggestion-uploads/', 2)
WHERE image_url LIKE '%/suggestion-uploads/%';

COMMIT;
