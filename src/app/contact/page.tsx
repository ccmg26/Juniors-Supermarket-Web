import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import PageHero from "@/components/ui/PageHero";
import { BRAND, STORE_HOURS_RANGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Junior's Supermarket. Call 956-JUNIORS or send us a message. We're here to help.",
};

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="We're Here to Help"
        title="Contact Us"
        subtitle="Questions, comments, or concerns? Reach out — we love hearing from our community."
      />

      <section className="section-pad bg-accent">
        <div className="container-max max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact info */}
            <div className="space-y-4">
              <div className="card p-6">
                <h2 className="font-black text-fg text-xl mb-4">Get in Touch</h2>
                <div className="space-y-4">
                  <a
                    href={BRAND.phone.link}
                    className="flex items-center gap-4 p-4 bg-accent rounded-xl hover:bg-accent-fg/5 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-brand-fg text-xl">📞</span>
                    </div>
                    <div>
                      <p className="font-bold text-fg group-hover:text-brand transition-colors">
                        {BRAND.phone.display}
                      </p>
                      <p className="text-muted-fg text-sm">Call anytime {STORE_HOURS_RANGE}</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 bg-accent rounded-xl">
                    <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-brand-fg text-xl">📍</span>
                    </div>
                    <div>
                      <p className="font-bold text-fg">8 Locations</p>
                      <p className="text-muted-fg text-sm">Rio Grande Valley, Texas</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-accent rounded-xl">
                    <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-brand-fg text-xl">🕐</span>
                    </div>
                    <div>
                      <p className="font-bold text-fg">Open Daily</p>
                      <p className="text-muted-fg text-sm">{STORE_HOURS_RANGE}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* bg-brand card — text-brand-fg (white): 6.1:1 ✅ */}
              <div className="card p-6 bg-brand text-center">
                <p className="font-black text-2xl text-brand-fg mb-1">{BRAND.tagline}</p>
                <p className="text-brand-fg/70 text-sm">
                  Serving the Rio Grande Valley with pride.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="card p-6 sm:p-8">
              <h2 className="font-black text-fg text-2xl mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
