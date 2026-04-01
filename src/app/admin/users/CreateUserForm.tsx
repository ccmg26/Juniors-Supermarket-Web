"use client";

import { useState } from "react";
import { adminCreateUser } from "@/lib/actions";

export default function CreateUserForm({ onCreated }: { onCreated: () => void }) {
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [error,  setError]  = useState("");
  const [show,   setShow]   = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("saving");
    setError("");

    const result = await adminCreateUser(new FormData(e.currentTarget));

    if (result.success) {
      setStatus("done");
      (e.target as HTMLFormElement).reset();
      onCreated();
    } else {
      setStatus("error");
      setError(result.error || "Failed to create account.");
    }
  }

  return (
    <div className="bg-card rounded-2xl border border-border p-6 space-y-4 max-w-md">
      <h2 className="font-bold text-fg text-base">Create New Admin Account</h2>
      <p className="text-sm text-muted-fg">
        The new user can log in at <code className="bg-muted px-1.5 py-0.5 rounded text-xs">/admin/login</code> with these credentials.
      </p>

      {status === "done" && (
        <p className="text-green-700 text-sm bg-green-50 border border-green-200 rounded-lg px-4 py-3">
          ✅ Account created. They can log in now.
        </p>
      )}
      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-semibold text-fg mb-1">Email *</label>
          <input
            name="email"
            type="email"
            required
            placeholder="developer@example.com"
            className="input-base"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-fg mb-1">Password *</label>
          <div className="relative">
            <input
              name="password"
              type={show ? "text" : "password"}
              required
              minLength={8}
              placeholder="Minimum 8 characters"
              className="input-base pr-16"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-fg hover:text-fg font-medium"
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={status === "saving"}
          className="btn-primary disabled:opacity-60"
        >
          {status === "saving" ? "Creating…" : "Create Account"}
        </button>
      </form>
    </div>
  );
}
