import type { Metadata } from "next";
import { BRAND, LEGAL_LAST_UPDATED } from "@/lib/constants";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Junior's Supermarket Privacy Policy. How we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  const subtitle = "Last updated: " + LEGAL_LAST_UPDATED;
  return (
    <div>
      <PageHero
        align="left"
        title="Privacy Policy"
        subtitle={subtitle}
      />

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
                  <li>Optional images attached to suggestions</li>
                  <li>Browser push-subscription identifiers when you enable notifications</li>
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
                  We do not sell your personal information. We use service providers, including
                  Supabase for database, authentication, and file storage and Vercel for website
                  hosting, to operate the website. Those providers process information on our behalf.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-black text-fg mb-3">5. Cookies</h2>
                <p>
                  Essential cookies are used to maintain authenticated administrator sessions. Public
                  visitors do not need an account. Browser notification permission is requested only
                  when you choose to enable push notifications and can be revoked in browser settings.
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
                  by following unsubscribe instructions in our emails. You may also ask to access,
                  correct, or delete information you submitted, subject to applicable law and required
                  record retention.
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
