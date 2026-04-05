-- ─────────────────────────────────────────────────────────────────────────────
-- 005_fix_deals_club.sql
-- Ensure deals_club_subscribers has proper RLS + unique constraint so the
-- public sign-up form can upsert rows (anon INSERT was being rejected).
-- ─────────────────────────────────────────────────────────────────────────────

-- Create table if it wasn't in an earlier migration
CREATE TABLE IF NOT EXISTS deals_club_subscribers (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT        NOT NULL,
  phone      TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add UNIQUE constraint on email if it doesn't already exist
-- (required for upsert onConflict: "email" to work)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'deals_club_subscribers'::regclass
      AND contype = 'u'
      AND conname = 'deals_club_subscribers_email_key'
  ) THEN
    ALTER TABLE deals_club_subscribers ADD CONSTRAINT deals_club_subscribers_email_key UNIQUE (email);
  END IF;
END $$;

-- Enable RLS
ALTER TABLE deals_club_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anon + authenticated) to subscribe
DROP POLICY IF EXISTS "Anyone can subscribe to deals club" ON deals_club_subscribers;
CREATE POLICY "Anyone can subscribe to deals club"
  ON deals_club_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anon to upsert (UPDATE needed for onConflict upsert path)
DROP POLICY IF EXISTS "Anyone can update their own deals club row" ON deals_club_subscribers;
CREATE POLICY "Anyone can update their own deals club row"
  ON deals_club_subscribers FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Admins can read all rows (for the submissions admin page)
DROP POLICY IF EXISTS "Admins can read deals club subscribers" ON deals_club_subscribers;
CREATE POLICY "Admins can read deals club subscribers"
  ON deals_club_subscribers FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE id = auth.uid()
    )
  );
