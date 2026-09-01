import Link from "next/link";
import RecipeForm from "../RecipeForm";

export const metadata = { title: "New Recipe" };

export default function NewRecipePage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/recipes" className="text-brand text-sm hover:underline">
          ← Back to Recipes
        </Link>
        <h1 className="text-2xl font-black text-fg mt-2">New Recipe</h1>
      </div>
      <RecipeForm />
    </div>
  );
}
