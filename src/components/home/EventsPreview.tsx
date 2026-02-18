import Link from "next/link";
import { formatDateRange } from "@/lib/utils";
import type { Event } from "@/types";

interface Props {
  events: Event[];
}

export default function EventsPreview({ events }: Props) {
  const featured = events.find((e) => e.is_featured);
  const rest = events.filter((e) => !e.is_featured).slice(0, 3);

  return (
    <section className="section-pad bg-bg">
      <div className="container-max">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="label-eyebrow mb-2">What&apos;s Happening</p>
            <h2 className="text-3xl sm:text-4xl font-black text-fg">
              Events & Promotions
            </h2>
          </div>
          <Link href="/events" className="text-brand font-semibold text-sm hover:underline hidden sm:block">
            View All Events →
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Featured event */}
          {featured && (
            <div className="lg:col-span-2 card overflow-hidden">
              <div className="aspect-video bg-accent flex items-center justify-center relative">
                {featured.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featured.image_url}
                    alt={featured.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-7xl">🎉</div>
                )}
                <span className="absolute top-3 left-3 bg-brand text-brand-fg text-xs font-bold px-3 py-1 rounded-full">
                  Featured
                </span>
              </div>
              <div className="p-6">
                <p className="text-brand text-xs font-semibold uppercase tracking-wide mb-1">
                  {formatDateRange(featured.start_date, featured.end_date)}
                </p>
                <h3 className="text-xl font-black text-fg mb-2">{featured.title}</h3>
                <p className="text-muted-fg text-sm leading-relaxed">{featured.description}</p>
              </div>
            </div>
          )}

          {/* Side events */}
          <div className="flex flex-col gap-4">
            {rest.length === 0 && !featured && (
              <div className="card p-8 text-center text-muted-fg">
                <div className="text-4xl mb-3">📅</div>
                <p>Events coming soon!</p>
              </div>
            )}
            {rest.map((event) => (
              <div key={event.id} className="card p-4 flex gap-4">
                <div className="w-16 h-16 bg-accent rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {event.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">🎊</span>
                  )}
                </div>
                <div>
                  <p className="text-brand text-xs font-semibold mb-0.5">
                    {formatDateRange(event.start_date, event.end_date)}
                  </p>
                  <h3 className="font-bold text-fg text-sm">{event.title}</h3>
                  <p className="text-muted-fg text-xs leading-snug mt-1 line-clamp-2">{event.description}</p>
                </div>
              </div>
            ))}
            <Link href="/events" className="btn-primary text-center mt-auto">
              View All Events
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
