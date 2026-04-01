"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { adminToggleSpecial, adminDuplicateSpecial, adminDeleteSpecial } from "@/lib/actions";
import DeleteButton from "@/components/admin/DeleteButton";

interface Props {
  special: { id: string; title: string; is_active: boolean; is_featured?: boolean };
}

export default function SpecialActions({ special }: Props) {
  const [pending, startTransition] = useTransition();
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [actionErr, setActionErr] = useState("");

  function toggle(field: "is_active" | "is_featured", value: boolean) {
    setActionErr("");
    setActiveAction(field);
    startTransition(async () => {
      const result = await adminToggleSpecial(special.id, field, value);
      if (result?.error) setActionErr(result.error);
      setActiveAction(null);
    });
  }

  function duplicate() {
    setActionErr("");
    setActiveAction("duplicate");
    startTransition(async () => {
      const result = await adminDuplicateSpecial(special.id);
      if (result?.error) setActionErr(result.error);
      setActiveAction(null);
    });
  }

  const isLoading = (key: string) => pending && activeAction === key;

  return (
    <div className="flex items-center gap-3 justify-end flex-wrap">
      {actionErr && (
        <span className="text-xs text-red-600">{actionErr}</span>
      )}

      <button
        onClick={() => toggle("is_active", !special.is_active)}
        disabled={pending}
        className={
          "text-xs font-semibold disabled:opacity-50 " +
          (special.is_active
            ? "text-muted-fg hover:text-fg"
            : "text-green-600 hover:text-green-800")
        }
      >
        {isLoading("is_active") ? "…" : special.is_active ? "Deactivate" : "Activate"}
      </button>

      <button
        onClick={() => toggle("is_featured", !special.is_featured)}
        disabled={pending}
        className={
          "text-xs font-semibold disabled:opacity-50 " +
          (special.is_featured
            ? "text-yellow-600 hover:text-yellow-800"
            : "text-muted-fg hover:text-fg")
        }
      >
        {isLoading("is_featured") ? "…" : special.is_featured ? "Unfeature" : "Feature"}
      </button>

      <button
        onClick={duplicate}
        disabled={pending}
        className="text-xs font-semibold text-muted-fg hover:text-fg disabled:opacity-50"
      >
        {isLoading("duplicate") ? "Copying…" : "Duplicate"}
      </button>

      <Link
        href={"/admin/specials/" + special.id}
        className="text-xs font-semibold text-brand hover:underline"
      >
        Edit
      </Link>

      <DeleteButton
        action={() => adminDeleteSpecial(special.id)}
        label="this special"
        size="sm"
      />
    </div>
  );
}
