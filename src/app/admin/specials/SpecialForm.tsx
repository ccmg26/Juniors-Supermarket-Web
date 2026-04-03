"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminUpsertSpecial } from "@/lib/actions";
import { SPECIAL_CATEGORIES } from "@/lib/constants";
import FileUpload from "@/components/admin/FileUpload";
import Toast from "@/components/admin/Toast";
import type { Special } from "@/types";

interface Props { special?: Special; }

export default function SpecialForm({ special }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [validFrom, setValidFrom] = useState(special?.valid_from?.split("T")[0] ?? "");
  const [validTo, setValidTo] = useState(special?.valid_to?.split("T")[0] ?? "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setToast(null);
    const result = await adminUpsertSpecial(new FormData(e.currentTarget));
    if (result.success) {
      setToast({ msg: special ? "Special updated successfully." : "Special created successfully.", type: "success" });
      setTimeout(() => { router.push("/admin/specials"); router.refresh(); }, 1200);
    } else {
      setToast({ msg: result.error ?? "Failed to save.", type: "error" });
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      {special && <input type="hidden" name="id" value={special.id} />}

      {toast && (
        <Toast message={toast.msg} type={toast.type} onDismiss={() => setToast(null)} />
      )}

      {/* ── Core Info ── */}
      <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
        <h3 className="font-bold text-fg text-sm uppercase tracking-wider">Product Info</h3>

        <div>
          <label className="block text-sm font-semibold text-fg mb-1">Title *</label>
          <input
            name="title"
            defaultValue={special?.title}
            required
            className="input-base"
            placeholder="Whole Beef Brisket"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-fg mb-1">Price *</label>
            <input
              name="price"
              defaultValue={special?.price}
              required
              className="input-base"
              placeholder="$2.99/lb"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-fg mb-1">Original Price</label>
            <input
              name="original_price"
              defaultValue={special?.original_price ?? ""}
              className="input-base"
              placeholder="$4.99/lb"
            />
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
          <label className="block text-sm font-semibold text-fg mb-1">Disclaimer</label>
          <input
            name="disclaimer"
            defaultValue={special?.disclaimer ?? ""}
            className="input-base"
            placeholder="While Supplies Last"
          />
        </div>
      </div>

      {/* ── Image ── */}
      <div className="bg-card rounded-2xl border border-border p-5 space-y-3">
        <h3 className="font-bold text-fg text-sm uppercase tracking-wider">Product Image</h3>
        <FileUpload
          bucket="specials-images"
          accept="image/jpeg,image/png,image/webp"
          urlFieldName="image_url"
          existingUrl={special?.image_url}
        />
      </div>

      {/* ── Dates ── */}
      <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
        <h3 className="font-bold text-fg text-sm uppercase tracking-wider">Valid Dates</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-fg mb-1">Valid From *</label>
            <input
              type="date"
              name="valid_from"
              value={validFrom}
              onChange={(e) => setValidFrom(e.target.value)}
              required
              className="input-base"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-fg mb-1">Valid To *</label>
            <input
              type="date"
              name="valid_to"
              value={validTo}
              onChange={(e) => setValidTo(e.target.value)}
              required
              className="input-base"
            />
          </div>
        </div>
        {validFrom && validTo && new Date(validFrom) > new Date(validTo) && (
          <p role="alert" className="text-xs text-red-600">End date must be after start date.</p>
        )}
      </div>

      {/* ── Options ── */}
      <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
        <h3 className="font-bold text-fg text-sm uppercase tracking-wider">Options</h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-border hover:bg-muted/50">
            <input
              type="checkbox"
              name="is_active"
              value="true"
              defaultChecked={special?.is_active ?? true}
              className="rounded border-border text-brand focus:ring-brand"
            />
            <div>
              <p className="text-sm font-semibold text-fg">Active</p>
              <p className="text-xs text-muted-fg">Visible on website</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-border hover:bg-muted/50">
            <input
              type="checkbox"
              name="is_featured"
              value="true"
              defaultChecked={special?.is_featured ?? false}
              className="rounded border-border text-brand focus:ring-brand"
            />
            <div>
              <p className="text-sm font-semibold text-fg">Featured</p>
              <p className="text-xs text-muted-fg">Shown in Top Deals</p>
            </div>
          </label>
        </div>

        <div>
          <label className="block text-sm font-semibold text-fg mb-1">Sort Order</label>
          <input
            type="number"
            name="sort_order"
            defaultValue={special?.sort_order ?? 0}
            min={0}
            className="input-base w-32"
            placeholder="0"
          />
          <p className="text-xs text-muted-fg mt-1">Lower numbers appear first.</p>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Saving…" : special ? "Update Special" : "Create Special"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
}
