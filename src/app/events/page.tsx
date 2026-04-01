import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { formatDateRange } from "@/lib/utils";
import { BRAND } from "@/lib/constants";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Events & Promotions",
  description: "Stay up to date with events and promotions at Junior's Supermarket. Weekly campaigns, seasonal specials, and community events.",
};

export const revalidate = 3600;

export default async function EventsPage() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .eq("is_active", true)
    .order("start_date", { ascending: false });

  const featured = events?.find((e) => e.is_featured);
  const rest = events?.filter((e) => !e.is_featured) ?? [];

  return (
    <div>
      <PageHero
        eyebrow="What's Happening"
        title="Events & Promotions"
        subtitle="From Lent specials to BBQ season — we celebrate every season with our community."
      />

      <section className="section-pad bg-accent">
        <div className="container-max">
          {/* Featured */}
          {featured && (
            <div className="card overflow-hidden mb-8">
              <div className="grid md:grid-cols-2">
                <div className="aspect-video md:aspect-auto bg-accent flex items-center justify-center relative">
                  {featured.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={featured.image_url}
                      alt={featured.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-8xl">🎉</div>
                  )}
                  <span className="absolute top-4 left-4 bg-brand text-brand-fg text-xs font-bold px-3 py-1.5 rounded-full">
                    Featured Event
                  </span>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <p className="text-brand font-semibold text-sm uppercase tracking-wide mb-2">
                    {formatDateRange(featured.start_date, featured.end_date)}
                  </p>
                  <h2 className="text-3xl font-black text-fg mb-3">{featured.title}</h2>
                  <p className="text-muted-fg leading-relaxed">{featured.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* All events */}
          {rest.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((event) => (
                <div key={event.id} className="card overflow-hidden">
                  <div className="aspect-video bg-accent flex items-center justify-center relative overflow-hidden">
                    {event.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={event.image_url}
                        alt={event.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-6xl">🎊</div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-brand text-xs font-semibold uppercase tracking-wide mb-1">
                      {formatDateRange(event.start_date, event.end_date)}
                    </p>
                    <h3 className="font-black text-fg text-lg mb-2">{event.title}</h3>
                    <p className="text-muted-fg text-sm leading-relaxed">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!events?.length && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📅</div>
              <p className="text-2xl font-black text-fg mb-2">New Events Posted Regularly</p>
              <p className="text-muted-fg mb-8 max-w-md mx-auto">
                Follow us on social media to be the first to know about upcoming promotions,
                seasonal specials, and community events.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href={BRAND.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Follow on Facebook
                </a>
                <a
                  href={BRAND.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Follow on Instagram
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
