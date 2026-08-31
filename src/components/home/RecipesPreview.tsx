import Link from "next/link";
import Image from "next/image";

interface Recipe {
  id: string;
  title: string;
  slug: string;
  category: string;
  cook_time: string | null;
  image_url: string | null;
  description: string | null;
}

interface Props {
  recipes: Recipe[];
}

export default function RecipesPreview({ recipes }: Props) {
  // If no recipes, show a static teaser
  if (recipes.length === 0) {
    return (
      <section className="section-pad bg-bg">
        <div className="container-max">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <p className="label-eyebrow text-brand mb-1">From Our Kitchen</p>
              <h2 className="text-2xl sm:text-3xl font-black text-fg">Recipes</h2>
            </div>
            <Link href="/recipes" className="btn-secondary text-sm shrink-0">
              All Recipes →
            </Link>
          </div>
          <div className="card p-8 text-center">
            <p className="text-4xl mb-3">🍖</p>
            <p className="font-black text-fg text-lg mb-1">Recipes Coming Soon</p>
            <p className="text-muted-fg text-sm mb-4">
              BBQ, carne asada, carnitas, and more — check back soon.
            </p>
            <Link href="/recipes" className="btn-primary text-sm">
              Visit Recipes Page
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-pad bg-bg">
      <div className="container-max">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <p className="label-eyebrow text-brand mb-1">From Our Kitchen</p>
            <h2 className="text-2xl sm:text-3xl font-black text-fg">Recipes</h2>
            <p className="text-muted-fg text-sm mt-1">
              Cook like a pro with the freshest cuts from our meat market.
            </p>
          </div>
          <Link href="/recipes" className="btn-secondary text-sm shrink-0">
            All Recipes →
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {recipes.map((recipe) => (
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
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-brand/10 to-brand/5 flex items-center justify-center text-5xl">
                    🍽️
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <p className="text-xs font-semibold text-brand uppercase tracking-wide mb-1">
                  {recipe.category}
                </p>
                <h3 className="font-black text-fg leading-snug group-hover:text-brand transition-colors">
                  {recipe.title}
                </h3>
                {recipe.description && (
                  <p className="text-muted-fg text-sm mt-1 line-clamp-2 flex-1">
                    {recipe.description}
                  </p>
                )}
                {recipe.cook_time && (
                  <p className="text-xs text-muted-fg mt-2">🍳 {recipe.cook_time}</p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/catering" className="btn-primary text-sm">
            🎉 Catering Orders
          </Link>
          <Link href="/departments/meat-market/cuts" className="btn-secondary text-sm">
            🔪 Cuts Guide
          </Link>
        </div>
      </div>
    </section>
  );
}
