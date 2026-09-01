import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import RecipeForm from "../RecipeForm";

export const metadata = { title: "Edit Recipe" };

type Params = Promise<{ id: string }>;

export default async function EditRecipePage({ params }: { params: Params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: recipe } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!recipe) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/recipes" className="text-brand text-sm hover:underline">
          ← Back to Recipes
        </Link>
        <h1 className="text-2xl font-black text-fg mt-2">Edit Recipe</h1>
        <p className="text-muted-fg text-sm">{recipe.title}</p>
      </div>
      <RecipeForm recipe={recipe} />
    </div>
  );
}
