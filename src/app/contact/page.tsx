import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Junior's Supermarket. Call 956-JUNIORS or send us a message. We're here to help.",
};

export default function ContactPage() {
  return (
    <div>
      <div className="bg-brand-black py-12 px-4">
        <div className="container-max text-center">
          <p className="text-brand-red text-xs font-bold uppercase tracking-widest mb-2">
            We&apos;re Here to Help
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">Contact Us</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Questions, comments, or concerns? Reach out — we love hearing from our community.
          </p>
        </div>
      </div>

      <section className="section-pad bg-brand-cream">
        <div className="container-max max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact info */}
            <div className="space-y-4">
              <div className="card p-6">
                <h2 className="font-black text-brand-black text-xl mb-4">Get in Touch</h2>
                <div className="space-y-4">
                  <a
                    href={BRAND.phone.link}
                    className="flex items-center gap-4 p-4 bg-brand-cream rounded-xl hover:bg-brand-warm transition-colors group"
                  >
                    <div className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl">📞</span>
                    </div>
                    <div>
                      <p className="font-bold text-brand-black group-hover:text-brand-red transition-colors">
                        {BRAND.phone.display}
                      </p>
                      <p className="text-brand-gray text-sm">Call anytime 7AM–10PM</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 bg-brand-cream rounded-xl">
                    <div className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl">📍</span>
                    </div>
                    <div>
                      <p className="font-bold text-brand-black">8 Locations</p>
                      <p className="text-brand-gray text-sm">Rio Grande Valley, Texas</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-brand-cream rounded-xl">
                    <div className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl">🕐</span>
                    </div>
                    <div>
                      <p className="font-bold text-brand-black">Open Daily</p>
                      <p className="text-brand-gray text-sm">7:00 AM – 10:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6 bg-brand-red text-white text-center">
                <p className="font-black text-2xl mb-1">{BRAND.tagline}</p>
                <p className="text-white/70 text-sm">
                  Serving the Rio Grande Valley with pride.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="card p-6 sm:p-8">
              <h2 className="font-black text-brand-black text-2xl mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
