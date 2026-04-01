"use client";

import Link from "next/link";
import { useTransition } from "react";
import { adminSetWeeklyAdStatus, adminDeleteWeeklyAd } from "@/lib/actions";
import DeleteButton from "@/components/admin/DeleteButton";

interface Props {
  ad: { id: string; title: string };
  currentStatus: string;
}

export default function WeeklyAdActions({ ad, currentStatus }: Props) {
  const [pending, startTransition] = useTransition();

  function setStatus(status: string) {
    startTransition(async () => {
      await adminSetWeeklyAdStatus(ad.id, status);
    });
  }

  return (
    <div className="flex items-center gap-3 justify-end flex-wrap">
      {/* Publish */}
      {currentStatus !== "published" && (
        <button
          onClick={() => setStatus("published")}
          disabled={pending}
          className="text-xs font-semibold text-green-600 hover:text-green-800 disabled:opacity-50"
        >
          Publish
        </button>
      )}
      {/* Archive */}
      {currentStatus === "published" && (
        <button
          onClick={() => setStatus("archived")}
          disabled={pending}
          className="text-xs font-semibold text-muted-fg hover:text-fg disabled:opacity-50"
        >
          Archive
        </button>
      )}
      {/* Draft */}
      {currentStatus !== "draft" && currentStatus !== "published" && (
        <button
          onClick={() => setStatus("draft")}
          disabled={pending}
          className="text-xs font-semibold text-muted-fg hover:text-fg disabled:opacity-50"
        >
          Draft
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
