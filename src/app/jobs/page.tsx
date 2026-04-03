import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import type { Job } from '@/types'

export const metadata: Metadata = {
  title: "Jobs at Junior's Supermarket",
  description:
    "Join the Junior's Supermarket family. Browse open positions across our 8 Rio Grande Valley locations — cashiers, meat cutters, produce clerks, and more. Apply through Paycom.",
}

export const revalidate = 3600

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

const TYPE_STYLE: Record<string, string> = {
  'Full-Time': 'bg-green-950 border-green-900 text-green-400',
  'Part-Time': 'bg-blue-950  border-blue-900  text-blue-400',
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function JobsPage() {
  const supabase = await createClient()
  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  const JOBS: Job[] = jobs ?? []
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative bg-fg overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-end pr-8 opacity-[0.035] select-none"
        >
          <span className="text-[160px] font-black text-brand-fg leading-none tracking-tighter">
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
        <div className="relative container-max px-4 py-16 sm:py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-brand" />
              <span className="label-eyebrow text-brand/80">
                Join Our Team
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-brand-fg leading-tight mb-5">
              Work With the{' '}
              <span className="text-brand">Real Meat</span>{' '}
              People
            </h1>
            <p className="text-brand-fg/70 text-lg leading-relaxed mb-8 max-w-xl">
              We&apos;re always looking for passionate, hardworking people to join
              our team across 8 Rio Grande Valley locations. If you care about
              your community and your work, you&apos;ll fit right in.
            </p>
            <a
              href="#open-positions"
              className="btn-primary text-sm"
            >
              See Open Positions ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── Culture cards ─────────────────────────────────────── */}
      <section className="container-max px-4 py-14">
        <p className="label-eyebrow text-brand mb-2">
          Why Junior&apos;s
        </p>
        <h2 className="text-2xl sm:text-3xl font-black text-fg mb-8">
          More than a job
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CULTURE_CARDS.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <div className="text-3xl mb-4">{icon}</div>
              <h3 className="text-base font-bold text-fg mb-2">
                {title}
              </h3>
              <p className="text-sm text-muted-fg leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Open positions ────────────────────────────────────── */}
      <section
        id="open-positions"
        className="border-t border-border bg-muted"
      >
        <div className="container-max px-4 py-14">
          <p className="label-eyebrow text-brand mb-2">
            Now hiring
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-fg mb-8">
            Open positions
          </h2>

          <div className="flex flex-col gap-4">
            {JOBS.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400 text-sm">
                No open positions listed right now — check back soon or submit a general application below.
              </div>
            ) : JOBS.map((job) => (
              <div
                key={job.id}
                className="bg-card border border-border rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-5"
              >
                {/* Left: dept tag + title */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-muted-fg uppercase tracking-wider">
                      {job.department}
                    </span>
                    <span className={`text-[10px] font-bold border rounded-full px-2.5 py-0.5 ${TYPE_STYLE[job.type] ?? 'bg-gray-800 border-gray-700 text-gray-300'}`}>
                      {job.type}
                    </span>
                    <span className="text-[10px] text-muted-fg bg-muted rounded-full px-2.5 py-0.5">
                      📍 {job.location}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-fg mb-2">
                    {job.title}
                  </h3>
                  <p className="text-sm text-muted-fg leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Right: apply button */}
                <div className="shrink-0">
                  <a
                    href={job.paycom_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm whitespace-nowrap"
                  >
                    Apply Now →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* General application nudge */}
          <div className="mt-5 rounded-2xl border border-border bg-card p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-fg text-sm">
                Don&apos;t see your role listed?
              </p>
              <p className="text-sm text-muted-fg mt-0.5">
                We hire year-round. Submit a general application and we&apos;ll
                reach out when the right position opens up.
              </p>
            </div>
            <a
              href="https://www.paycomonline.net"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary shrink-0 text-sm"
            >
              General Application
            </a>
          </div>
        </div>
      </section>

      {/* ── How to apply ──────────────────────────────────────── */}
      <section className="container-max px-4 py-14">
        <p className="label-eyebrow text-brand mb-2">
          Simple process
        </p>
        <h2 className="text-2xl sm:text-3xl font-black text-fg mb-8">
          How to apply
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOW_TO_APPLY.map(({ step, title, desc }) => (
            <div key={step} className="relative">
              {/* Connector line — desktop only */}
              <div className="hidden lg:block absolute top-6 left-[calc(50%+2rem)] right-0 h-px bg-border" />
              <div className="flex flex-col items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand flex items-center justify-center text-white font-black text-base shrink-0">
                  {step}
                </div>
                <h3 className="text-base font-bold text-fg">
                  {title}
                </h3>
                <p className="text-sm text-muted-fg leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────── */}
      <section className="border-t border-border bg-muted">
        <div className="container-max px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-black text-fg text-lg">
              Ready to join the family?
            </p>
            <p className="text-sm text-muted-fg mt-1">
              Questions about a position? Call us — we&apos;re happy to talk.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="https://www.paycomonline.net"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              Apply Now
            </a>
            <a
              href="tel:+19565864677"
              className="btn-secondary text-sm"
            >
              📞 Call Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
