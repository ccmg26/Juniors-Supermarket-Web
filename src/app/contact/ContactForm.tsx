"use client";

import { useState } from "react";
import { submitContact } from "@/lib/actions";
import FormField from "@/components/ui/FormField";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const result = await submitContact(fd);
    if (result.success) {
      setStatus("success");
      setMessage("Message sent! We'll get back to you as soon as possible.");
    } else {
      setStatus("error");
      setMessage(result.error || "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-10">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="font-black text-brand-black text-xl mb-2">Message Sent!</h3>
        <p className="text-brand-gray">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Your Name" name="name" required placeholder="John Smith" />
        <FormField label="Email Address" name="email" type="email" required placeholder="john@example.com" />
      </div>
      <FormField label="Phone (Optional)" name="phone" type="tel" placeholder="(956) 555-0123" />
      <FormField label="Subject" name="subject" required placeholder="How can we help?" />
      <FormField
        label="Message"
        name="message"
        as="textarea"
        required
        placeholder="Tell us what's on your mind..."
        rows={5}
      />
      {status === "error" && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {message}
        </p>
      )}
      <button type="submit" className="btn-primary w-full text-base py-3.5">
        Send Message
      </button>
    </form>
  );
}
