"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminUpsertRecipe } from "@/lib/actions";

const CATEGORIES = [
  "BBQ & Grilling",
  "Carne Asada",
  "Soups & Stews",
  "Quick Weeknight",
  "Sides & Salsas",
  "Breakfast",
];

interface Recipe {
  id?: string;
  title?: string;
  slug?: string;
  description?: string;
  category?: string;
  cook_time?: string | null;
  prep_time?: string | null;
  servings?: string | null;
  difficulty?: string;
  ingredients?: string[];
  instructions?: string[];
  tips?: string | null;
  image_url?: string | null;
  is_featured?: boolean;
  is_active?: boolean;
  sort_order?: number;
}

function toSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const inputCls = "w-full px-3 py-2 rounded-lg border border-border bg-bg text-fg text-sm focus:outline-none focus:ring-2 focus:ring-brand";
const labelCls = "block text-sm font-semibold text-fg mb-1";

export default function RecipeForm({ recipe }: { recipe?: Recipe }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [ingredients, setIngredients] = useState(
    (recipe?.ingredients ?? []).join("\n")
  );
  const [instructions, setInstructions] = useState(
    (recipe?.instructions ?? []).join("\n")
  );
  const [title, setTitle] = useState(recipe?.title ?? "");
  const [slug, setSlug] = useState(recipe?.slug ?? "");

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setTitle(val);
    if (!recipe?.id) setSlug(toSlug(val));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");

    const fd = new FormData(e.currentTarget);
    fd.set("ingredients", JSON.stringify(
      ingredients.split("\n").map((s) => s.trim()).filter(Boolean)
    ));
    fd.set("instructions", JSON.stringify(
      instructions.split("\n").map((s) => s.trim()).filter(Boolean)
    ));

    const result = await adminUpsertRecipe(fd);
    if (result.success) {
      setStatus("success");
      setMessage("Recipe saved!");
      setTimeout(() => router.push("/admin/recipes"), 1200);
    } else {
      setStatus("error");
      setMessage(result.error || "Failed to save.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      {recipe?.id && <input type="hidden" name="id" value={recipe.id} />}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Title *</label>
          <input
            name="title"
            value={title}
            onChange={handleTitleChange}
            required
            placeholder="Classic Carne Asada"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Slug *</label>
          <input
            name="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            placeholder="classic-carne-asada"
            className={`${inputCls} font-mono`}
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Description</label>
        <textarea
          name="description"
          rows={2}
          defaultValue={recipe?.description ?? ""}
          placeholder="A brief description..."
          className={inputCls}
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className={labelCls}>Category *</label>
          <select name="category" required className={inputCls} defaultValue={recipe?.category ?? CATEGORIES[0]}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Difficulty</label>
          <select name="difficulty" className={inputCls} defaultValue={recipe?.difficulty ?? "Easy"}>
            {["Easy", "Medium", "Hard"].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Servings</label>
          <input
            name="servings"
            defaultValue={recipe?.servings ?? ""}
            placeholder="4–6"
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Prep Time</label>
          <input name="prep_time" defaultValue={recipe?.prep_time ?? ""} placeholder="15 min" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Cook Time</label>
          <input name="cook_time" defaultValue={recipe?.cook_time ?? ""} placeholder="45 min" className={inputCls} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Image URL</label>
        <input
          name="image_url"
          type="url"
          defaultValue={recipe?.image_url ?? ""}
          placeholder="https://..."
          className={inputCls}
        />
      </div>

      <div>
        <label className={labelCls}>
          Ingredients <span className="text-muted-fg font-normal">(one per line)</span>
        </label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          rows={8}
          placeholder={"2 lbs Junior's flank steak\nJuice of 2 limes\n4 cloves garlic, minced"}
          className={`${inputCls} resize-y`}
        />
      </div>

      <div>
        <label className={labelCls}>
          Instructions <span className="text-muted-fg font-normal">(one step per line)</span>
        </label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows={8}
          placeholder={"Combine lime juice, garlic, and spices.\nMarinate steak for at least 2 hours.\nGrill over high heat 3–4 minutes per side."}
          className={`${inputCls} resize-y`}
        />
      </div>

      <div>
        <label className={labelCls}>Tips (optional)</label>
        <textarea
          name="tips"
          rows={2}
          defaultValue={recipe?.tips ?? ""}
          placeholder="A pro tip from the butcher..."
          className={inputCls}
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm font-medium text-fg cursor-pointer">
          <input
            type="checkbox"
            name="is_featured"
            value="true"
            defaultChecked={recipe?.is_featured ?? false}
            className="w-4 h-4 accent-brand"
          />
          Featured recipe
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-fg cursor-pointer">
          <input
            type="checkbox"
            name="is_active"
            value="true"
            defaultChecked={recipe?.is_active ?? true}
            className="w-4 h-4 accent-brand"
          />
          Active (visible on site)
        </label>
      </div>

      <div>
        <label className={labelCls}>Sort Order</label>
        <input
          name="sort_order"
          type="number"
          defaultValue={String(recipe?.sort_order ?? 0)}
          className={`${inputCls} max-w-[120px]`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {message}
        </p>
      )}
      {status === "success" && (
        <p className="text-green-700 text-sm bg-green-50 border border-green-200 rounded-lg px-4 py-3">
          {message}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary disabled:opacity-60"
        >
          {status === "loading" ? "Saving…" : recipe?.id ? "Update Recipe" : "Create Recipe"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/recipes")}
          className="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
