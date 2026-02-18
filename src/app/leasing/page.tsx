import type { Metadata } from "next";
import LeasingForm from "./LeasingForm";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Lease a Space – Junior's Supermarket",
  description: "Interested in leasing retail or commercial space inside a Junior's Supermarket location? Contact us today.",
};

export default function LeasingPage() {
  return (
    <div>
      {/* Hero — dark section */}
      <div className="bg-fg py-12 px-4">
        <div className="container-max text-center">
          <p className="text-bg/60 text-xs font-bold uppercase tracking-widest mb-2">
            Business Opportunities
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-bg mb-3">
            Lease a Space at Junior&apos;s
          </h1>
          <p className="text-bg/80 text-lg max-w-xl mx-auto">
            Thousands of customers visit our 8 Rio Grande Valley locations every week.
            Be part of the Junior&apos;s community.
          </p>
        </div>
      </div>

      <section className="section-pad bg-accent">
        <div className="container-max max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Info */}
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="font-black text-fg text-2xl mb-4">
                  Why Lease with Junior&apos;s?
                </h2>
                <ul className="space-y-3">
                  {[
                    "High foot traffic — thousands of daily shoppers",
                    "8 prime Valley locations to choose from",
                    "Established, trusted community brand",
                    "Flexible space options available",
                    "Partnership with a family-owned business",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted-fg text-sm">
                      <span className="text-brand font-bold mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* bg-brand card — text-brand-fg (white): 6.1:1 ✅ */}
              <div className="card p-6 bg-brand">
                <h3 className="font-black text-xl text-brand-fg mb-2">Ready to Talk?</h3>
                <p className="text-brand-fg/80 mb-4">
                  Prefer to speak directly? Give us a call.
                </p>
                <a href={BRAND.phone.link} className="btn-dark w-full text-center">
                  📞 Call {BRAND.phone.display}
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="card p-6 sm:p-8">
              <h2 className="font-black text-fg text-2xl mb-6">Leasing Inquiry</h2>
              <LeasingForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
