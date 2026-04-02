import SocialFollowStrip from "@/components/layout/SocialFollowStrip";

export default function HeroSection() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative bg-gray-950 overflow-hidden">

        {/* Background texture layer — large faint brand text */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-end pr-8 opacity-[0.04] select-none"
        >
          <span className="text-[180px] font-black text-white leading-none tracking-tighter">
            MEAT
          </span>
        </div>

        {/* Red gradient wash — bottom-left to center */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 80% at 0% 100%, rgba(153,0,0,0.55) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">

            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-5">
              <span className="h-px w-8 bg-red-500" />
              <span className="text-xs font-semibold text-red-400 uppercase tracking-widest">
                Rio Grande Valley&apos;s Real Meat People
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-5">
              Fresh{' '}
              <span className="text-red-400">Meat.</span>
              <br />
              Real Deals.
              <br />
              <span className="text-amber-300">Family Value.</span>
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-7 max-w-lg">
              8 stores across the Valley — open every day from 7 AM to 10 PM.
              Fresh meat, produce, bakery, tortilleria, and more, at prices your
              family will love.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { icon: '✓',  text: 'EBT / WIC Accepted',        color: 'border-green-700 text-green-300 bg-green-950/60'  },
                { icon: '🥩', text: 'Custom Meat Cuts',           color: 'border-red-800   text-red-300   bg-red-950/60'    },
                { icon: '🗞', text: 'Ad Resets Every Wednesday',  color: 'border-amber-800 text-amber-300 bg-amber-950/60' },
                { icon: '📍', text: '8 Valley Locations',         color: 'border-gray-700  text-gray-300  bg-gray-800/60'   },
              ].map(({ icon, text, color }) => (
                <span
                  key={text}
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${color}`}
                >
                  <span className="text-sm">{icon}</span>
                  {text}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="/weekly-ad"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-colors shadow-lg shadow-red-900/40"
              >
                🗞 View Weekly Ad
              </a>
              <a
                href="/locations"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-colors backdrop-blur-sm"
              >
                📍 Find Your Store
              </a>
            </div>

          </div>
        </div>

        {/* Bottom fade into stats strip */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-8"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))' }}
        />
      </section>

      {/* ── STATS STRIP ─────────────────────────────────────────────────── */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-4 divide-x divide-gray-800">
            {[
              { value: '8',       label: 'Store Locations'  },
              { value: '7AM',     label: 'Open Daily'       },
              { value: 'EBT/WIC', label: 'Always Accepted'  },
              { value: 'Fresh',   label: 'Every Single Day' },
            ].map(({ value, label }) => (
              <div key={label} className="py-4 px-3 text-center">
                <div className="text-lg font-black text-red-400">{value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SOCIAL FOLLOW STRIP ─────────────────────────────────────────── */}
      <SocialFollowStrip />
    </>
  );
}
