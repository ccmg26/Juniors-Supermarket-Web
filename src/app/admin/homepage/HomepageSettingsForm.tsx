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

      {/* ── Site-wide Promo Banner ── */}
      <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
        <div>
          <h3 className="font-bold text-fg text-sm uppercase tracking-wider">Site-wide Promo Banner</h3>
          <p className="text-xs text-muted-fg mt-1">A full-width announcement bar shown above the header on every page.</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="banner_active"
            id="banner_active"
            value="true"
            defaultChecked={settings?.banner_active ?? false}
            className="w-4 h-4 accent-brand"
          />
          <label htmlFor="banner_active" className="text-sm font-semibold text-fg">
            Enable banner
          </label>
        </div>
        <div>
          <label className="block text-sm font-semibold text-fg mb-1">Banner Message</label>
          <input
            name="banner_text"
            defaultValue={settings?.banner_text ?? ""}
            className="input-base"
            placeholder="🔥 Weekly Ad Now Live — Shop the best deals of the week!"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-fg mb-1">Link URL (optional)</label>
            <input
              name="banner_link_url"
              defaultValue={settings?.banner_link_url ?? ""}
              className="input-base"
              placeholder="/weekly-ad"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-fg mb-1">Link Label (optional)</label>
            <input
              name="banner_link_label"
              defaultValue={settings?.banner_link_label ?? ""}
              className="input-base"
              placeholder="Shop Now"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-fg mb-1">Banner Color</label>
          <select name="banner_style" defaultValue={settings?.banner_style ?? "red"} className="input-base">
            <option value="red">Red (brand)</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

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
