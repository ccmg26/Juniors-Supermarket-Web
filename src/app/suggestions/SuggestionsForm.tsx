"use client";

import { useState } from "react";
import { submitSuggestion } from "@/lib/actions";
import FormField from "@/components/ui/FormField";

export default function SuggestionsForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const result = await submitSuggestion(fd);
    if (result.success) {
      setStatus("success");
      setMessage("Thank you! We appreciate your feedback and will review it shortly.");
    } else {
      setStatus("error");
      setMessage(result.error || "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-10">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="font-black text-fg text-xl mb-2">Feedback Received!</h3>
        <p className="text-muted-fg">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Type */}
      <div>
        <label className="block text-sm font-semibold text-fg mb-2">
          Type of Feedback <span className="text-brand">*</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {["Product Request", "Suggestion", "Concern"].map((type) => (
            <label key={type} className="relative">
              <input type="radio" name="type" value={type} required className="sr-only peer" />
              {/* hover:border-brand/50 gives visible hover feedback; was hover:border-border (no change ❌) */}
              <div className="border-2 border-border peer-checked:border-brand peer-checked:bg-brand/5 rounded-xl p-3 text-center cursor-pointer transition-all hover:border-brand/50">
                <p className="text-sm font-semibold text-fg">{type}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Your Name" name="name" required placeholder="Maria Lopez" />
        <FormField label="Email Address" name="email" type="email" required placeholder="maria@example.com" />
      </div>

      <FormField label="Phone (Optional)" name="phone" type="tel" placeholder="(956) 555-0123" />

      <FormField
        label="Your Message"
        name="message"
        as="textarea"
        required
        placeholder="Tell us about your product request, suggestion, or concern..."
        rows={5}
      />

      {/* Image upload */}
      <div>
        <label htmlFor="image" className="block text-sm font-semibold text-fg mb-1.5">
          Attach an Image (Optional)
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-card file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand/10 file:text-brand hover:file:bg-brand/20"
        />
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {message}
        </p>
      )}

      <button type="submit" className="btn-primary w-full text-base py-3.5">
        Submit Feedback
      </button>
    </form>
  );
}
