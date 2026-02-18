import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { DepartmentGalleryImage } from "@/types";

interface Props {
  slug: string;
  icon: string;
  title: string;
  description: string;
  highlights: string[];
}

export default async function DepartmentPage({
  slug,
  icon,
  title,
  description,
  highlights,
}: Props) {
  const supabase = await createClient();

  const { data: dept } = await supabase
    .from("departments")
    .select("*, department_gallery_images(*)")
    .eq("slug", slug)
    .maybeSingle();

  const gallery: DepartmentGalleryImage[] =
    dept?.department_gallery_images ?? [];

  return (
    <div>
      {/* Hero — dark gradient, all text must be white/light */}
      <div className="bg-hero-pattern py-16 px-4">
        <div className="container-max">
          {/* Back link: text-brand-fg/70 on dark gradient ✅ (replaces text-gray-600 which fails) */}
          <Link href="/departments" className="text-brand-fg/70 hover:text-brand-fg text-sm mb-4 inline-flex items-center gap-1 transition-colors">
          <Link href="/departments" className="text-bg/80 hover:text-bg text-sm mb-4 inline-flex items-center gap-1 transition-colors">
            ← All Departments
          </Link>
          <div className="flex items-center gap-4 mt-3">
            <div className="text-6xl">{icon}</div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-brand-fg leading-tight">{title}</h1>
              <p className="text-brand-fg/60 font-semibold text-sm uppercase tracking-wide mt-1">
                Junior&apos;s Supermarket
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="section-pad bg-accent">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              {/* Description card */}
              <div className="card p-6 sm:p-8">
                <p className="text-muted-fg text-base leading-relaxed text-lg">{description}</p>
                {highlights.length > 0 && (
                  <ul className="mt-6 space-y-2">
                    {highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-fg text-sm">
                        <span className="text-brand font-bold mt-0.5">✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Gallery */}
              {gallery.length > 0 && (
                <div>
                  <h2 className="font-black text-fg text-2xl mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {gallery.map((img) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={img.id}
                        src={img.image_url}
                        alt={img.caption ?? title}
                        className="rounded-xl aspect-square object-cover w-full"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA sidebar */}
            <div className="space-y-4">
              <div className="card p-6 text-center">
                <h3 className="font-black text-fg text-lg mb-2">Visit a Store</h3>
                <p className="text-muted-fg text-sm mb-4">
                  Find {title} at all 8 Junior&apos;s Supermarket locations.
                </p>
                <Link href="/locations" className="btn-primary w-full text-center">
                  Find a Store
                </Link>
              </div>

              <div className="card p-6 text-center">
                <h3 className="font-black text-fg text-lg mb-2">This Week&apos;s Deals</h3>
                <p className="text-muted-fg text-sm mb-4">
                  Check out our current specials on {title} items.
                </p>
                <Link href="/specials" className="btn-secondary w-full text-center">
                  View Weekly Specials
                </Link>
              </div>

              {/* CRITICAL FIX: was bg-brand-black with text-gray-600 (2.76:1 ❌)
                  Now bg-fg with text-bg/70 (readable white on dark) ✅ */}
              <div className="card p-6 bg-fg text-center">
                <h3 className="font-black text-bg text-lg mb-2">Have Questions?</h3>
                <p className="text-bg/70 text-sm mb-4">Call your nearest store.</p>
              <div className="card p-6 bg-brand-black text-center">
                <h3 className="font-black text-white text-lg mb-2">Have Questions?</h3>
                <p className="text-bg/80 text-sm mb-4">Call your nearest store.</p>
                <a href="tel:+19565864677" className="btn-primary w-full text-center">
                  📞 956-JUNIORS
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
