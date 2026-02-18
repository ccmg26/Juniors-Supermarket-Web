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
    <footer className="bg-brand-black text-white">
      {/* CTA strip */}
      <div className="bg-brand-red">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-black text-xl">The Real Meat People</p>
            <p className="text-white/80 text-sm">Fresh. Family. Community.</p>
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
              <div className="w-10 h-10 bg-brand-red rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xl">J</span>
              </div>
              <div>
                <p className="text-white font-black text-lg leading-tight">Junior&apos;s</p>
                <p className="text-brand-red text-xs font-semibold tracking-widest uppercase">
                  Supermarket
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {BRAND.tagline}. Serving the Rio Grande Valley since day one.
            </p>
            <span className="badge-ebt">✓ EBT / WIC Accepted</span>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                {group}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
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

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
            <span>Rio Grande Valley, TX</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
