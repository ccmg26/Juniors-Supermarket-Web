"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminUpsertSpecial } from "@/lib/actions";
import { SPECIAL_CATEGORIES } from "@/lib/constants";
import FileUpload from "@/components/admin/FileUpload";
import type { Special } from "@/types";

interface Props { special?: Special; }

export default function SpecialForm({ special }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("saving");
    setError("");
    const result = await adminUpsertSpecial(new FormData(e.currentTarget));
    if (result.success) { router.push("/admin/specials"); router.refresh(); }
    else { setStatus("error"); setError(result.error || "Failed to save."); }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      {special && <input type="hidden" name="id" value={special.id} />}

      <div>
        <label className="block text-sm font-semibold text-fg mb-1">Title *</label>
        <input name="title" defaultValue={special?.title} required className="input-base" placeholder="Whole Beef Brisket" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-fg mb-1">Price *</label>
          <input name="price" defaultValue={special?.price} required className="input-base" placeholder="$2.99/lb" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-fg mb-1">Original Price</label>
          <input name="original_price" defaultValue={special?.original_price ?? ""} className="input-base" placeholder="$4.99/lb" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-fg mb-1">Category *</label>
        <select name="category" defaultValue={special?.category} required className="input-base">
          <option value="">Select category...</option>
          {SPECIAL_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-fg mb-1">Product Image</label>
        <FileUpload
          bucket="specials-images"
          accept="image/jpeg,image/png,image/webp"
          urlFieldName="image_url"
          existingUrl={special?.image_url}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-fg mb-1">Valid From *</label>
          <input type="date" name="valid_from" defaultValue={special?.valid_from?.split("T")[0]} required className="input-base" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-fg mb-1">Valid To *</label>
          <input type="date" name="valid_to" defaultValue={special?.valid_to?.split("T")[0]} required className="input-base" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-fg mb-1">Disclaimer</label>
        <input name="disclaimer" defaultValue={special?.disclaimer ?? ""} className="input-base" placeholder="While Supplies Last" />
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" name="is_active" value="true" defaultChecked={special?.is_active ?? true} className="rounded border-border text-brand focus:ring-brand" />
        <span className="text-sm font-semibold text-fg">Active</span>
      </label>

      {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={status === "saving"} className="btn-primary disabled:opacity-60">
          {status === "saving" ? "Saving..." : special ? "Update Special" : "Create Special"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-secondary">Cancel</button>
      </div>
    </form>
  );
}
