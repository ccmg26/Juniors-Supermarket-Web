import type { Metadata } from "next";
import SuggestionsForm from "./SuggestionsForm";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Customer Suggestions",
  description: "Share your feedback, product requests, or concerns with Junior's Supermarket. We value your input.",
};

export default function SuggestionsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Your Voice Matters"
        title="Suggestions & Feedback"
        subtitle="Have a product request, concern, or idea? We listen to our community. Your feedback makes Junior's better."
      />

      <section className="section-pad bg-accent">
        <div className="container-max max-w-3xl">
          <div className="card p-6 sm:p-10">
            <h2 className="font-black text-fg text-2xl mb-6">Send Your Feedback</h2>
            <SuggestionsForm />
          </div>
        </div>
      </section>
    </div>
  );
}
