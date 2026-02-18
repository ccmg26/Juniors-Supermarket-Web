import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { formatDateRange } from "@/lib/utils";
import SectionHeader from "@/components/ui/SectionHeader";
import TopDeals from "@/components/home/TopDeals";

export const metadata: Metadata = {
  title: "Weekly Ad",
  description: "View this week's Junior's Supermarket ad. Great deals on meat, produce, dairy, and more. Valid dates listed. While supplies last.",
};

export const revalidate = 3600;

export default async function WeeklyAdPage() {
  const supabase = await createClient();

  const [{ data: ad }, { data: specials }] = await Promise.all([
    supabase
      .from("weekly_ads")
      .select("*")
      .eq("is_active", true)
      .order("valid_from", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("specials")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  return (
    <div>
      {/* Hero */}
      <div className="bg-brand-black py-12 px-4">
        <div className="container-max text-center">
          <p className="text-brand-red text-xs font-bold uppercase tracking-widest mb-2">
            Resets Every Wednesday
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">This Week&apos;s Ad</h1>
          {ad && (
            <p className="text-gray-300 text-lg">
              <span className="font-semibold text-white">{ad.title}</span> ·{" "}
              Valid: {formatDateRange(ad.valid_from, ad.valid_to)}
            </p>
          )}
        </div>
      </div>

      <div className="section-pad bg-brand-cream">
        <div className="container-max">
          {ad ? (
            <div className="space-y-6">
              {/* Download button */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-2xl p-4 border border-brand-warm-dark">
                <div>
                  <p className="font-bold text-brand-black">{ad.title}</p>
                  <p className="text-sm text-brand-gray">
                    Valid: {formatDateRange(ad.valid_from, ad.valid_to)} · While Supplies Last
                  </p>
                </div>
                {ad.pdf_url && (
                  <a
                    href={ad.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Download PDF
                  </a>
                )}
              </div>

              {/* PDF viewer */}
              {ad.pdf_url ? (
                <div className="bg-white rounded-2xl border border-brand-warm-dark overflow-hidden shadow-sm">
                  <iframe
                    src={ad.pdf_url}
                    className="w-full"
                    style={{ height: "80vh", minHeight: "600px" }}
                    title="Weekly Ad PDF"
                  />
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-brand-warm-dark p-16 text-center text-brand-gray">
                  <div className="text-5xl mb-4">📄</div>
                  <p className="font-semibold">PDF will be available soon.</p>
                  <p className="text-sm mt-1">Check back later or call {" "}
                    <a href="tel:+19565864677" className="text-brand-red font-semibold">956-JUNIORS</a>
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-brand-warm-dark p-16 text-center text-brand-gray">
              <div className="text-5xl mb-4">📅</div>
              <p className="text-xl font-semibold text-brand-black mb-2">Ad Coming Wednesday!</p>
              <p>Our weekly ad resets every Wednesday. Check back then for the latest deals.</p>
              <a href="tel:+19565864677" className="btn-primary mt-6 inline-flex">
                Call for Current Deals
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Top Deals */}
      <TopDeals specials={specials ?? []} />
    </div>
  );
}
