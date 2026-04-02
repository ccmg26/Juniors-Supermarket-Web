import type { Metadata } from "next";
import Link from 'next/link'

export const metadata: Metadata = {
  title: "About Us",
  description: "Junior's Supermarket — The Real Meat People. Learn our story, our values, and why the Rio Grande Valley has trusted us for generations.",
};

// ── Brand values data ─────────────────────────────────────────────────────────
const VALUES = [
  {
    icon:  '🥩',
    title: 'The Real Meat People',
    desc:  "We built our reputation on fresh, USDA-grade meat — custom cuts, real butchers, and a selection no chain store can match. It's not just a tagline. It's who we are.",
  },
  {
    icon:  '👨‍👩‍👧‍👦',
    title: 'Family First',
    desc:  "Junior's was founded by a family, built for families, and run by people who grew up right here in the Rio Grande Valley. Every decision we make asks one question: is this good for our community?",
  },
  {
    icon:  '🌮',
    title: 'Rooted in the Valley',
    desc:  "We're not a chain that dropped into the RGV. We are the RGV. Our tortilleria, our bakery, our meat market — everything reflects the culture, flavors, and pride of the families we serve.",
  },
  {
    icon:  '💸',
    title: 'Value You Can Feel',
    desc:  "EBT and WIC accepted at every location. Weekly deals that reset every Wednesday. A Deals Club that gives members early access. Saving your family money isn't a feature — it's the mission.",
  },
]

const MILESTONES = [
  { value: '8',    label: 'Stores Across the Valley'  },
  { value: '7AM',  label: 'Open Every Single Day'     },
  { value: '100%', label: 'EBT & WIC Accepted'        },
  { value: '9',    label: 'Departments Under One Roof' },
]

const DEPARTMENTS_QUICK = [
  { emoji: '🥩', name: 'Meat Market'   },
  { emoji: '🥦', name: 'Produce'       },
  { emoji: '🥖', name: 'Bakery'        },
  { emoji: '🫓', name: 'Tortilleria'   },
  { emoji: '🍽️', name: 'Restaurant'    },
  { emoji: '🍖', name: 'Deli Cuts'     },
  { emoji: '🥛', name: 'Dairy'         },
  { emoji: '💳', name: 'Pay & Service' },
]

// ── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative bg-gray-950 overflow-hidden">

        {/* Background watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-end pr-8 opacity-[0.035] select-none"
        >
          <span className="text-[160px] font-black text-white leading-none tracking-tighter">
            RGV
          </span>
        </div>

        {/* Red glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 10% 50%, rgba(120,0,0,0.5) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-5">
              <span className="h-px w-8 bg-red-500" />
              <span className="text-xs font-semibold text-red-400 uppercase tracking-widest">
                Our Story
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
              We Are the{' '}
              <span className="text-red-400">Real Meat</span>{' '}
              People
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
              Junior&apos;s Supermarket was born in the Rio Grande Valley and built
              on one promise: bring your family the freshest meat, the best
              produce, and real value — every single day.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/weekly-ad"
                className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                🗞 This Week&apos;s Deals
              </Link>
              <Link
                href="/locations"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                📍 Find a Store
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Milestone stats ───────────────────────────────────── */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-800">
            {MILESTONES.map(({ value, label }) => (
              <div key={label} className="py-6 px-4 text-center">
                <div className="text-2xl sm:text-3xl font-black text-red-400 mb-1">
                  {value}
                </div>
                <div className="text-xs text-gray-500 leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Brand story body ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="max-w-3xl mx-auto">

          {/* Story narrative */}
          <div className="mb-14">
            <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-3">
              How it started
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-6">
              A Valley family feeding the Valley
            </h2>
            <div className="space-y-5 text-gray-600 dark:text-gray-400 text-base leading-relaxed">
              <p>
                Junior&apos;s Supermarket started with a simple idea: the families
                of the Rio Grande Valley deserve a grocery store that actually
                understands them. One that stocks the cuts your abuela asks for.
                One that bakes fresh pan dulce every morning. One that makes
                handmade tortillas the way they&apos;re supposed to be made.
              </p>
              <p>
                We grew from one store into eight locations across the Valley —
                from Penitas to San Juan, from Hidalgo to Edinburg — because
                our neighbors kept showing up. And we kept showing up for them.
              </p>
              <p>
                Today Junior&apos;s is where the Valley shops. Not because we&apos;re the
                biggest — but because we&apos;re the most real. Real meat. Real
                prices. Real community.
              </p>
            </div>
          </div>

          {/* Pull quote */}
          <blockquote className="relative border-l-4 border-red-600 pl-6 py-2 mb-14">
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-snug italic">
              &ldquo;Fresh meat, real deals, family value — that&apos;s not marketing.
              That&apos;s just who we are.&rdquo;
            </p>
            <cite className="block mt-3 text-sm text-gray-500 not-italic">
              — The Junior&apos;s Family
            </cite>
          </blockquote>

          {/* Values grid */}
          <div className="mb-14">
            <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-3">
              What we stand for
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-8">
              Our values
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {VALUES.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6"
                >
                  <div className="text-3xl mb-4">{icon}</div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* EBT / WIC commitment */}
          <div className="rounded-2xl bg-green-950/40 border border-green-900/50 p-6 mb-14 flex gap-5 items-start">
            <div className="text-3xl shrink-0">✅</div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                EBT &amp; WIC Accepted at Every Location
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                We believe every family deserves access to fresh, quality food.
                That&apos;s why we accept EBT and WIC at all 8 of our stores, every
                day — no exceptions, no asterisks.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Everything under one roof ─────────────────────────── */}
      <section className="bg-gray-950 border-t border-gray-800 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-2">
              Everything under one roof
            </p>
            <h2 className="text-2xl font-black text-white">
              9 departments, one store
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              From handmade tortillas to money orders — we&apos;ve got your whole
              week covered.
            </p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mb-8">
            {DEPARTMENTS_QUICK.map(({ emoji, name }) => (
              <div key={name} className="flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-2xl">
                  {emoji}
                </div>
                <span className="text-[10px] text-gray-400 leading-tight">{name}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/departments"
              className="inline-flex items-center gap-2 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              Explore All Departments →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Locations CTA ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="rounded-2xl bg-red-600 px-6 sm:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-black text-white mb-2">
              Come see us — we&apos;re always open
            </h2>
            <p className="text-red-100 text-sm leading-relaxed max-w-md">
              8 locations across the Rio Grande Valley, open every day from
              7 AM to 10 PM. Find the store nearest to you.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/locations"
              className="bg-white hover:bg-gray-100 text-red-700 font-bold px-6 py-3 rounded-xl text-sm transition-colors text-center"
            >
              📍 Find My Store
            </Link>
            <a
              href="tel:+19565864677"
              className="bg-red-700 hover:bg-red-800 border border-red-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors text-center"
            >
              📞 956-JUNIORS
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
