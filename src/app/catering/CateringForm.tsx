"use client";

import { useState } from "react";
import { submitCatering } from "@/lib/actions";
import { STORE_LOCATION_NAMES } from "@/lib/constants";
import FormField from "@/components/ui/FormField";

const EVENT_TYPES = [
  "Birthday Party",
  "Quinceañera",
  "Wedding",
  "Baby Shower",
  "Corporate Event",
  "BBQ / Cookout",
  "Holiday Gathering",
  "Other",
];

const GUEST_COUNTS = [
  "Under 25",
  "25–50",
  "50–100",
  "100–200",
  "200–300",
  "300+",
];

export default function CateringForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const result = await submitCatering(fd);
    if (result.success) {
      setStatus("success");
      setMessage("Your catering request has been received! We'll call you within 24 hours to discuss your event.");
    } else {
      setStatus("error");
      setMessage(result.error || "Something went wrong. Please try again or call us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="font-black text-fg text-2xl mb-2">Request Received!</h3>
        <p className="text-muted-fg max-w-sm mx-auto leading-relaxed">{message}</p>
        <a href="tel:+19565864677" className="btn-primary mt-6 inline-flex">
          📞 Call Us Now
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Your Name" name="name" required placeholder="Maria García" />
        <FormField label="Phone Number" name="phone" type="tel" required placeholder="(956) 555-0123" />
      </div>
      <FormField label="Email Address" name="email" type="email" required placeholder="maria@example.com" />

      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Event Type" name="event_type" as="select" required>
          <option value="">Select event type...</option>
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </FormField>
        <FormField label="Event Date" name="event_date" type="date" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Expected Guest Count" name="guest_count" as="select">
          <option value="">Approximate guests...</option>
          {GUEST_COUNTS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </FormField>
        <FormField label="Preferred Location" name="location_preference" as="select">
          <option value="">Select a store...</option>
          {STORE_LOCATION_NAMES.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
          <option value="Multiple Locations">Multiple Locations</option>
        </FormField>
      </div>

      <FormField
        label="What Do You Need?"
        name="items"
        as="textarea"
        placeholder="E.g. carne asada, pollo, costillas, rice, tortillas — list everything you're interested in and approximate quantities."
        rows={4}
      />

      <FormField
        label="Additional Notes"
        name="notes"
        as="textarea"
        placeholder="Anything else we should know? Special dietary needs, delivery info, pickup time, etc."
        rows={3}
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
        {status === "loading" ? "Sending Request…" : "Submit Catering Request"}
      </button>

      <p className="text-muted-fg text-xs text-center">
        We typically respond within 24 hours. Need a faster answer?{" "}
        <a href="tel:+19565864677" className="text-brand underline">Call us directly.</a>
      </p>
    </form>
  );
}
