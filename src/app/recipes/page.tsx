import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Recipes",
  description:
    "Delicious recipes from Junior's Supermarket — BBQ, carne asada, carnitas, soups, sides, and more. Made with the freshest cuts from our meat market.",
  openGraph: {
    title: "Junior's Supermarket Recipes | BBQ, Carne Asada & More",
    description:
      "Cook like a pro with recipes from The Real Meat People. Carne asada, barbacoa, carnitas, pork ribs, and classic RGV favorites.",
  },
};

const CATEGORIES = [
  "All",
  "BBQ & Grilling",
  "Carne Asada",
  "Soups & Stews",
  "Quick Weeknight",
  "Sides & Salsas",
  "Breakfast",
];

const DIFFICULTY_COLOR: Record<string, string> = {
  Easy:   "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard:   "bg-red-100 text-red-700",
};

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("recipes")
    .select("id, title, slug, description, category, cook_time, prep_time, servings, difficulty, image_url, is_featured")
    .eq("is_active", true)
    .order("is_featured", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (category && category !== "All") {
    query = query.eq("category", category);
  }

  const { data: recipes } = await query;
  const activeCategory = category ?? "All";

  const featured = (recipes ?? []).filter((r) => r.is_featured).slice(0, 1)[0];
  const rest = (recipes ?? []).filter((r) => !r.is_featured || r.id !== featured?.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Junior's Supermarket Recipes",
    description: "BBQ, carne asada, carnitas, and more — recipes from The Real Meat People.",
    url: "https://www.juniorssupermarket.com/recipes",
    isPartOf: { "@type": "WebSite", url: "https://www.juniorssupermarket.com" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="bg-hero-pattern py-14 px-4">
        <div className="container-max">
          <p className="text-brand-fg/70 text-xs font-semibold uppercase tracking-wider mb-3">
            From Our Kitchen
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-brand-fg leading-tight">
            Recipes
          </h1>
          <p className="text-brand-fg/80 mt-2 text-base max-w-lg">
            The best recipes start with the best meat. Cook like a pro with fresh cuts
            from Junior&apos;s Meat Market.
          </p>
        </div>
      </div>

      <div className="section-pad bg-accent">
        <div className="container-max">

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={cat === "All" ? "/recipes" : `/recipes?category=${encodeURIComponent(cat)}`}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-brand text-brand-fg"
                    : "bg-card border border-border text-muted-fg hover:text-fg hover:border-brand/40"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Empty state */}
          {(recipes ?? []).length === 0 && (
            <div className="card text-center py-20">
              <p className="text-5xl mb-4">🍖</p>
              <h2 className="font-black text-fg text-xl mb-2">Recipes Coming Soon</h2>
              <p className="text-muted-fg max-w-sm mx-auto">
                We&apos;re cooking up something great. Check back soon for delicious
                recipes from our meat market team.
              </p>
              <Link href="/departments/meat-market" className="btn-primary mt-6 inline-flex">
                Visit Our Meat Market
              </Link>
            </div>
          )}

          {/* Featured recipe */}
          {featured && activeCategory === "All" && (
            <Link
              href={`/recipes/${featured.slug}`}
              className="block card overflow-hidden mb-8 group hover:shadow-md transition-all"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-video md:aspect-auto">
                  {featured.image_url ? (
                    <Image
                      src={featured.image_url}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full min-h-[240px] bg-gradient-to-br from-brand/10 to-brand/5 flex items-center justify-center text-7xl">
                      🥩
                    </div>
                  )}
                </div>
                <div className="p-6 sm:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-brand uppercase tracking-wider">
                      ★ Featured Recipe
                    </span>
                    <span className="text-muted-fg text-xs">·</span>
                    <span className="text-xs text-muted-fg">{featured.category}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-fg leading-tight mb-3 group-hover:text-brand transition-colors">
                    {featured.title}
                  </h2>
                  {featured.description && (
                    <p className="text-muted-fg text-sm leading-relaxed mb-4 line-clamp-3">
                      {featured.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3 text-xs text-muted-fg">
                    {featured.prep_time && (
                      <span className="flex items-center gap-1">
                        ⏱ Prep: {featured.prep_time}
                      </span>
                    )}
                    {featured.cook_time && (
                      <span className="flex items-center gap-1">
                        🍳 Cook: {featured.cook_time}
                      </span>
                    )}
                    {featured.servings && (
                      <span className="flex items-center gap-1">
                        👥 Serves: {featured.servings}
                      </span>
                    )}
                    {featured.difficulty && (
                      <span className={`px-2 py-0.5 rounded-full font-semibold ${
                        DIFFICULTY_COLOR[featured.difficulty] ?? "bg-muted text-muted-fg"
                      }`}>
                        {featured.difficulty}
                      </span>
                    )}
                  </div>
                  <span className="btn-primary mt-6 self-start text-sm">
                    View Recipe →
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Recipe grid */}
          {rest.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((recipe) => (
                <Link
                  key={recipe.id}
                  href={`/recipes/${recipe.slug}`}
                  className="card overflow-hidden group hover:shadow-md transition-all flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden">
                    {recipe.image_url ? (
                      <Image
                        src={recipe.image_url}
                        alt={recipe.title}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand/10 to-brand/5 flex items-center justify-center text-5xl">
                        🍽️
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-muted-fg uppercase tracking-wide">
                        {recipe.category}
                      </span>
                      {recipe.difficulty && (
                        <>
                          <span className="text-border">·</span>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            DIFFICULTY_COLOR[recipe.difficulty] ?? "bg-muted text-muted-fg"
                          }`}>
                            {recipe.difficulty}
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="font-black text-fg leading-snug mb-2 group-hover:text-brand transition-colors">
                      {recipe.title}
                    </h3>
                    {recipe.description && (
                      <p className="text-muted-fg text-sm line-clamp-2 flex-1">
                        {recipe.description}
                      </p>
                    )}
                    <div className="flex gap-3 mt-3 text-xs text-muted-fg">
                      {recipe.cook_time && <span>🍳 {recipe.cook_time}</span>}
                      {recipe.servings && <span>👥 {recipe.servings}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 card p-6 sm:p-8 text-center bg-fg">
            <h2 className="font-black text-bg text-xl mb-2">
              Get the Best Cuts for Every Recipe
            </h2>
            <p className="text-bg/70 text-sm mb-4 max-w-md mx-auto">
              Our butchers know exactly which cut works best for each dish. Stop by
              any Junior&apos;s location — we&apos;ll have it fresh-cut and ready.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/departments/meat-market" className="btn-primary text-sm">
                Visit Meat Market
              </Link>
              <Link href="/departments/meat-market/cuts" className="btn-secondary text-sm bg-bg/10 border-bg/20 text-bg hover:bg-bg/20">
                Cuts Guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
