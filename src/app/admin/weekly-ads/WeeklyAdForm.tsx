"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminUpsertWeeklyAd } from "@/lib/actions";
import FileUpload from "@/components/admin/FileUpload";
import type { WeeklyAd } from "@/types";

interface Props {
  ad?: WeeklyAd;
}

export default function WeeklyAdForm({ ad }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("saving");
    setError("");
    const fd = new FormData(e.currentTarget);
    const result = await adminUpsertWeeklyAd(fd);
    if (result.success) {
      router.push("/admin/weekly-ads");
      router.refresh();
    } else {
      setStatus("error");
      setError(result.error || "Failed to save.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
      {ad && <input type="hidden" name="id" value={ad.id} />}

      <div>
        <label className="block text-sm font-semibold text-fg mb-1">Ad Title *</label>
        <input name="title" defaultValue={ad?.title} required className="input-base" placeholder="Week of Jan 1 – Jan 7" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-fg mb-1">Valid From *</label>
          <input type="date" name="valid_from" defaultValue={ad?.valid_from?.split("T")[0]} required className="input-base" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-fg mb-1">Valid To *</label>
          <input type="date" name="valid_to" defaultValue={ad?.valid_to?.split("T")[0]} required className="input-base" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-fg mb-1">Weekly Ad PDF *</label>
        <FileUpload
          bucket="weekly-ads"
          accept="application/pdf"
          urlFieldName="pdf_url"
          existingUrl={ad?.pdf_url}
        />
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          name="is_active"
          value="true"
          defaultChecked={ad?.is_active ?? true}
          className="rounded border-border text-brand focus:ring-brand"
        />
        <span className="text-sm font-semibold text-fg">Set as Active (shown on website)</span>
      </label>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={status === "saving"} className="btn-primary disabled:opacity-60">
          {status === "saving" ? "Saving..." : ad ? "Update Ad" : "Create Ad"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-secondary">Cancel</button>
      </div>
    </form>
  );
}
