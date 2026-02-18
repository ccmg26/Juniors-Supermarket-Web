import type { Metadata } from "next";
import SuggestionsForm from "./SuggestionsForm";

export const metadata: Metadata = {
  title: "Customer Suggestions",
  description: "Share your feedback, product requests, or concerns with Junior's Supermarket. We value your input.",
};

export default function SuggestionsPage() {
  return (
    <div>
      {/* Hero — dark section */}
      <div className="bg-fg py-12 px-4">
        <div className="container-max text-center">
          <p className="text-bg/60 text-xs font-bold uppercase tracking-widest mb-2">
            Your Voice Matters
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-bg mb-3">
            Suggestions & Feedback
          </h1>
          <p className="text-bg/80 text-lg max-w-xl mx-auto">
            Have a product request, concern, or idea? We listen to our community.
            Your feedback makes Junior&apos;s better.
          </p>
        </div>
      </div>

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
