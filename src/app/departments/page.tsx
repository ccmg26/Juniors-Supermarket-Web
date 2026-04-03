import type { Metadata } from "next";
import Link from 'next/link'
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Departments",
  description: "Explore all departments at Junior's Supermarket — Meat Market, Produce, Dairy, Bakery, Tortilleria, Deli Cuts, Restaurant, Grocery, and Pay & Service Center.",
};

export const revalidate = 1800;

// ── Department visual config (presentational — not in DB) ─────────────────────
const DEPARTMENTS = [
  {
    slug:     'meat-market',
    name:     'Meat Market',
    emoji:    '🥩',
    tagline:  'USDA-grade fresh cuts, custom butcher orders',
    desc:     'Unmatched selection of beef, pork, and chicken. Custom cuts available daily.',
    bar:      'bg-red-900',
    label:    'text-red-300',
    badge:    'bg-red-950 border-red-900 text-red-300',
    category: 'Meat',
    featured: true,
  },
  {
    slug:     'produce',
    name:     'Produce',
    emoji:    '🥦',
    tagline:  'Farm-fresh fruits & vegetables',
    desc:     'Sourced locally and from across the Valley — crisp, fresh, and affordable.',
    bar:      'bg-green-900',
    label:    'text-green-300',
    badge:    'bg-green-950 border-green-900 text-green-300',
    category: 'Produce',
    featured: false,
  },
  {
    slug:     'dairy',
    name:     'Dairy',
    emoji:    '🥛',
    tagline:  'Milk, cheese, eggs & more',
    desc:     'All your refrigerated essentials — from everyday milk to specialty cheeses.',
    bar:      'bg-blue-900',
    label:    'text-blue-300',
    badge:    'bg-blue-950 border-blue-900 text-blue-300',
    category: 'Dairy',
    featured: false,
  },
  {
    slug:     'grocery',
    name:     'Grocery',
    emoji:    '🛒',
    tagline:  'Full aisles of everyday essentials',
    desc:     'Pantry staples, canned goods, snacks, beverages, and household items.',
    bar:      'bg-gray-700',
    label:    'text-muted-fg',
    badge:    'bg-muted border-border text-muted-fg',
    category: 'Grocery',
    featured: false,
  },
  {
    slug:     'deli-cuts',
    name:     'Deli Cuts',
    emoji:    '🍖',
    tagline:  'Premium deli meats & cheeses',
    desc:     'Cut fresh to order — cold cuts, sandwich meats, and specialty cheeses.',
    bar:      'bg-orange-900',
    label:    'text-orange-300',
    badge:    'bg-orange-950 border-orange-900 text-orange-300',
    category: 'Deli Cuts',
    featured: false,
  },
  {
    slug:     'restaurant',
    name:     'Restaurant',
    emoji:    '🍽️',
    tagline:  'Hot food ready to eat',
    desc:     'Made fresh in-store daily. Perfect for a quick, hot family meal.',
    bar:      'bg-yellow-900',
    label:    'text-yellow-300',
    badge:    'bg-yellow-950 border-yellow-900 text-yellow-300',
    category: 'Restaurant',
    featured: false,
  },
  {
    slug:     'bakery',
    name:     'Bakery',
    emoji:    '🥖',
    tagline:  'Fresh-baked bread & pastries daily',
    desc:     'Pan dulce, bolillos, cakes, and pastries — baked fresh every morning.',
    bar:      'bg-amber-900',
    label:    'text-amber-300',
    badge:    'bg-amber-950 border-amber-900 text-amber-300',
    category: 'Bakery',
    featured: false,
  },
  {
    slug:     'tortilleria',
    name:     'Tortilleria',
    emoji:    '🫓',
    tagline:  'Handmade tortillas, fresh daily',
    desc:     'Corn and flour tortillas made by hand every single day — taste the difference.',
    bar:      'bg-orange-800',
    label:    'text-orange-300',
    badge:    'bg-orange-950 border-orange-900 text-orange-300',
    category: 'Tortilleria',
    featured: false,
  },
  {
    slug:     'pay-service-center',
    name:     'Pay & Service Center',
    emoji:    '💳',
    tagline:  'Money services & bill pay',
    desc:     'Money orders, wire transfers, bill pay, and more — all under one roof.',
    bar:      'bg-purple-900',
    label:    'text-purple-300',
    badge:    'bg-purple-950 border-purple-900 text-purple-300',
    category: 'Pay & Service Center',
    featured: false,
  },
] as const

