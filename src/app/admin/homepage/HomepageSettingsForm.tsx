"use client";

import { useState } from "react";
import { adminUpsertSiteSettings } from "@/lib/actions";
import Toast from "@/components/admin/Toast";
import type { SiteSettings } from "@/types";

interface Props {
  settings: SiteSettings | null;
}

export default function HomepageSettingsForm({ settings }: Props) {
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setToast(null);
    const result = await adminUpsertSiteSettings(new FormData(e.currentTarget));
    setSaving(false);
    if (result.success) {
      setToast({ msg: "Homepage settings saved.", type: "success" });
    } else {
      setToast({ msg: result.error ?? "Failed to save.", type: "error" });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {toast && (
        <Toast message={toast.msg} type={toast.type} onDismiss={() => setToast(null)} />
      )}

      {/* ── Promo Strip ── */}
      <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
        <div>
          <h3 className="font-bold text-fg text-sm uppercase tracking-wider">Promo Strip</h3>
          <p className="text-xs text-muted-fg mt-1">The scrolling banner shown at the top of every page.</p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-fg mb-1">Message</label>
          <input
            name="promo_strip_text"
            defaultValue={settings?.promo_strip_text ?? ""}
            className="input-base"
            placeholder="🔥 Weekly Ad Now Live — Shop Big Savings This Week!"
          />
        </div>
      </div>

      {/* ── Hero Section ── */}
      <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
        <div>
          <h3 className="font-bold text-fg text-sm uppercase tracking-wider">Hero Section</h3>
          <p className="text-xs text-muted-fg mt-1">The large banner at the top of the homepage.</p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-fg mb-1">Headline</label>
          <input
            name="hero_headline"
            defaultValue={settings?.hero_headline ?? ""}
            className="input-base"
            placeholder="Fresh Food, Big Savings, Every Week."
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-fg mb-1">Subheadline</label>
          <textarea
            name="hero_subheadline"
            defaultValue={settings?.hero_subheadline ?? ""}
            rows={2}
            className="input-base resize-none"
            placeholder="Shop our latest weekly ad for the best deals on fresh produce, meat, and more."
          />
        </div>
      </div>

      {/* ── Deals Club ── */}
      <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
        <div>
          <h3 className="font-bold text-fg text-sm uppercase tracking-wider">Deals Club Section</h3>
          <p className="text-xs text-muted-fg mt-1">The email signup section on the homepage.</p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-fg mb-1">Headline</label>
          <input
            name="deals_club_headline"
            defaultValue={settings?.deals_club_headline ?? ""}
            className="input-base"
            placeholder="Join the Deals Club"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-fg mb-1">Subheadline</label>
          <textarea
            name="deals_club_subheadline"
            defaultValue={settings?.deals_club_subheadline ?? ""}
            rows={2}
            className="input-base resize-none"
            placeholder="Get exclusive deals and weekly ad previews delivered straight to your inbox."
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Saving…" : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
