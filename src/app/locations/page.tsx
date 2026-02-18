import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import EbtBadge from "@/components/ui/EbtBadge";
import { BRAND, STORE_HOURS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Store Locations",
  description: "Find a Junior's Supermarket near you. 8 locations across the Rio Grande Valley, TX. Open daily 7AM–10PM. EBT/WIC accepted.",
};

export const revalidate = 3600;

export default async function LocationsPage() {
  const supabase = await createClient();
  const { data: stores } = await supabase
    .from("stores")
    .select("*")
    .eq("is_active", true)
    .order("name");

  return (
    <div>
      {/* Hero — dark section */}
      <div className="bg-fg py-12 px-4">
        <div className="container-max text-center">
          <p className="text-bg/60 text-xs font-bold uppercase tracking-widest mb-2">
            Rio Grande Valley, Texas
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-bg mb-3">Our Locations</h1>
          <p className="text-bg/80 text-lg max-w-xl mx-auto mb-4">
            8 stores across the Valley, open daily with fresh meat, produce, and family value.
          </p>
          <EbtBadge />
        </div>
      </div>

      <section className="section-pad bg-accent">
        <div className="container-max">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {(stores ?? []).map((store) => (
              <div key={store.id} className="card flex flex-col">
                {/* Card header — bg-fg for dark header ✅ */}
                <div className="bg-fg p-4 rounded-t-2xl">
                  <h2 className="text-bg font-black text-lg leading-tight">{store.name}</h2>
                  {/* text-bg/60 — white/60 on dark navy: avoids brand-red contrast fail ✅ */}
                  <p className="text-bg/60 text-xs font-semibold mt-0.5 uppercase tracking-wide">
                    Junior&apos;s Supermarket
                  </p>
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-1 gap-4">
                  <div className="space-y-3 text-sm flex-1">
                    <div className="flex items-start gap-2.5">
                      <span className="text-brand mt-0.5 flex-shrink-0">📍</span>
                      <div>
                        <p className="text-fg font-medium">{store.address}</p>
                        <p className="text-muted-fg">{store.city}, {store.state} {store.zip}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-brand flex-shrink-0">📞</span>
                      <a href={`tel:${store.phone.replace(/\D/g, "")}`} className="text-fg hover:text-brand font-medium transition-colors">
                        {store.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-brand flex-shrink-0">🕐</span>
                      <span className="text-muted-fg">{store.hours || STORE_HOURS}</span>
                    </div>
                    {store.ebt_wic && (
                      <EbtBadge size="sm" />
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-border">
                    <Link href={`/locations/${store.slug}`} className="btn-primary text-center text-sm py-2.5">
                      View Store Details
                    </Link>
                    {store.google_maps_url && (
                      <a
                        href={store.google_maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-center text-sm py-2.5"
                      >
                        Get Directions
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA — dark section: bg-fg text-bg ✅ */}
          <div className="mt-12 text-center bg-fg rounded-2xl p-8">
            <h2 className="text-bg font-black text-2xl mb-2">Can&apos;t Find What You Need?</h2>
            <p className="text-bg/80 mb-6">Call us at any location — we&apos;re always happy to help.</p>
            <a href={BRAND.phone.link} className="btn-primary text-lg px-8 py-4">
              Call {BRAND.phone.display}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
