import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import RecipeActions from "./RecipeActions";

export const metadata = { title: "Recipes" };

export default async function AdminRecipesPage() {
  const supabase = await createClient();
  const { data: recipes } = await supabase
    .from("recipes")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const active   = (recipes ?? []).filter((r) => r.is_active);
  const featured = (recipes ?? []).filter((r) => r.is_featured);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-fg">Recipes</h1>
          <p className="text-muted-fg text-sm">
            {recipes?.length ?? 0} total &middot; {active.length} active &middot; {featured.length} featured
          </p>
        </div>
        <Link href="/admin/recipes/new" className="btn-primary text-sm">
          + Add Recipe
        </Link>
      </div>

      {(recipes ?? []).length === 0 ? (
        <div className="bg-card rounded-2xl border border-border text-center py-16 text-muted-fg">
          <p className="text-4xl mb-3">🍽️</p>
          <p className="font-semibold text-fg">No recipes yet</p>
          <p className="text-sm mt-1">Add your first recipe to display on the website.</p>
          <Link href="/admin/recipes/new" className="btn-primary mt-4 inline-flex">
            + Add Recipe
          </Link>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-muted-fg">Recipe</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-fg hidden sm:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-fg hidden md:table-cell">Time</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-fg">Status</th>
                <th className="text-right px-4 py-3 font-semibold text-muted-fg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(recipes ?? []).map((r) => (
                <tr key={r.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {r.image_url ? (
                        <Image
                          src={r.image_url}
                          alt={r.title}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-lg object-cover shrink-0 bg-muted"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-muted shrink-0 flex items-center justify-center text-muted-fg text-lg">
                          🍽️
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-fg leading-tight">{r.title}</p>
                        <p className="text-xs text-muted-fg font-mono">/recipes/{r.slug}</p>
                        {r.is_featured && (
                          <span className="text-xs text-yellow-600 font-semibold">★ Featured</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-fg hidden sm:table-cell">{r.category}</td>
                  <td className="px-4 py-3 text-muted-fg text-xs hidden md:table-cell">
                    {[r.prep_time && `Prep: ${r.prep_time}`, r.cook_time && `Cook: ${r.cook_time}`]
                      .filter(Boolean).join(" · ")}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      r.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-muted text-muted-fg"
                    }`}>
                      {r.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <RecipeActions recipe={r} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
