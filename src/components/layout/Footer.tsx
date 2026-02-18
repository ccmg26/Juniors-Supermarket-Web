import Link from "next/link";
import { BRAND } from "@/lib/constants";

const footerLinks = {
  Shop: [
    { href: "/weekly-ad", label: "Weekly Ad" },
    { href: "/specials", label: "Weekly Specials" },
    { href: "/departments", label: "Departments" },
  ],
  Locations: [
    { href: "/locations", label: "All Locations" },
    { href: "/locations/edinburg-university", label: "Edinburg University" },
    { href: "/locations/pharr-veterans", label: "Pharr Veterans" },
    { href: "/locations/san-juan", label: "San Juan" },
  ],
  Company: [
    { href: "/events", label: "Events" },
    { href: "/jobs", label: "Careers" },
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
            <p className="font-black text-xl text-brand-fg">The Real Meat People</p>
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
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center">
                <span className="text-brand-fg font-black text-xl">J</span>
              </div>
              <div>
                <p className="text-bg font-black text-lg leading-tight">Junior&apos;s</p>
                {/* text-bg/60 — white/60 on dark fg: readable subtext */}
                <p className="text-bg/60 text-xs font-semibold tracking-widest uppercase">
                  Supermarket
                </p>
              </div>
            </div>
            {/* text-bg/70 on bg-fg: approx 8:1 contrast ✅ */}
            <p className="text-bg/70 text-sm leading-relaxed mb-4">
              {BRAND.tagline}. Serving the Rio Grande Valley since day one.
            </p>
            <span className="badge-ebt">✓ EBT / WIC Accepted</span>
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
