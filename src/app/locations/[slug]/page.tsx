import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import EbtBadge from "@/components/ui/EbtBadge";
import TopDeals from "@/components/home/TopDeals";
import { STORE_HOURS, STORE_SERVICES, BRAND } from "@/lib/constants";
import type { Store } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: store } = await supabase
    .from("stores")
    .select("name, city, state, address")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!store) return { title: "Store Not Found" };

  return {
    title: `${store.name} – ${store.city}, ${store.state}`,
    description: `Junior's Supermarket ${store.name} at ${store.address}, ${store.city}, ${store.state}. Open daily 7AM–10PM. EBT/WIC accepted.`,
  };
}

export const revalidate = 3600;

function generateJsonLd(store: Store) {
  return {
    "@context": "https://schema.org",
    "@type": "GroceryStore",
    name: `Junior's Supermarket – ${store.name}`,
    description: "The Real Meat People. Fresh meat, produce, and family value.",
    address: {
      "@type": "PostalAddress",
      streetAddress: store.address,
      addressLocality: store.city,
      addressRegion: store.state,
      postalCode: store.zip,
      addressCountry: "US",
    },
    telephone: store.phone,
    openingHours: "Mo-Su 07:00-22:00",
    paymentAccepted: "EBT, WIC, Cash, Credit Card",
    url: `https://www.juniorssupermarket.com/locations/${store.slug}`,
    ...(store.google_maps_url ? { hasMap: store.google_maps_url } : {}),
  };
}

export default async function LocationDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const [{ data: store }, { data: specials }] = await Promise.all([
    supabase
      .from("stores")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single(),
    supabase
      .from("specials")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(4),
  ]);

  if (!store) notFound();

  const mapsEmbedUrl = store.google_maps_url
    ? `https://maps.google.com/maps?q=${encodeURIComponent(
        `${store.address}, ${store.city}, ${store.state} ${store.zip}`
      )}&t=&z=15&ie=UTF8&iwloc=&output=embed`
    : null;

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd(store)) }}
      />

      {/* Hero */}
      <div className="bg-brand-black py-12 px-4">
        <div className="container-max">
          <Link href="/locations" className="text-bg/80 hover:text-bg text-sm mb-4 inline-flex items-center gap-1 transition-colors">
            ← All Locations
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-2 mb-2">
            {store.name}
          </h1>
          <p className="text-brand-red font-semibold uppercase text-sm tracking-wide">
            Junior&apos;s Supermarket · {store.city}, {store.state}
          </p>
        </div>
      </div>

      <section className="section-pad bg-brand-cream">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Info sidebar */}
            <div className="space-y-4">
              {/* Store info card */}
              <div className="card p-6 space-y-4">
                <h2 className="font-black text-brand-black text-lg">Store Information</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-brand-red text-lg mt-0.5">📍</span>
                    <div>
                      <p className="font-semibold text-brand-black">{store.address}</p>
                      <p className="text-brand-gray">{store.city}, {store.state} {store.zip}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-brand-red text-lg">📞</span>
                    <a
                      href={`tel:${store.phone.replace(/\D/g, "")}`}
                      className="font-semibold text-brand-black hover:text-brand-red transition-colors"
                    >
                      {store.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-brand-red text-lg">🕐</span>
                    <span className="text-brand-gray">{store.hours || STORE_HOURS}</span>
                  </div>
                </div>

                {store.ebt_wic && (
                  <div className="pt-2 border-t border-gray-100">
                    <EbtBadge size="md" />
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-col gap-3 pt-2 border-t border-gray-100">
                  <a
                    href={`tel:${store.phone.replace(/\D/g, "")}`}
                    className="btn-primary text-center"
                  >
                    📞 Call This Store
                  </a>
                  {store.google_maps_url && (
                    <a
                      href={store.google_maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-center"
                    >
                      🗺️ Get Directions
                    </a>
                  )}
                </div>
              </div>

              {/* Services */}
              <div className="card p-6">
                <h2 className="font-black text-brand-black text-lg mb-4">Departments</h2>
                <div className="flex flex-wrap gap-2">
                  {(store.services?.length ? store.services : STORE_SERVICES).map((svc: string) => (
                    <span
                      key={svc}
                      className="bg-brand-red/10 text-brand-red text-xs font-semibold px-3 py-1.5 rounded-full"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Map + gallery */}
            <div className="lg:col-span-2 space-y-6">
              {/* Map */}
              {mapsEmbedUrl && (
                <div className="rounded-2xl overflow-hidden shadow-sm border border-brand-warm-dark aspect-video">
                  <iframe
                    src={mapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${store.name}`}
                  />
                </div>
              )}

              {/* Gallery */}
              {store.images && store.images.length > 0 && (
                <div>
                  <h2 className="font-black text-brand-black text-lg mb-4">Store Photos</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {store.images.slice(0, 4).map((img: string, i: number) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={i}
                        src={img}
                        alt={`${store.name} photo ${i + 1}`}
                        className="rounded-xl aspect-video object-cover w-full"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Deals */}
      {specials && specials.length > 0 && (
        <div>
          <div className="bg-brand-black py-6 px-4">
            <div className="container-max">
              <h2 className="text-white font-black text-2xl">
                Weekly Deals Available at This Location
              </h2>
              <p className="text-bg/80 text-sm mt-1">While Supplies Last</p>
            </div>
          </div>
          <TopDeals specials={specials} />
        </div>
      )}
    </>
  );
}
