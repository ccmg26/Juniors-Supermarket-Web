"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/admin/FileUpload";
import { adminPublishWeeklyAd } from "@/lib/actions";
import { getWednesdayAdWeek } from "@/lib/weekly-ad";

export default function QuickUploadPage() {
  const router = useRouter();
  const { from, to } = getWednesdayAdWeek();

  const [validFrom, setValidFrom] = useState(from);
  const [validTo,   setValidTo]   = useState(to);
  const [fileUrl,   setFileUrl]   = useState("");
  const [status,    setStatus]    = useState<"idle" | "publishing" | "done" | "error">("idle");
  const [error,     setError]     = useState("");

  async function handlePublish() {
    if (!fileUrl) { setError("Please upload a photo or PDF first."); return; }
    setStatus("publishing");
    setError("");

    const fd = new FormData();
    fd.set("file_url",   fileUrl);
    fd.set("valid_from", validFrom);
    fd.set("valid_to",   validTo);

    const result = await adminPublishWeeklyAd(fd);
    if (result.success) {
      setStatus("done");
      setTimeout(() => router.push("/admin/weekly-ads"), 2000);
    } else {
      setStatus("error");
      setError(result.error || "Something went wrong.");
    }
  }

  if (status === "done") {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <div className="text-7xl mb-5">✅</div>
        <h2 className="text-3xl font-black text-fg mb-2">Published!</h2>
        <p className="text-muted-fg text-lg">This week&apos;s ad is now live on the website.</p>
        <p className="text-sm text-muted-fg mt-3">Redirecting you now…</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-5 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-fg">Quick Publish</h1>
        <p className="text-muted-fg mt-1">
          Publish this week&apos;s ad in 3 easy steps — works great from your phone.
        </p>
      </div>

      {/* ── Step 1: Dates ── */}
      <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
        <div className="flex items-center gap-3">
          <Step n={1} done={!!(validFrom && validTo)} />
          <div>
            <h2 className="font-bold text-fg text-base">Set the Week</h2>
            <p className="text-xs text-muted-fg">Pre-filled Wednesday through Tuesday.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-muted-fg uppercase tracking-wider mb-1.5 block">
              From
            </label>
            <input
              type="date"
              value={validFrom}
              onChange={(e) => setValidFrom(e.target.value)}
              className="input-base"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-fg uppercase tracking-wider mb-1.5 block">
              To
            </label>
            <input
              type="date"
              value={validTo}
              onChange={(e) => setValidTo(e.target.value)}
              className="input-base"
            />
          </div>
        </div>
      </div>

      {/* ── Step 2: Upload ── */}
      <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
        <div className="flex items-center gap-3">
          <Step n={2} done={!!fileUrl} />
          <div>
            <h2 className="font-bold text-fg text-base">Upload the Ad</h2>
            <p className="text-xs text-muted-fg">Tap to upload the PNG from your phone or computer.</p>
          </div>
        </div>
        <FileUpload
          bucket="weekly-ads"
          accept="image/png"
          urlFieldName="ad_file_hidden"
          onUrlChange={(url) => { setFileUrl(url); setError(""); }}
        />
      </div>

      {/* ── Step 3: Publish ── */}
      <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
        <div className="flex items-center gap-3">
          <Step n={3} done={false} />
          <div>
            <h2 className="font-bold text-fg text-base">Go Live</h2>
            <p className="text-xs text-muted-fg">
              Replaces the current active ad immediately across the website.
            </p>
          </div>
        </div>

        {error && (
          <p role="alert" className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        <button
          onClick={handlePublish}
          disabled={status === "publishing" || !fileUrl}
          className="btn-primary w-full text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "publishing" ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Publishing…
            </span>
          ) : (
            "🚀  Publish This Week's Ad"
          )}
        </button>
      </div>
    </div>
  );
}

function Step({ n, done }: { n: number; done: boolean }) {
  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shrink-0 transition-colors ${
        done ? "bg-green-500 text-white" : "bg-brand text-brand-fg"
      }`}
    >
      {done ? "✓" : n}
    </div>
  );
}
