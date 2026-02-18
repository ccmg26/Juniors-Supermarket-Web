"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminUpsertJob } from "@/lib/actions";
import type { Job } from "@/types";

interface Props { job?: Job; }
export default function JobForm({ job }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("saving");
    const result = await adminUpsertJob(new FormData(e.currentTarget));
    if (result.success) { router.push("/admin/jobs"); router.refresh(); }
    else { setStatus("error"); setError(result.error || "Failed to save."); }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      {job && <input type="hidden" name="id" value={job.id} />}
      <div>
        <label className="block text-sm font-semibold text-brand-black mb-1">Job Title *</label>
        <input name="title" defaultValue={job?.title} required className="input-base" placeholder="Meat Cutter" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-brand-black mb-1">Department *</label>
          <input name="department" defaultValue={job?.department} required className="input-base" placeholder="Meat Market" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-black mb-1">Location *</label>
          <input name="location" defaultValue={job?.location} required className="input-base" placeholder="All Locations" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-brand-black mb-1">Job Type *</label>
        <select name="type" defaultValue={job?.type ?? "Full-Time"} required className="input-base">
          <option>Full-Time</option>
          <option>Part-Time</option>
          <option>Seasonal</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-brand-black mb-1">Description</label>
        <textarea name="description" defaultValue={job?.description} rows={4} className="input-base" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-brand-black mb-1">Paycom Application URL *</label>
        <input name="paycom_url" defaultValue={job?.paycom_url} required className="input-base" placeholder="https://www.paycomonline.net/..." />
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" name="is_active" value="true" defaultChecked={job?.is_active ?? true} className="rounded border-gray-300 text-brand-red focus:ring-brand-red" />
        <span className="text-sm font-semibold text-brand-black">Active (shown on website)</span>
      </label>
      {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={status === "saving"} className="btn-primary disabled:opacity-60">
          {status === "saving" ? "Saving..." : job ? "Update Job" : "Create Job"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-secondary">Cancel</button>
      </div>
    </form>
  );
}
