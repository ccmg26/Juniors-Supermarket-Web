"use client";

import { useState } from "react";
import { submitLeasing } from "@/lib/actions";
import { STORE_LOCATION_NAMES } from "@/lib/constants";
import FormField from "@/components/ui/FormField";

export default function LeasingForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const result = await submitLeasing(fd);
    if (result.success) {
      setStatus("success");
      setMessage("Thank you! We'll be in touch within 1-2 business days.");
    } else {
      setStatus("error");
      setMessage(result.error || "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-10">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="font-black text-fg text-xl mb-2">Inquiry Received!</h3>
        <p className="text-muted-fg">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Full Name" name="name" required placeholder="John Smith" />
      <FormField label="Email Address" name="email" type="email" required placeholder="john@example.com" />
      <FormField label="Phone Number" name="phone" type="tel" required placeholder="(956) 555-0123" />
      <FormField label="Preferred Location" name="preferred_location" as="select" required>
        <option value="">Select a location...</option>
        {STORE_LOCATION_NAMES.map((loc) => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
        <option value="Multiple Locations">Multiple Locations</option>
        <option value="Any Location">Any Location</option>
      </FormField>
      <FormField
        label="Tell Us About Your Business"
        name="message"
        as="textarea"
        required
        placeholder="Describe your business, the type of space you need, square footage requirements, etc."
        rows={5}
      />
      {status === "error" && (
        <p role="alert" className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {message}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full text-base py-3.5 disabled:opacity-60"
      >
        {status === "loading" ? "Submitting…" : "Submit Leasing Inquiry"}
      </button>
    </form>
  );
}
