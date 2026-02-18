"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminUpsertEvent } from "@/lib/actions";
import type { Event } from "@/types";

interface Props { event?: Event; }
export default function EventForm({ event }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("saving");
    const result = await adminUpsertEvent(new FormData(e.currentTarget));
    if (result.success) { router.push("/admin/events"); router.refresh(); }
    else { setStatus("error"); setError(result.error || "Failed to save."); }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      {event && <input type="hidden" name="id" value={event.id} />}

      <div>
        <label className="block text-sm font-semibold text-fg mb-1">Event Title *</label>
        <input name="title" defaultValue={event?.title} required className="input-base" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-fg mb-1">Description *</label>
        <textarea name="description" defaultValue={event?.description} required rows={4} className="input-base" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-fg mb-1">Image URL</label>
        <input name="image_url" defaultValue={event?.image_url ?? ""} className="input-base" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-fg mb-1">Start Date *</label>
          <input type="date" name="start_date" defaultValue={event?.start_date?.split("T")[0]} required className="input-base" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-fg mb-1">End Date *</label>
          <input type="date" name="end_date" defaultValue={event?.end_date?.split("T")[0]} required className="input-base" />
        </div>
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="is_featured" value="true" defaultChecked={event?.is_featured ?? false} className="rounded border-border text-brand focus:ring-brand" />
          <span className="text-sm font-semibold text-fg">Featured</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="is_active" value="true" defaultChecked={event?.is_active ?? true} className="rounded border-border text-brand focus:ring-brand" />
          <span className="text-sm font-semibold text-fg">Active</span>
        </label>
      </div>
      {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={status === "saving"} className="btn-primary disabled:opacity-60">
          {status === "saving" ? "Saving..." : event ? "Update Event" : "Create Event"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-secondary">Cancel</button>
      </div>
    </form>
  );
}
