"use client";

import Link from "next/link";
import { useTransition } from "react";
import { adminToggleSpecial, adminDuplicateSpecial, adminDeleteSpecial } from "@/lib/actions";
import DeleteButton from "@/components/admin/DeleteButton";

interface Props {
  special: { id: string; title: string; is_active: boolean; is_featured?: boolean };
}

export default function SpecialActions({ special }: Props) {
  const [pending, startTransition] = useTransition();

  function toggle(field: "is_active" | "is_featured", value: boolean) {
    startTransition(async () => {
      await adminToggleSpecial(special.id, field, value);
    });
  }

  function duplicate() {
    startTransition(async () => {
      await adminDuplicateSpecial(special.id);
    });
  }

  return (
    <div className="flex items-center gap-3 justify-end flex-wrap">
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
        {special.is_active ? "Deactivate" : "Activate"}
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
        {special.is_featured ? "Unfeature" : "Feature"}
      </button>

      <button
        onClick={duplicate}
        disabled={pending}
        className="text-xs font-semibold text-muted-fg hover:text-fg disabled:opacity-50"
      >
        Duplicate
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
