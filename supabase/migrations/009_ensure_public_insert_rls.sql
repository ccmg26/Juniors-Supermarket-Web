-- ─────────────────────────────────────────────────────────────────────────────
-- 009_ensure_public_insert_rls.sql
-- Idempotent: ensures deals_club_subscribers and push_subscriptions tables
-- exist with proper RLS so public (anon) inserts work even without service key.
-- Run this in Supabase SQL Editor if the sign-up form returns "Failed to
-- subscribe" or the push opt-in does nothing.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── deals_club_subscribers ───────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS deals_club_subscribers (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT        NOT NULL,
  phone      TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'deals_club_subscribers'::regclass
      AND contype = 'u'
      AND conname = 'deals_club_subscribers_email_key'
  ) THEN
    ALTER TABLE deals_club_subscribers
      ADD CONSTRAINT deals_club_subscribers_email_key UNIQUE (email);
  END IF;
END $$;

ALTER TABLE deals_club_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can subscribe to deals club"         ON deals_club_subscribers;
DROP POLICY IF EXISTS "Anyone can update their own deals club row" ON deals_club_subscribers;
DROP POLICY IF EXISTS "Admins can read deals club subscribers"     ON deals_club_subscribers;

CREATE POLICY "Anyone can subscribe to deals club"
  ON deals_club_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update their own deals club row"
  ON deals_club_subscribers FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can read deals club subscribers"
  ON deals_club_subscribers FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- ── push_subscriptions ───────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS push_subscriptions (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  endpoint   TEXT NOT NULL UNIQUE,
  p256dh     TEXT NOT NULL,
  auth       TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can subscribe"                      ON push_subscriptions;
DROP POLICY IF EXISTS "Subscribers can unsubscribe by endpoint"   ON push_subscriptions;

CREATE POLICY "Anyone can subscribe"
  ON push_subscriptions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Subscribers can unsubscribe by endpoint"
  ON push_subscriptions FOR DELETE
  TO anon, authenticated
  USING (true);
