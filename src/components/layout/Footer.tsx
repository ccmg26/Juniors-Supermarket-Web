import Link from "next/link";
import { BRAND } from "@/lib/constants";

const footerLinks = {
  Shop: [
    { href: "/weekly-ad", label: "Weekly Ad" },
    { href: "/departments", label: "Departments" },
  ],
  Locations: [
    { href: "/locations", label: "All Locations" },
    { href: "/contact", label: "Store Hours & Info" },
  ],
  Company: [
    { href: "/events", label: "Events" },
    { href: "/jobs", label: "Jobs" },
    { href: "/leasing", label: "Leasing" },
    { href: "/contact", label: "Contact Us" },
  ],
  More: [
    { href: "/suggestions", label: "Suggestions" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Use" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-fg text-bg">
      {/* CTA strip — brand red */}
      <div className="bg-brand">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-black text-xl text-brand-fg">The <span className="text-brand-yellow">Real</span> Meat People</p>
            <p className="text-brand-fg/80 text-sm">Fresh. Family. Community.</p>
          </div>
          <a href={BRAND.phone.link} className="btn-dark">
            📞 {BRAND.phone.display}
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <img src="/logo.png" alt="Junior's Supermarket" className="h-14 w-auto" />
            </div>
            {/* text-bg/70 on bg-fg: approx 8:1 contrast ✅ */}
            <p className="text-bg/70 text-sm leading-relaxed mb-4">
              The <span className="text-brand-yellow">Real</span> Meat People. Serving the Rio Grande Valley since day one.
            </p>
            <span className="badge-ebt">✓ EBT / WIC Accepted</span>
            {/* Social links */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href={BRAND.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Junior's Supermarket on Facebook"
                className="group w-8 h-8 rounded-full bg-bg/10 hover:bg-brand transition-colors flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-bg/70 group-hover:text-brand-fg transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href={BRAND.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Junior's Supermarket on Instagram"
                className="group w-8 h-8 rounded-full bg-bg/10 hover:bg-brand transition-colors flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-bg/70 group-hover:text-brand-fg transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
              <a
                href={BRAND.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Junior's Supermarket on TikTok"
                className="group w-8 h-8 rounded-full bg-bg/10 hover:bg-brand transition-colors flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-bg/70 group-hover:text-brand-fg transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-bg font-bold text-sm uppercase tracking-wider mb-4">
                {group}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-bg/70 hover:text-bg text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar — text-bg/70 on bg-fg ✅ */}
      <div className="border-t border-bg/10">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-bg/70">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-bg transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-bg transition-colors">Terms</Link>
            <span>Rio Grande Valley, TX</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