export default async function DepartmentsPage() {
  const supabase = await createClient();
  const { data: specials } = await supabase
    .from("specials")
    .select("category")
    .eq("is_active", true);

  // Build a count map from live specials
  const dealCounts: Record<string, number> = {};
  for (const s of specials ?? []) {
    dealCounts[s.category] = (dealCounts[s.category] ?? 0) + 1;
  }

  const featured = DEPARTMENTS.filter((d) => d.featured);
  const rest     = DEPARTMENTS.filter((d) => !d.featured);

  return (
    <>
      {/* ── Page hero ─────────────────────────────────────────── */}
      <div className="bg-fg border-b border-border/20">
        <div className="container-max px-4 py-10">
          <p className="label-eyebrow text-brand/80 mb-2">
            Everything under one roof
          </p>
          <h1 className="text-3xl font-black text-brand-fg">
            Our Departments
          </h1>
          <p className="text-brand-fg/60 mt-2 max-w-lg">
            From fresh-cut meat to hot ready food — Junior&apos;s has everything
            your family needs under one roof.
          </p>
        </div>
      </div>

      <div className="container-max px-4 py-10">

        {/* ── Featured: Meat Market (full-width hero card) ───── */}
        {featured.map((dept) => {
          const dealCount = dealCounts[dept.category] ?? 0;
          return (
            <Link
              key={dept.slug}
              href={`/departments/${dept.slug}`}
              className="group block mb-6"
            >
              <div className="
                relative overflow-hidden rounded-2xl
                bg-fg border border-border/30
                hover:border-brand/40 hover:shadow-xl hover:shadow-brand/20
                transition-all duration-300
              ">
                {/* Top color bar */}
                <div className={`${dept.bar} h-2`} />

                <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6">
                  {/* Emoji */}
                  <div className="
                    w-20 h-20 shrink-0 rounded-2xl
                    bg-brand/10 border border-brand/20
                    flex items-center justify-center text-5xl
                    group-hover:scale-105 transition-transform duration-300
                  ">
                    {dept.emoji}
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <h2 className="text-2xl font-black text-brand-fg">
                        {dept.name}
                      </h2>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${dept.badge}`}>
                        Featured Department
                      </span>
                      {dealCount > 0 && (
                        <span className="text-xs font-bold bg-brand text-brand-fg px-2.5 py-1 rounded-full">
                          {dealCount} deal{dealCount !== 1 ? 's' : ''} this week
                        </span>
                      )}
                    </div>
                    <p className={`text-sm font-semibold uppercase tracking-wider mb-2 ${dept.label}`}>
                      {dept.tagline}
                    </p>
                    <p className="text-brand-fg/60 text-sm leading-relaxed max-w-lg">
                      {dept.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="
                    shrink-0 w-10 h-10 rounded-full
                    bg-brand-fg/5 border border-brand-fg/10
                    flex items-center justify-center
                    text-brand-fg/40 group-hover:text-brand-fg
                    group-hover:bg-brand group-hover:border-brand
                    transition-all duration-200
                  ">
                    →
                  </div>
                </div>
              </div>
            </Link>
          );
        })}

        {/* ── All other departments — 3-col grid ─────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((dept) => {
            const dealCount = dealCounts[dept.category] ?? 0;
            return (
              <Link
                key={dept.slug}
                href={`/departments/${dept.slug}`}
                className="group block"
              >
                <div className="
                  h-full flex flex-col rounded-2xl overflow-hidden
                  bg-card border border-border
                  hover:border-border/60 hover:shadow-lg
                  transition-all duration-200
                ">
                  {/* Color bar */}
                  <div className={`${dept.bar} h-1.5`} />

                  <div className="flex flex-col flex-1 p-5">
                    {/* Icon + deals badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="
                        w-14 h-14 rounded-xl bg-muted
                        flex items-center justify-center text-3xl
                        group-hover:scale-105 transition-transform duration-200
                      ">
                        {dept.emoji}
                      </div>
                      {dealCount > 0 && (
                        <span className="text-[10px] font-bold bg-brand/10 text-brand border border-brand/20 rounded-full px-2 py-1">
                          {dealCount} deal{dealCount !== 1 ? 's' : ''} this week
                        </span>
                      )}
                    </div>

                    {/* Text */}
                    <h3 className="text-base font-bold text-fg mb-1">
                      {dept.name}
                    </h3>
                    <p className="text-[10px] font-semibold uppercase tracking-wider mb-2 text-muted-fg">
                      {dept.tagline}
                    </p>
                    <p className="text-sm text-muted-fg leading-relaxed flex-1">
                      {dept.desc}
                    </p>

                    {/* Footer link */}
                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-fg group-hover:text-brand transition-colors">
                        Learn more
                      </span>
                      <span className="text-xs text-muted-fg group-hover:text-brand transition-colors">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── Bottom CTA ─────────────────────────────────────── */}
        <div className="mt-10 rounded-2xl bg-fg border border-border/30 px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-brand-fg mb-1">
              Looking for this week&apos;s deals?
            </h3>
            <p className="text-sm text-brand-fg/60">
              Check the weekly ad — updated every Wednesday with fresh pricing
              across all departments.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/weekly-ad" className="btn-primary text-sm">
              🗞 Weekly Ad
            </Link>
            <Link href="/locations" className="btn-white-outline text-sm">
              Find a Store
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
