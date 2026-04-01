"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminUpsertWeeklyAd } from "@/lib/actions";
import FileUpload from "@/components/admin/FileUpload";
import Toast from "@/components/admin/Toast";
import type { WeeklyAd, WeeklyAdStatus } from "@/types";

interface Props {
  ad?: WeeklyAd;
}

const STATUS_OPTIONS: { value: WeeklyAdStatus; label: string; description: string }[] = [
  { value: "draft",     label: "Draft",     description: "Saved but not visible on website" },
  { value: "published", label: "Published", description: "Live on website — replaces any current ad" },
  { value: "archived",  label: "Archived",  description: "Hidden from website, kept for records" },
];

export default function WeeklyAdForm({ ad }: Props) {
  const router = useRouter();
  const [saving,   setSaving]   = useState(false);
  const [toast,    setToast]    = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [status,   setStatus]   = useState<WeeklyAdStatus>(
    (ad?.status as WeeklyAdStatus) ?? "published"
  );

  // Auto-generate title from dates
  const [autoTitle, setAutoTitle] = useState(!ad);
  const [validFrom, setValidFrom] = useState(ad?.valid_from?.split("T")[0] ?? "");
  const [validTo,   setValidTo]   = useState(ad?.valid_to?.split("T")[0] ?? "");

  function buildAutoTitle(from: string, to: string) {
    if (!from || !to) return "";
    const fmt = (d: string) =>
      new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return "Week of " + fmt(from) + " \u2013 " + fmt(to);
  }

  const titleValue = autoTitle ? buildAutoTitle(validFrom, validTo) : (ad?.title ?? "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setToast(null);
    const fd = new FormData(e.currentTarget);
    if (autoTitle) fd.set("title", buildAutoTitle(validFrom, validTo));
    const result = await adminUpsertWeeklyAd(fd);
    if (result.success) {
      setToast({ msg: ad ? "Ad updated successfully." : "Ad created successfully.", type: "success" });
      setTimeout(() => { router.push("/admin/weekly-ads"); router.refresh(); }, 1200);
    } else {
      setToast({ msg: result.error ?? "Failed to save.", type: "error" });
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      {ad && <input type="hidden" name="id" value={ad.id} />}

      {toast && (
        <Toast
          message={toast.msg}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}

      {/* ── Dates ── */}
      <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
        <h3 className="font-bold text-fg text-sm uppercase tracking-wider">Ad Dates</h3>
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
          <p className="text-xs text-red-600">End date must be after start date.</p>
        )}
      </div>

      {/* ── Title ── */}
      <div className="bg-card rounded-2xl border border-border p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-fg text-sm uppercase tracking-wider">Ad Title</h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoTitle}
              onChange={(e) => setAutoTitle(e.target.checked)}
              className="rounded border-border text-brand focus:ring-brand"
            />
            <span className="text-xs text-muted-fg">Auto-generate from dates</span>
          </label>
        </div>
        <input
          name="title"
          value={titleValue}
          onChange={(e) => { if (!autoTitle) { /* allow manual editing */ } }}
          readOnly={autoTitle}
          required
          className={"input-base " + (autoTitle ? "bg-muted text-muted-fg cursor-not-allowed" : "")}
          placeholder="Week of Jan 1 – Jan 7"
        />
      </div>

      {/* ── PDF Upload ── */}
      <div className="bg-card rounded-2xl border border-border p-5 space-y-3">
        <h3 className="font-bold text-fg text-sm uppercase tracking-wider">
          Weekly Ad File *
        </h3>
        <p className="text-xs text-muted-fg">Upload the weekly ad as a PDF or image (JPG/PNG/WebP).</p>
        <FileUpload
          bucket="weekly-ads"
          accept="application/pdf,image/jpeg,image/png,image/webp"
          urlFieldName="pdf_url"
          existingUrl={ad?.pdf_url}
        />
      </div>

      {/* ── Mobile Image (optional) ── */}
      <div className="bg-card rounded-2xl border border-border p-5 space-y-3">
        <h3 className="font-bold text-fg text-sm uppercase tracking-wider">
          Mobile Image <span className="text-muted-fg font-normal normal-case">(optional)</span>
        </h3>
        <p className="text-xs text-muted-fg">
          A mobile-friendly image version of the ad (shown instead of PDF on phones).
        </p>
        <FileUpload
          bucket="weekly-ads"
          accept="image/jpeg,image/png,image/webp"
          urlFieldName="mobile_image_url"
          existingUrl={ad?.mobile_image_url}
        />
      </div>

      {/* ── Status ── */}
      <div className="bg-card rounded-2xl border border-border p-5 space-y-3">
        <h3 className="font-bold text-fg text-sm uppercase tracking-wider">Status</h3>
        <input type="hidden" name="status" value={status} />
        <div className="space-y-2">
          {STATUS_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={"flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all " +
                (status === opt.value
                  ? "border-brand bg-brand/5"
                  : "border-border hover:bg-muted/50")}
            >
              <input
                type="radio"
                name="status_radio"
                value={opt.value}
                checked={status === opt.value}
                onChange={() => setStatus(opt.value)}
                className="mt-0.5 text-brand focus:ring-brand"
              />
              <div>
                <p className="text-sm font-semibold text-fg">{opt.label}</p>
                <p className="text-xs text-muted-fg">{opt.description}</p>
              </div>
            </label>
          ))}
        </div>
        {status === "published" && !ad && (
          <p className="text-xs text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
            Publishing this ad will automatically archive the current live ad.
          </p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="btn-primary disabled:opacity-60"
        >
          {saving ? "Saving…" : ad ? "Update Ad" : "Create Ad"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
