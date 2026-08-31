import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 3600;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: recipe } = await supabase
    .from("recipes")
    .select("title, description, image_url")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (!recipe) return { title: "Recipe Not Found" };

  return {
    title: recipe.title,
    description: recipe.description ?? `${recipe.title} — a recipe from Junior's Supermarket.`,
    openGraph: {
      title: `${recipe.title} | Junior's Supermarket Recipes`,
      description: recipe.description ?? undefined,
      images: recipe.image_url ? [{ url: recipe.image_url }] : [],
    },
  };
}

export default async function RecipePage({ params }: { params: Params }) {
  const { slug } = await params;
  const supabase = await createClient();

  const [{ data: recipe }, { data: related }] = await Promise.all([
    supabase
      .from("recipes")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle(),
    supabase
      .from("recipes")
      .select("id, title, slug, category, cook_time, image_url, difficulty")
      .eq("is_active", true)
      .neq("slug", slug)
      .limit(3),
  ]);

  if (!recipe) notFound();

  const ingredients: string[] = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
  const instructions: string[] = Array.isArray(recipe.instructions) ? recipe.instructions : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    image: recipe.image_url ? [recipe.image_url] : undefined,
    author: {
      "@type": "Organization",
      name: "Junior's Supermarket",
    },
    recipeCategory: recipe.category,
    prepTime: recipe.prep_time ? `PT${recipe.prep_time.replace(/\D/g, "")}M` : undefined,
    cookTime: recipe.cook_time ? `PT${recipe.cook_time.replace(/\D/g, "")}M` : undefined,
    recipeYield: recipe.servings,
    recipeCuisine: "Mexican",
    recipeIngredient: ingredients,
    recipeInstructions: instructions.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: step,
    })),
    url: `https://www.juniorssupermarket.com/recipes/${recipe.slug}`,
    publisher: {
      "@type": "Organization",
      name: "Junior's Supermarket",
      url: "https://www.juniorssupermarket.com",
      logo: "https://www.juniorssupermarket.com/logo.png",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="bg-hero-pattern py-12 px-4">
        <div className="container-max">
          <Link href="/recipes" className="text-brand-fg/70 hover:text-brand-fg text-sm mb-4 inline-flex items-center gap-1 transition-colors">
            ← All Recipes
          </Link>
          <div className="mt-3">
            <p className="text-brand-fg/70 text-xs font-semibold uppercase tracking-wider mb-2">
              {recipe.category}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-fg leading-tight max-w-2xl">
              {recipe.title}
            </h1>
            {recipe.description && (
              <p className="text-brand-fg/80 mt-3 text-base max-w-xl leading-relaxed">
                {recipe.description}
              </p>
            )}
            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 mt-5 text-sm">
              {recipe.prep_time && (
                <div className="flex items-center gap-2 bg-brand-fg/10 rounded-lg px-3 py-2">
                  <span>⏱</span>
                  <div>
                    <p className="text-brand-fg/60 text-xs">Prep</p>
                    <p className="text-brand-fg font-semibold">{recipe.prep_time}</p>
                  </div>
                </div>
              )}
              {recipe.cook_time && (
                <div className="flex items-center gap-2 bg-brand-fg/10 rounded-lg px-3 py-2">
                  <span>🍳</span>
                  <div>
                    <p className="text-brand-fg/60 text-xs">Cook</p>
                    <p className="text-brand-fg font-semibold">{recipe.cook_time}</p>
                  </div>
                </div>
              )}
              {recipe.servings && (
                <div className="flex items-center gap-2 bg-brand-fg/10 rounded-lg px-3 py-2">
                  <span>👥</span>
                  <div>
                    <p className="text-brand-fg/60 text-xs">Serves</p>
                    <p className="text-brand-fg font-semibold">{recipe.servings}</p>
                  </div>
                </div>
              )}
              {recipe.difficulty && (
                <div className="flex items-center gap-2 bg-brand-fg/10 rounded-lg px-3 py-2">
                  <span>📊</span>
                  <div>
                    <p className="text-brand-fg/60 text-xs">Difficulty</p>
                    <p className="text-brand-fg font-semibold">{recipe.difficulty}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="section-pad bg-accent">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">

            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image */}
              {recipe.image_url && (
                <div className="relative rounded-2xl overflow-hidden aspect-video">
                  <Image
                    src={recipe.image_url}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Ingredients */}
              <div className="card p-6 sm:p-8">
                <h2 className="font-black text-fg text-xl mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {ingredients.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-fg">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="card p-6 sm:p-8">
                <h2 className="font-black text-fg text-xl mb-5">Instructions</h2>
                <ol className="space-y-5">
                  {instructions.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand text-brand-fg text-xs font-black flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-fg text-sm leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Tips */}
              {recipe.tips && (
                <div className="card p-6 border-l-4 border-brand">
                  <h3 className="font-black text-fg text-base mb-2">💡 Pro Tip</h3>
                  <p className="text-muted-fg text-sm leading-relaxed">{recipe.tips}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="card p-6 text-center">
                <h3 className="font-black text-fg text-base mb-2">
                  Get the Best Cut
                </h3>
                <p className="text-muted-fg text-sm mb-4">
                  Our butchers will cut it fresh for you. Find the perfect meat for
                  this recipe at any Junior&apos;s location.
                </p>
                <Link href="/locations" className="btn-primary w-full text-sm">
                  Find a Store
                </Link>
              </div>

              <div className="card p-6 text-center">
                <h3 className="font-black text-fg text-base mb-2">
                  Cuts Guide
                </h3>
                <p className="text-muted-fg text-sm mb-4">
                  Not sure which cut to buy? Our guide breaks down every cut and
                  what it&apos;s best for.
                </p>
                <Link href="/departments/meat-market/cuts" className="btn-secondary w-full text-sm">
                  View Cuts Guide
                </Link>
              </div>

              <div className="card p-6 bg-fg text-center">
                <h3 className="font-black text-bg text-base mb-2">
                  Order by WhatsApp
                </h3>
                <p className="text-bg/70 text-sm mb-4">
                  Tell us what you need — we&apos;ll have it ready.
                </p>
                <Link href="/order" className="btn-primary w-full text-sm">
                  WhatsApp Order
                </Link>
              </div>

              {/* More recipes */}
              {(related ?? []).length > 0 && (
                <div className="card p-4">
                  <h3 className="font-black text-fg text-sm mb-3 px-1">More Recipes</h3>
                  <div className="space-y-2">
                    {(related ?? []).map((r) => (
                      <Link
                        key={r.id}
                        href={`/recipes/${r.slug}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                          {r.image_url ? (
                            <Image
                              src={r.image_url}
                              alt={r.title}
                              width={48}
                              height={48}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-lg">🍽️</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-fg text-xs leading-snug group-hover:text-brand transition-colors line-clamp-2">
                            {r.title}
                          </p>
                          <p className="text-muted-fg text-xs mt-0.5">{r.cook_time}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
