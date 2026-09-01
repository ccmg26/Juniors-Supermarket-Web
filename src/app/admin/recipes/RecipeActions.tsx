"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { adminDeleteRecipe } from "@/lib/actions";

export default function RecipeActions({ recipe }: { recipe: { id: string; title: string } }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Delete "${recipe.title}"? This cannot be undone.`)) return;
    const result = await adminDeleteRecipe(recipe.id);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error ?? "Failed to delete.");
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Link
        href={`/admin/recipes/${recipe.id}`}
        className="text-xs font-semibold text-brand hover:underline px-2 py-1"
      >
        Edit
      </Link>
      <button
        onClick={handleDelete}
        className="text-xs font-semibold text-red-600 hover:text-red-700 px-2 py-1"
      >
        Delete
      </button>
    </div>
  );
}
