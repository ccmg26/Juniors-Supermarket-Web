import Link from "next/link";
import type { Store } from "@/types";

interface Props {
  stores: Store[];
}

export default function StoreLocations({ stores }: Props) {
  return (
    <section className="section-pad bg-accent">
      <div className="container-max">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="label-eyebrow mb-2">Rio Grande Valley</p>
            <h2 className="text-3xl sm:text-4xl font-black text-fg">
              Find Your Nearest Store
            </h2>
          </div>
          <Link href="/locations" className="text-brand font-semibold text-sm hover:underline hidden sm:block">
            All Locations →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stores.map((store) => (
            <Link
              key={store.id}
              href={`/locations/${store.slug}`}
              className="card p-5 flex flex-col gap-3 hover:border-brand/30 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="w-9 h-9 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                {/* Arrow icon — muted-fg on card: 4.7:1 ✅ (non-text, 3:1 required) */}
                <svg className="w-4 h-4 text-muted-fg group-hover:text-brand transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              <div>
                <h3 className="font-bold text-fg text-sm leading-tight group-hover:text-brand transition-colors">
                  {store.name}
                </h3>
                <p className="text-muted-fg text-xs mt-1 leading-snug">
                  {store.address}
                </p>
                <p className="text-muted-fg text-xs">
                  {store.city}, {store.state} {store.zip}
                </p>
              </div>

              <div className="mt-auto flex items-center justify-between">
                {/* green-700 on white card: 4.5:1 ✅ */}
                <span className="text-xs text-green-700 font-semibold">Open 7AM–10PM</span>
                {store.ebt_wic && (
                  <span className="text-[10px] bg-green-50 text-green-800 border border-green-200 px-1.5 py-0.5 rounded-full font-semibold">
                    EBT/WIC
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link href="/locations" className="btn-primary">
            View All Locations
          </Link>
        </div>
      </div>
    </section>
  );
}
