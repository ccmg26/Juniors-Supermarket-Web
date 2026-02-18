import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Junior's Supermarket Terms of Use. Rules and guidelines for using our website.",
};

export default function TermsPage() {
  return (
    <div>
      <div className="bg-fg py-12 px-4">
        <div className="container-max">
          <h1 className="text-4xl font-black text-white mb-2">Terms of Use</h1>
          <p className="text-muted-fg">Last updated: January 1, 2025</p>
          <p className="text-bg/80">Last updated: January 1, 2025</p>
        </div>
      </div>

      <section className="section-pad bg-accent">
        <div className="container-max max-w-3xl">
          <div className="card p-8 sm:p-12">
            <div className="space-y-8 text-muted-fg leading-relaxed">
              <div>
                <h2 className="text-xl font-black text-fg mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using the {BRAND.name} website, you accept and agree to be bound
                  by these Terms of Use. If you do not agree to these terms, please do not use our website.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-black text-fg mb-3">2. Use of Website</h2>
                <p>
                  This website is provided for informational purposes. You agree to use this website
                  only for lawful purposes and in a manner that does not infringe the rights of others.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-black text-fg mb-3">3. Pricing & Product Availability</h2>
                <p>
                  All prices, deals, and specials shown on this website are subject to change without
                  notice. <strong className="text-fg">While Supplies Last.</strong> Prices and availability
                  may vary by location. We reserve the right to correct any errors in pricing or product
                  information.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-black text-fg mb-3">4. Weekly Ad</h2>
                <p>
                  Our weekly ad typically resets every Wednesday. Valid dates are displayed on each
                  ad. Deals are subject to availability and may vary by location. While Supplies Last.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-black text-fg mb-3">5. Intellectual Property</h2>
                <p>
                  All content on this website, including text, images, logos, and graphics, is the
                  property of {BRAND.name} and is protected by applicable intellectual property laws.
                  You may not reproduce or redistribute our content without written permission.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-black text-fg mb-3">6. Disclaimer of Warranties</h2>
                <p>
                  This website is provided &quot;as is&quot; without any warranties of any kind. We do not
                  warrant that the website will be uninterrupted, error-free, or free of viruses.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-black text-fg mb-3">7. Limitation of Liability</h2>
                <p>
                  {BRAND.name} shall not be liable for any indirect, incidental, or consequential
                  damages arising from your use of this website or our products and services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-black text-fg mb-3">8. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the
                  State of Texas, without regard to conflict of law principles.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-black text-fg mb-3">9. Contact</h2>
                <p>
                  For questions about these Terms, contact us at{" "}
                  <a href={BRAND.phone.link} className="text-brand font-semibold">{BRAND.phone.display}</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
