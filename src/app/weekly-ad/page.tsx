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
      {/* Hero — bg-fg text-bg dark section */}
      <div className="bg-fg py-12 px-4">
        <div className="container-max text-center">
          <p className="text-bg/60 text-xs font-bold uppercase tracking-widest mb-2">
            Resets Every Wednesday
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-bg mb-3">This Week&apos;s Ad</h1>
          {ad && (
            /* text-bg/80 on bg-fg: strong contrast ✅ */
            <p className="text-bg/80 text-lg">
              <span className="font-semibold text-bg">{ad.title}</span> ·{" "}
              Valid: {formatDateRange(ad.valid_from, ad.valid_to)}
            </p>
          )}
        </div>
      </div>

      <div className="section-pad bg-accent">
        <div className="container-max">
          {ad ? (() => {
            const isImage = /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(ad.pdf_url ?? "");
            return (
            <div className="space-y-6">
              {/* Info bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-card rounded-2xl p-4 border border-border">
                <div>
                  <p className="font-bold text-fg">{ad.title}</p>
                  <p className="text-sm text-muted-fg">
                    Valid: {formatDateRange(ad.valid_from, ad.valid_to)} · While Supplies Last
                  </p>
                </div>
                {ad.pdf_url && (
                  <a href={ad.pdf_url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    {isImage ? "View Full Size" : "Download PDF"}
                  </a>
                )}
              </div>

              {/* Ad viewer — image or PDF */}
              {ad.pdf_url ? (
                <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
                  {isImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={ad.pdf_url} alt={ad.title} className="w-full h-auto" />
                  ) : (
                    <iframe
                      src={ad.pdf_url}
                      className="w-full"
                      style={{ height: "80vh", minHeight: "600px" }}
                      title="Weekly Ad"
                    />
                  )}
                </div>
              ) : (
                <div className="bg-card rounded-2xl border border-border p-16 text-center text-muted-fg">
                  <div className="text-5xl mb-4">📄</div>
                  <p className="font-semibold text-fg">Ad will be available soon.</p>
                  <p className="text-sm mt-1 text-muted-fg">Check back later or call{" "}
                    <a href="tel:+19565864677" className="text-brand font-semibold hover:underline">956-JUNIORS</a>
                  </p>
                </div>
              )}
            </div>
            );
          })()
          ) : (
            <div className="bg-card rounded-2xl border border-border p-16 text-center text-muted-fg">
              <div className="text-5xl mb-4">📅</div>
              <p className="text-xl font-semibold text-fg mb-2">Ad Coming Wednesday!</p>
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
