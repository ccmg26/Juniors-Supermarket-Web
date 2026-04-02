import type { Metadata } from "next";
import Link from 'next/link'
import { CURRENT_DEALS } from '@/lib/deals'

export const metadata: Metadata = {
  title: "Departments",
  description: "Explore all departments at Junior's Supermarket — Meat Market, Produce, Dairy, Bakery, Tortilleria, Deli Cuts, Restaurant, Grocery, and Pay & Service Center.",
};

// ── Department data ───────────────────────────────────────────────────────────
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
    featured: false,
  },
  {
    slug:     'grocery',
    name:     'Grocery',
    emoji:    '🛒',
    tagline:  'Full aisles of everyday essentials',
    desc:     'Pantry staples, canned goods, snacks, beverages, and household items.',
    bar:      'bg-gray-700',
    label:    'text-gray-300',
    badge:    'bg-gray-800 border-gray-700 text-gray-300',
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
    featured: false,
  },
] as const

// Count active deals per department category
function dealsForDept(slug: string): number {
  const map: Record<string, string> = {
    'meat-market': 'Meat',
    'produce':     'Produce',
    'dairy':       'Dairy',
    'bakery':      'Bakery',
    'tortilleria': 'Tortilleria',
    'grocery':     'Grocery',
  }
  const cat = map[slug]
  if (!cat) return 0
  return CURRENT_DEALS.filter((d) => d.category === cat).length
}

export default function DepartmentsPage() {
  const featured = DEPARTMENTS.filter((d) => d.featured)
  const rest     = DEPARTMENTS.filter((d) => !d.featured)

  return (
    <>
      {/* ── Page hero ─────────────────────────────────────────── */}
      <div className="bg-gray-950 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-2">
            Everything under one roof
          </p>
          <h1 className="text-3xl font-black text-white">
            Our Departments
          </h1>
          <p className="text-gray-400 mt-2 max-w-lg">
            From fresh-cut meat to hot ready food — Junior&apos;s has everything
            your family needs under one roof.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* ── Featured: Meat Market (full-width hero card) ───── */}
        {featured.map((dept) => {
          const dealCount = dealsForDept(dept.slug)
          return (
            <Link
              key={dept.slug}
              href={`/departments/${dept.slug}`}
              className="group block mb-6"
            >
              <div className="
                relative overflow-hidden rounded-2xl
                bg-gray-900 border border-gray-800
                hover:border-red-900 hover:shadow-xl hover:shadow-red-950/30
                transition-all duration-300
              ">
                {/* Top color bar — thicker for hero */}
                <div className={`${dept.bar} h-2`} />

                <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6">
                  {/* Emoji */}
                  <div className="
                    w-20 h-20 shrink-0 rounded-2xl
                    bg-red-950/50 border border-red-900/50
                    flex items-center justify-center text-5xl
                    group-hover:scale-105 transition-transform duration-300
                  ">
                    {dept.emoji}
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <h2 className="text-2xl font-black text-white">
                        {dept.name}
                      </h2>
                      <span className={`
                        text-xs font-bold px-2.5 py-1 rounded-full border
                        ${dept.badge}
                      `}>
                        Featured Department
                      </span>
                      {dealCount > 0 && (
                        <span className="text-xs font-bold bg-red-600 text-white px-2.5 py-1 rounded-full">
                          {dealCount} deal{dealCount !== 1 ? 's' : ''} this week
                        </span>
                      )}
                    </div>
                    <p className={`text-sm font-semibold uppercase tracking-wider mb-2 ${dept.label}`}>
                      {dept.tagline}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
                      {dept.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="
                    shrink-0 w-10 h-10 rounded-full
                    bg-white/5 border border-white/10
                    flex items-center justify-center
                    text-gray-400 group-hover:text-white
                    group-hover:bg-red-600 group-hover:border-red-600
                    transition-all duration-200
                  ">
                    →
                  </div>
                </div>
              </div>
            </Link>
          )
        })}

        {/* ── All other departments — 3-col grid ─────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((dept) => {
            const dealCount = dealsForDept(dept.slug)
            return (
              <Link
                key={dept.slug}
                href={`/departments/${dept.slug}`}
                className="group block"
              >
                <div className="
                  h-full flex flex-col rounded-2xl overflow-hidden
                  bg-white dark:bg-gray-900
                  border border-gray-200 dark:border-gray-800
                  hover:border-gray-300 dark:hover:border-gray-700
                  hover:shadow-lg dark:hover:shadow-gray-900/50
                  transition-all duration-200
                ">
                  {/* Color bar */}
                  <div className={`${dept.bar} h-1.5`} />

                  <div className="flex flex-col flex-1 p-5">
                    {/* Icon + deals badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="
                        w-14 h-14 rounded-xl
                        bg-gray-100 dark:bg-gray-800
                        flex items-center justify-center text-3xl
                        group-hover:scale-105 transition-transform duration-200
                      ">
                        {dept.emoji}
                      </div>
                      {dealCount > 0 && (
                        <span className="text-[10px] font-bold bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-full px-2 py-1">
                          {dealCount} deal{dealCount !== 1 ? 's' : ''} this week
                        </span>
                      )}
                    </div>

                    {/* Text */}
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                      {dept.name}
                    </h3>
                    <p className="text-[10px] font-semibold uppercase tracking-wider mb-2 text-gray-500 dark:text-gray-400">
                      {dept.tagline}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
                      {dept.desc}
                    </p>

                    {/* Footer link */}
                    <div className="
                      mt-4 pt-3 border-t border-gray-100 dark:border-gray-800
                      flex items-center justify-between
                    ">
                      <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        Learn more
                      </span>
                      <span className="text-xs text-gray-400 group-hover:text-red-600 dark:text-gray-600 dark:group-hover:text-red-400 transition-colors">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* ── Bottom CTA ─────────────────────────────────────── */}
        <div className="mt-10 rounded-2xl bg-gray-950 border border-gray-800 px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              Looking for this week&apos;s deals?
            </h3>
            <p className="text-sm text-gray-400">
              Check the weekly ad — updated every Wednesday with fresh pricing
              across all departments.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              href="/weekly-ad"
              className="bg-red-600 hover:bg-red-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
            >
              🗞 Weekly Ad
            </Link>
            <Link
              href="/locations"
              className="border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
            >
              Find a Store
            </Link>
          </div>
        </div>

      </div>
    </>
  )
}
