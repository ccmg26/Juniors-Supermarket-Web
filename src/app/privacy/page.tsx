import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Junior's Supermarket Privacy Policy. How we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <div>
      <div className="bg-fg py-12 px-4">
        <div className="container-max">
          <h1 className="text-4xl font-black text-bg mb-2">Privacy Policy</h1>
          {/* text-bg/60 — white/60 on dark navy: ~6:1 ✅  (was text-muted-fg: 3.4:1 ❌) */}
          <p className="text-bg/60">Last updated: January 1, 2025</p>
        </div>
      </div>

      <section className="section-pad bg-accent">
        <div className="container-max max-w-3xl">
          <div className="card p-8 sm:p-12 prose prose-gray max-w-none">
            <div className="space-y-8 text-muted-fg leading-relaxed">
              <div>
                <h2 className="text-xl font-black text-fg mb-3">1. Introduction</h2>
                <p>
                  {BRAND.name} (&quot;Junior&apos;s,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your
                  privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard
                  your information when you visit our website or interact with our services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-black text-fg mb-3">2. Information We Collect</h2>
                <p>We may collect the following types of information:</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Name, email address, and phone number when you submit a form</li>
                  <li>Store preferences and shopping interests</li>
                  <li>Information submitted through our Deals Club signup</li>
                  <li>Messages sent through contact, suggestion, or leasing forms</li>
                  <li>Cookies and usage data for website analytics</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-black text-fg mb-3">3. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Send weekly ad announcements, specials, and promotional offers</li>
                  <li>Respond to your inquiries and requests</li>
                  <li>Process leasing inquiries and job applications</li>
                  <li>Improve our website and customer experience</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-black text-fg mb-3">4. Sharing of Information</h2>
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to outside
                  parties. We may share information with trusted service providers who assist us in
                  operating our website and conducting business, so long as those parties agree to
                  keep this information confidential.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-black text-fg mb-3">5. Cookies</h2>
                <p>
                  Our website may use cookies to enhance your experience. You can choose to have
                  your computer warn you each time a cookie is being sent, or you can choose to
                  turn off all cookies through your browser settings.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-black text-fg mb-3">6. Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information.
                  However, no method of transmission over the internet is 100% secure, and we cannot
                  guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-black text-fg mb-3">7. Your Rights</h2>
                <p>
                  You may opt out of receiving promotional communications from us at any time by
                  contacting us at <a href={BRAND.phone.link} className="text-brand font-semibold">{BRAND.phone.display}</a> or
                  by following unsubscribe instructions in our emails.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-black text-fg mb-3">8. Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy, please contact us at{" "}
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
