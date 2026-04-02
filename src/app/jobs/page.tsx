import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Jobs at Junior's Supermarket",
  description:
    "Join the Junior's Supermarket family. Browse open positions across our 8 Rio Grande Valley locations — cashiers, meat cutters, produce clerks, and more. Apply through Paycom.",
}

// ── Data ─────────────────────────────────────────────────────────────────────
const CULTURE_CARDS = [
  {
    icon:  '❤️',
    title: 'Family Culture',
    desc:  "Junior's was built by a family and run like one. We look out for each other, celebrate wins together, and show up when it counts. This isn't just a job — it's a place where you belong.",
  },
  {
    icon:  '📈',
    title: 'Grow With Us',
    desc:  "We promote from within. Many of our store managers started as cashiers, clerks, and stock associates. If you're willing to work hard and grow, Junior's will grow with you.",
  },
  {
    icon:  '💪',
    title: 'Real Benefits',
    desc:  "Competitive pay, benefits for full-time team members, consistent scheduling, and the kind of stability that lets you plan your life. We take care of the people who take care of our customers.",
  },
  {
    icon:  '🌮',
    title: 'Valley Proud',
    desc:  "We hire locally, serve locally, and give back locally. Working at Junior's means being part of something that matters to the Rio Grande Valley — not just a paycheck.",
  },
]

const HOW_TO_APPLY = [
  {
    step:  '01',
    title: 'Click Apply Now',
    desc:  'Our application takes about 5 minutes through our hiring partner Paycom.',
  },
  {
    step:  '02',
    title: "We'll reach out",
    desc:  'A member of our team will call you within 2–3 business days to discuss next steps.',
  },
  {
    step:  '03',
    title: 'Interview at your store',
    desc:  "We'll schedule a quick interview at the location most convenient for you.",
  },
  {
    step:  '04',
    title: 'Join the family',
    desc:  'Onboarding is fast. Most new hires start within 1–2 weeks of applying.',
  },
]

interface JobListing {
  department: string
  title:      string
  type:       'Full-Time' | 'Part-Time'
  locations:  string
  desc:       string
  applyUrl:   string
}

const JOBS: JobListing[] = [
  {
    department: 'Meat Market',
    title:      'Meat Cutter',
    type:       'Full-Time',
    locations:  'Multiple Locations',
    desc:       'Experienced meat cutters needed across the Valley. USDA knowledge and safe food handling required. Custom cut experience a plus.',
    applyUrl:   'https://www.paycomonline.net',
  },
  {
    department: 'Front End',
    title:      'Cashier',
    type:       'Full-Time',
    locations:  'All Locations',
    desc:       "Friendly, reliable cashiers for day, evening, and weekend shifts. Bilingual English/Spanish preferred. No experience necessary — we'll train you.",
    applyUrl:   'https://www.paycomonline.net',
  },
  {
    department: 'Produce',
    title:      'Produce Clerk',
    type:       'Full-Time',
    locations:  'All Locations',
    desc:       'Maintain fresh, attractive produce displays and ensure quality standards. Early morning shifts available. Physical work — must be able to lift 50 lbs.',
    applyUrl:   'https://www.paycomonline.net',
  },
  {
    department: 'Bakery',
    title:      'Bakery Associate',
    type:       'Part-Time',
    locations:  'Select Locations',
    desc:       'Assist in daily bakery production — pan dulce, bolillos, breads, and pastries. Early morning availability required. Experience helpful but not required.',
    applyUrl:   'https://www.paycomonline.net',
  },
]

const TYPE_STYLE = {
  'Full-Time': 'bg-green-950 border-green-900 text-green-400',
  'Part-Time': 'bg-blue-950  border-blue-900  text-blue-400',
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function JobsPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative bg-gray-950 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-end pr-8 opacity-[0.035] select-none"
        >
          <span className="text-[160px] font-black text-white leading-none tracking-tighter">
            TEAM
          </span>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 10% 50%, rgba(100,0,0,0.45) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-red-500" />
              <span className="text-xs font-semibold text-red-400 uppercase tracking-widest">
                Join Our Team
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
              Work With the{' '}
              <span className="text-red-400">Real Meat</span>{' '}
              People
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
              We&apos;re always looking for passionate, hardworking people to join
              our team across 8 Rio Grande Valley locations. If you care about
              your community and your work, you&apos;ll fit right in.
            </p>
            <a
              href="#open-positions"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-colors"
            >
              See Open Positions ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── Culture cards ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-2">
          Why Junior&apos;s
        </p>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-8">
          More than a job
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CULTURE_CARDS.map(({ icon, title, desc }) => (
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
      </section>

      {/* ── Open positions ────────────────────────────────────── */}
      <section
        id="open-positions"
        className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50"
      >
        <div className="max-w-7xl mx-auto px-4 py-14">
          <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-2">
            Now hiring
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-8">
            Open positions
          </h2>

          <div className="flex flex-col gap-4">
            {JOBS.map((job) => (
              <div
                key={job.title}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-5"
              >
                {/* Left: dept tag + title */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {job.department}
                    </span>
                    <span className={`text-[10px] font-bold border rounded-full px-2.5 py-0.5 ${TYPE_STYLE[job.type]}`}>
                      {job.type}
                    </span>
                    <span className="text-[10px] text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-full px-2.5 py-0.5">
                      📍 {job.locations}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {job.desc}
                  </p>
                </div>

                {/* Right: apply button */}
                <div className="shrink-0">
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
                  >
                    Apply Now →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* General application nudge */}
          <div className="mt-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-sm">
                Don&apos;t see your role listed?
              </p>
              <p className="text-sm text-gray-500 mt-0.5">
                We hire year-round. Submit a general application and we&apos;ll
                reach out when the right position opens up.
              </p>
            </div>
            <a
              href="https://www.paycomonline.net"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 border border-gray-300 dark:border-gray-700 hover:border-red-500 dark:hover:border-red-600 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
            >
              General Application
            </a>
          </div>
        </div>
      </section>

      {/* ── How to apply ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-2">
          Simple process
        </p>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-8">
          How to apply
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOW_TO_APPLY.map(({ step, title, desc }) => (
            <div key={step} className="relative">
              {/* Connector line — desktop only */}
              <div className="hidden lg:block absolute top-6 left-[calc(50%+2rem)] right-0 h-px bg-gray-200 dark:bg-gray-800" />
              <div className="flex flex-col items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white font-black text-base shrink-0">
                  {step}
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────── */}
      <section className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-black text-gray-900 dark:text-white text-lg">
              Ready to join the family?
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Questions about a position? Call us — we&apos;re happy to talk.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="https://www.paycomonline.net"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-500 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors"
            >
              Apply Now
            </a>
            <a
              href="tel:+19565864677"
              className="border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
            >
              📞 Call Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
