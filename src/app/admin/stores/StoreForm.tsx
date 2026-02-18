"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminUpsertStore } from "@/lib/actions";
import { STORE_SERVICES } from "@/lib/constants";
import type { Store } from "@/types";

interface Props {
  store?: Store;
}

export default function StoreForm({ store }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("saving");
    setError("");
    const fd = new FormData(e.currentTarget);
    const result = await adminUpsertStore(fd);
    if (result.success) {
      router.push("/admin/stores");
      router.refresh();
    } else {
      setStatus("error");
      setError(result.error || "Failed to save store.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      {store && <input type="hidden" name="id" value={store.id} />}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-brand-black mb-1">Store Name *</label>
          <input name="name" defaultValue={store?.name} required className="input-base" placeholder="Edinburg University" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-black mb-1">Slug *</label>
          <input name="slug" defaultValue={store?.slug} required className="input-base" placeholder="edinburg-university" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-brand-black mb-1">Street Address *</label>
        <input name="address" defaultValue={store?.address} required className="input-base" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-brand-black mb-1">City *</label>
          <input name="city" defaultValue={store?.city} required className="input-base" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-black mb-1">State *</label>
          <input name="state" defaultValue={store?.state ?? "TX"} required className="input-base" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-black mb-1">ZIP *</label>
          <input name="zip" defaultValue={store?.zip} required className="input-base" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-brand-black mb-1">Phone *</label>
          <input name="phone" defaultValue={store?.phone} required className="input-base" placeholder="(956) 000-0000" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-black mb-1">Hours</label>
          <input name="hours" defaultValue={store?.hours ?? "Open Daily 7:00 AM – 10:00 PM"} className="input-base" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-brand-black mb-1">Google Maps URL</label>
        <input name="google_maps_url" defaultValue={store?.google_maps_url} className="input-base" placeholder="https://maps.google.com/..." />
      </div>

      <div>
        <label className="block text-sm font-semibold text-brand-black mb-2">Services</label>
        <div className="flex flex-wrap gap-2">
          {STORE_SERVICES.map((svc) => (
            <label key={svc} className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                name="services"
                value={svc}
                defaultChecked={store?.services?.includes(svc) ?? true}
                className="rounded border-gray-300 text-brand-red focus:ring-brand-red"
              />
              <span className="text-sm text-brand-black">{svc}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="ebt_wic"
            value="true"
            defaultChecked={store?.ebt_wic ?? true}
            className="rounded border-gray-300 text-brand-red focus:ring-brand-red"
          />
          <span className="text-sm font-semibold text-brand-black">EBT/WIC Accepted</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="is_active"
            value="true"
            defaultChecked={store?.is_active ?? true}
            className="rounded border-gray-300 text-brand-red focus:ring-brand-red"
          />
          <span className="text-sm font-semibold text-brand-black">Active</span>
        </label>
      </div>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={status === "saving"} className="btn-primary disabled:opacity-60">
          {status === "saving" ? "Saving..." : store ? "Update Store" : "Create Store"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
}
