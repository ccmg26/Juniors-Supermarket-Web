"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { adminSetWeeklyAdStatus, adminDeleteWeeklyAd } from "@/lib/actions";
import DeleteButton from "@/components/admin/DeleteButton";

interface Props {
  ad: { id: string; title: string };
  currentStatus: string;
}

export default function WeeklyAdActions({ ad, currentStatus }: Props) {
  const [pending, startTransition] = useTransition();
  const [actionErr, setActionErr] = useState("");

  function setStatus(status: string) {
    setActionErr("");
    startTransition(async () => {
      const result = await adminSetWeeklyAdStatus(ad.id, status);
      if (result?.error) setActionErr(result.error);
    });
  }

  return (
    <div className="flex items-center gap-3 justify-end flex-wrap">
      {actionErr && (
        <span className="text-xs text-red-600">{actionErr}</span>
      )}

      {/* Publish */}
      {currentStatus !== "published" && (
        <button
          onClick={() => setStatus("published")}
          disabled={pending}
          className="text-xs font-semibold text-green-600 hover:text-green-800 disabled:opacity-50"
        >
          {pending ? "…" : "Publish"}
        </button>
      )}
      {/* Archive */}
      {currentStatus === "published" && (
        <button
          onClick={() => setStatus("archived")}
          disabled={pending}
          className="text-xs font-semibold text-muted-fg hover:text-fg disabled:opacity-50"
        >
          {pending ? "…" : "Archive"}
        </button>
      )}
      {/* Draft — only for archived/scheduled; published has Archive button instead */}
      {currentStatus !== "draft" && currentStatus !== "published" && (
        <button
          onClick={() => setStatus("draft")}
          disabled={pending}
          className="text-xs font-semibold text-muted-fg hover:text-fg disabled:opacity-50"
        >
          {pending ? "…" : "Draft"}
        </button>
      )}

      <Link
        href={"/admin/weekly-ads/" + ad.id}
        className="text-xs font-semibold text-brand hover:underline"
      >
        Edit
      </Link>

      <DeleteButton
        action={() => adminDeleteWeeklyAd(ad.id)}
        label="this ad"
        size="sm"
      />
    </div>
  );
}
