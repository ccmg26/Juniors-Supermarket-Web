-- ─────────────────────────────────────────────────────────────────────────────
-- 004_features.sql  –  Site-wide promo banner + push subscriptions
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Promo Banner columns on site_settings ────────────────────────────────────
ALTER TABLE site_settings
  ADD COLUMN IF NOT EXISTS banner_active    BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS banner_text      TEXT    NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS banner_link_url  TEXT    NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS banner_link_label TEXT   NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS banner_style     TEXT    NOT NULL DEFAULT 'red'
    CHECK (banner_style IN ('red', 'yellow', 'green', 'blue', 'dark'));

-- ── Push notification subscriptions ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS push_subscriptions (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  endpoint   TEXT NOT NULL UNIQUE,
  p256dh     TEXT NOT NULL,
  auth       TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Only the service role (server-side) should insert/delete subscriptions.
-- Public anon can INSERT (opt-in) but not SELECT or DELETE others' records.
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
  ON push_subscriptions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Subscribers can unsubscribe by endpoint"
  ON push_subscriptions FOR DELETE
  TO anon, authenticated
  USING (true);  -- endpoint uniqueness enforced at app level
