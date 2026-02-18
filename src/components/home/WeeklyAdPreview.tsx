import Link from "next/link";
import { formatDateRange } from "@/lib/utils";
import type { WeeklyAd } from "@/types";

interface Props {
  ad: WeeklyAd | null;
}

export default function WeeklyAdPreview({ ad }: Props) {
  if (!ad) {
    return (
      <section className="bg-brand-cream section-pad">
        <div className="container-max">
          <div className="bg-white rounded-2xl p-8 text-center border border-brand-warm-dark">
            <p className="text-brand-gray">Weekly ad coming soon. Check back Wednesday!</p>
          </div>
        </div>
      </section>
    );
  }

  const dateRange = formatDateRange(ad.valid_from, ad.valid_to);

  return (
    <section className="bg-brand-cream section-pad">
      <div className="container-max">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-brand-red text-xs font-bold uppercase tracking-widest mb-2">
              This Week&apos;s Ad
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-black mb-3">
              {ad.title}
            </h2>
            <p className="text-brand-gray text-base mb-6">
              Valid: <span className="font-semibold text-brand-black">{dateRange}</span>
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
            <p className="text-xs text-brand-gray mt-4">* Ad resets every Wednesday. While Supplies Last.</p>
          </div>

          {/* PDF preview placeholder */}
          <div className="relative bg-white rounded-2xl border-2 border-brand-warm-dark overflow-hidden shadow-lg aspect-[4/3] flex items-center justify-center group">
            {ad.pdf_url ? (
              <Link href="/weekly-ad" className="absolute inset-0 flex flex-col items-center justify-center gap-3 hover:bg-brand-cream transition-colors">
                <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="font-bold text-brand-black">View Weekly Ad</p>
                <p className="text-sm text-brand-gray">{dateRange}</p>
              </Link>
            ) : (
              <div className="text-center text-brand-gray">
                <p className="font-semibold">Ad Preview</p>
                <p className="text-sm">PDF not yet uploaded</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
