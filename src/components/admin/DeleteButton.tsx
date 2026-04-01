"use client";

import { useState, useTransition } from "react";

interface Props {
  /** Server action to call on confirm. Must return { success?: boolean; error?: string } */
  action: () => Promise<{ success?: boolean; error?: string }>;
  /** What is being deleted (shown in the confirmation prompt) */
  label?: string;
  /** Optional callback after successful deletion */
  onDeleted?: () => void;
  size?: "sm" | "md";
}

/**
 * Inline confirm-then-delete button.
 * Shows "Delete" → expands to "Are you sure? Yes / No" on click.
 */
export default function DeleteButton({ action, label = "this item", onDeleted, size = "sm" }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    setError("");
    startTransition(async () => {
      const result = await action();
      if (result.success) {
        onDeleted?.();
      } else {
        setError(result.error ?? "Delete failed.");
        setConfirming(false);
      }
    });
  }

  const textSm = size === "sm" ? "text-xs" : "text-sm";

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-2">
        <span className={`${textSm} text-muted-fg`}>Delete {label}?</span>
        <button
          type="button"
          onClick={handleDelete}
          disabled={pending}
          className={`${textSm} font-semibold text-red-600 hover:text-red-800 disabled:opacity-50`}
        >
          {pending ? "Deleting…" : "Yes"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          disabled={pending}
          className={`${textSm} font-semibold text-muted-fg hover:text-fg`}
        >
          No
        </button>
        {error && <span className={`${textSm} text-red-600`}>{error}</span>}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className={`${textSm} font-semibold text-red-500 hover:text-red-700`}
    >
      Delete
    </button>
  );
}
