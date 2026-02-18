# Junior's Supermarket Web Platform

**The Real Meat People** – Complete Next.js 14 website and admin dashboard for Junior's Supermarket across 8 Rio Grande Valley locations.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Backend | Supabase (Postgres + Auth + Storage) |
| Forms | Server Actions + Zod |
| Deployment | Vercel |
| Package Manager | pnpm |

---

## Quick Start

### 1. Clone & Install

```bash
git clone <repo-url>
cd Juniors-Supermarket-Web
pnpm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run:
   - `supabase/schema.sql` — creates all tables, RLS policies, and the `is_admin()` function
   - `supabase/seed.sql` — inserts all 8 store locations, departments, sample specials, and events

### 3. Create Storage Buckets

In Supabase dashboard → **Storage**, create these buckets:

| Bucket | Public |
|---|---|
| `weekly-ads` | Yes |
| `specials-images` | Yes |
| `department-gallery` | Yes |
| `suggestion-uploads` | No |

### 4. Create Admin User

1. In Supabase dashboard → **Authentication** → **Users** → **Add User**
2. Enter admin email and password
3. Copy the user's UUID
4. In SQL Editor, run:

```sql
INSERT INTO admin_users (id, email)
VALUES ('paste-uuid-here', 'admin@juniorssupermarket.com');
```

### 5. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Find these in Supabase → **Settings** → **API**.

### 6. Run Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── page.tsx               # Home (/)
│   ├── weekly-ad/             # /weekly-ad
│   ├── specials/              # /specials (with category filter)
│   ├── locations/             # /locations + /locations/[slug]
│   ├── departments/           # /departments + 9 sub-pages
│   ├── events/                # /events
│   ├── jobs/                  # /jobs
│   ├── leasing/               # /leasing
│   ├── suggestions/           # /suggestions
│   ├── contact/               # /contact
│   ├── privacy/               # /privacy
│   ├── terms/                 # /terms
│   ├── admin/                 # /admin (auth-gated)
│   │   ├── login/             # Admin login
│   │   ├── stores/            # Store management
│   │   ├── weekly-ads/        # Weekly ad management
│   │   ├── specials/          # Specials management
│   │   ├── departments/       # Department overview
│   │   ├── events/            # Event management
│   │   ├── jobs/              # Job posting management
│   │   └── submissions/       # Contact/Leasing/Suggestions/Subscribers
│   ├── sitemap.ts             # Dynamic sitemap
│   └── robots.ts              # robots.txt
├── components/
│   ├── layout/                # Navbar, Footer, MobileBottomBar
│   ├── home/                  # Hero, WeeklyAdPreview, TopDeals, etc.
│   ├── ui/                    # EbtBadge, SectionHeader, FormField
│   ├── admin/                 # AdminSidebar
│   └── DepartmentPage.tsx     # Shared department template
├── lib/
│   ├── supabase/client.ts     # Browser Supabase client
│   ├── supabase/server.ts     # Server Supabase client
│   ├── actions.ts             # Server Actions (forms + admin CRUD)
│   ├── constants.ts           # Brand, departments, categories
│   └── utils.ts               # Formatting helpers
└── types/index.ts             # TypeScript types
```

---

## Key Features

### Public Site
- **Home** – Hero, weekly ad preview, top deals, store locator, departments, events, Deals Club signup
- **Weekly Ad** – PDF viewer + download, resets every Wednesday
- **Specials** – Filterable by category (Meat, Produce, Dairy, etc.)
- **Locations** – All 8 stores with individual detail pages
- **Location Detail** – Map, hours, services, EBT badge, photo gallery, local weekly deals
- **Departments** – 9 department pages with gallery support
- **Events** – Featured banner + event cards
- **Jobs** – Listed by department, Apply button to Paycom
- **Leasing** – Form saved to leasing_inquiries table
- **Suggestions** – Product Request / Concern / Suggestion with optional image upload
- **Contact** – Form + phone number
- **EBT/WIC** – Badge shown on Home, Footer, Locations
- **Mobile Bottom Bar** – Call, Directions, Weekly Ad, Specials
- **SEO** – JSON-LD (GroceryStore schema), OpenGraph, sitemap, robots

### Admin Panel (/admin)
- Supabase Auth login
- Dashboard with record counts
- Manage Stores (CRUD + active toggle)
- Manage Weekly Ads (PDF URL + valid dates)
- Manage Specials (category, price, image, dates)
- Manage Events (featured flag, image, dates)
- Manage Jobs (Paycom URL, department, type)
- View Submissions (Contact, Leasing, Suggestions, Deals Club)

---

## Deploy to Vercel

```bash
npx vercel
```

Add the three environment variables in Vercel project settings.

---

## Database Tables

| Table | Purpose |
|---|---|
| `stores` | Store locations |
| `weekly_ads` | Weekly ad PDFs and valid dates |
| `specials` | Deal cards by category |
| `departments` | Department info |
| `department_gallery_images` | Per-department photo gallery |
| `events` | Promotions and events |
| `jobs` | Job postings |
| `contact_submissions` | Contact form data |
| `leasing_inquiries` | Leasing form data |
| `customer_suggestions` | Customer feedback |
| `deals_club_subscribers` | Email/SMS subscribers |
| `admin_users` | Admin access control |

---

## Brand

- **Name:** Junior's Supermarket
- **Tagline:** The Real Meat People
- **Phone:** 956-JUNIORS to tel:+19565864677
- **Colors:** Deep red #B91C1C, Black #0A0A0A, Cream #FDF8F3
- **Locations:** 8 stores, Rio Grande Valley, Texas
- **Hours:** Open Daily 7:00 AM to 10:00 PM
- **EBT/WIC:** Accepted at all locations
