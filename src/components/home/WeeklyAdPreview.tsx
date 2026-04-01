import Link from "next/link";
import { formatDateRange } from "@/lib/utils";
import { BRAND } from "@/lib/constants";
import type { WeeklyAd } from "@/types";

interface Props {
  ad: WeeklyAd | null;
}

export default function WeeklyAdPreview({ ad }: Props) {
  if (!ad) {
    return (
      <section className="bg-accent section-pad">
        <div className="container-max">
          <div className="bg-card rounded-2xl p-8 sm:p-12 text-center border border-border">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="font-black text-fg text-xl mb-2">Weekly Ad Coming Wednesday</h3>
            <p className="text-muted-fg mb-6 max-w-md mx-auto">
              Our weekly ad is refreshed every Wednesday. In the meantime, browse
              our current specials or call us for today&apos;s deals.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href={BRAND.phone.link} className="btn-primary">📞 {BRAND.phone.display}</a>
              <a href="/locations" className="btn-secondary">Find Your Store</a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const dateRange = formatDateRange(ad.valid_from, ad.valid_to);

  return (
    <section className="bg-accent section-pad">
      <div className="container-max">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="label-eyebrow mb-2">This Week&apos;s Ad</p>
            <h2 className="text-3xl sm:text-4xl font-black text-fg mb-3">
              {ad.title}
            </h2>
            <p className="text-muted-fg text-base mb-6">
              Valid: <span className="font-semibold text-fg">{dateRange}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/weekly-ad" className="btn-primary">
                View Full Ad
              </Link>
              {ad.pdf_url && (
                <a
                  href={ad.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Download PDF
                </a>
              )}
            </div>
            <p className="text-xs text-muted-fg mt-4">
              * Ad resets every Wednesday. While Supplies Last.
            </p>
          </div>

          {/* Right panel — branded visual call-to-action */}
          <Link
            href="/weekly-ad"
            className="group relative bg-hero-pattern rounded-2xl overflow-hidden shadow-lg aspect-[4/3] flex flex-col items-center justify-center gap-4 hover:shadow-xl transition-shadow"
          >
            {/* Diagonal stripe overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)",
              }}
              aria-hidden="true"
            />

            <div className="relative flex flex-col items-center gap-4 p-8 text-center">
              {/* Animated arrow icon */}
              <div className="w-20 h-20 rounded-full bg-brand-fg/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-10 h-10 text-brand-fg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>

              <div>
                <p className="text-brand-yellow font-black text-xs uppercase tracking-widest mb-1">
                  This Week&apos;s Savings
                </p>
                <p className="text-brand-fg font-black text-2xl sm:text-3xl leading-tight">
                  View Full Ad
                </p>
                <p className="text-brand-fg/70 text-sm mt-1">{dateRange}</p>
              </div>

              <span className="bg-brand-yellow text-brand-black text-xs font-black px-4 py-2 rounded-full group-hover:bg-white transition-colors">
                Open Ad →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
