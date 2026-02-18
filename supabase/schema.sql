-- ============================================================
-- Junior's Supermarket – Supabase Schema
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Admin Users ───────────────────────────────────────────────
-- Admin users are managed through Supabase Auth.
-- This table is for tracking which auth users have admin privileges.

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Stores ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS stores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'TX',
  zip TEXT NOT NULL,
  phone TEXT NOT NULL,
  hours TEXT NOT NULL DEFAULT 'Open Daily 7:00 AM – 10:00 PM',
  ebt_wic BOOLEAN NOT NULL DEFAULT TRUE,
  google_maps_url TEXT,
  lat NUMERIC(10, 7),
  lng NUMERIC(10, 7),
  services TEXT[] NOT NULL DEFAULT ARRAY[
    'Meat', 'Produce', 'Dairy', 'Grocery', 'Deli Cuts',
    'Restaurant', 'Bakery', 'Tortilleria', 'Pay & Service Center'
  ],
  images TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Weekly Ads ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS weekly_ads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  valid_from DATE NOT NULL,
  valid_to DATE NOT NULL,
  pdf_url TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Specials ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS specials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  price TEXT NOT NULL,
  original_price TEXT,
  category TEXT NOT NULL CHECK (category IN (
    'Meat', 'Produce', 'Dairy', 'Grocery', 'Deli Cuts',
    'Restaurant', 'Bakery', 'Tortilleria', 'Pay & Service Center'
  )),
  image_url TEXT,
  valid_from DATE NOT NULL,
  valid_to DATE NOT NULL,
  disclaimer TEXT DEFAULT 'While Supplies Last',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Departments ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT '🛒',
  hero_image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Department Gallery Images ─────────────────────────────────
CREATE TABLE IF NOT EXISTS department_gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Events ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Jobs ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'All Locations',
  type TEXT NOT NULL DEFAULT 'Full-Time',
  description TEXT NOT NULL DEFAULT '',
  paycom_url TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Contact Submissions ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Leasing Inquiries ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leasing_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_location TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Customer Suggestions ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS customer_suggestions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('Product Request', 'Concern', 'Suggestion')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Deals Club Subscribers ────────────────────────────────────
CREATE TABLE IF NOT EXISTS deals_club_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- AUTO-UPDATE TIMESTAMPS
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_stores_updated_at BEFORE UPDATE ON stores
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_weekly_ads_updated_at BEFORE UPDATE ON weekly_ads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_specials_updated_at BEFORE UPDATE ON specials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON departments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ADMIN FUNCTION
-- ============================================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE specials ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE department_gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leasing_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals_club_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- ── Public read: stores ────────────────────────────────────────
CREATE POLICY "Public can read active stores"
  ON stores FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage stores"
  ON stores FOR ALL
  USING (is_admin());

-- ── Public read: weekly_ads ───────────────────────────────────
CREATE POLICY "Public can read active weekly ads"
  ON weekly_ads FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage weekly ads"
  ON weekly_ads FOR ALL
  USING (is_admin());

-- ── Public read: specials ─────────────────────────────────────
CREATE POLICY "Public can read active specials"
  ON specials FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage specials"
  ON specials FOR ALL
  USING (is_admin());

-- ── Public read: departments ──────────────────────────────────
CREATE POLICY "Public can read active departments"
  ON departments FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage departments"
  ON departments FOR ALL
  USING (is_admin());

-- ── Public read: department_gallery_images ────────────────────
CREATE POLICY "Public can read gallery images"
  ON department_gallery_images FOR SELECT
  USING (TRUE);

CREATE POLICY "Admins can manage gallery images"
  ON department_gallery_images FOR ALL
  USING (is_admin());

-- ── Public read: events ───────────────────────────────────────
CREATE POLICY "Public can read active events"
  ON events FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage events"
  ON events FOR ALL
  USING (is_admin());

-- ── Public read: jobs ─────────────────────────────────────────
CREATE POLICY "Public can read active jobs"
  ON jobs FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage jobs"
  ON jobs FOR ALL
  USING (is_admin());

-- ── Public insert: forms ──────────────────────────────────────
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Admins can view contact submissions"
  ON contact_submissions FOR SELECT
  USING (is_admin());

CREATE POLICY "Anyone can submit leasing inquiries"
  ON leasing_inquiries FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Admins can view leasing inquiries"
  ON leasing_inquiries FOR SELECT
  USING (is_admin());

CREATE POLICY "Anyone can submit suggestions"
  ON customer_suggestions FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Admins can view suggestions"
  ON customer_suggestions FOR SELECT
  USING (is_admin());

CREATE POLICY "Anyone can subscribe to deals club"
  ON deals_club_subscribers FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Admins can view subscribers"
  ON deals_club_subscribers FOR SELECT
  USING (is_admin());

-- ── Admin users: admin only ───────────────────────────────────
CREATE POLICY "Admins can manage admin users"
  ON admin_users FOR ALL
  USING (is_admin());

CREATE POLICY "Users can see their own admin record"
  ON admin_users FOR SELECT
  USING (id = auth.uid());

-- ============================================================
-- STORAGE BUCKETS (run separately in Supabase dashboard)
-- ============================================================
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES
--   ('weekly-ads', 'weekly-ads', true),
--   ('specials-images', 'specials-images', true),
--   ('department-gallery', 'department-gallery', true),
--   ('suggestion-uploads', 'suggestion-uploads', false);

-- Storage policies for public buckets
-- CREATE POLICY "Public read weekly ads" ON storage.objects FOR SELECT USING (bucket_id = 'weekly-ads');
-- CREATE POLICY "Admin upload weekly ads" ON storage.objects FOR INSERT USING (bucket_id = 'weekly-ads' AND is_admin());
-- CREATE POLICY "Public read specials images" ON storage.objects FOR SELECT USING (bucket_id = 'specials-images');
-- CREATE POLICY "Admin upload specials images" ON storage.objects FOR INSERT USING (bucket_id = 'specials-images' AND is_admin());
-- CREATE POLICY "Public read department gallery" ON storage.objects FOR SELECT USING (bucket_id = 'department-gallery');
-- CREATE POLICY "Admin upload department gallery" ON storage.objects FOR INSERT USING (bucket_id = 'department-gallery' AND is_admin());
-- CREATE POLICY "Admin read suggestion uploads" ON storage.objects FOR SELECT USING (bucket_id = 'suggestion-uploads' AND is_admin());
-- CREATE POLICY "Public upload suggestion uploads" ON storage.objects FOR INSERT USING (bucket_id = 'suggestion-uploads');
