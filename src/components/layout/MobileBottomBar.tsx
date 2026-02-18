import Link from "next/link";
import { BRAND } from "@/lib/constants";

const items = [
  {
    label: "Call",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    href: BRAND.phone.link,
    isExternal: true,
  },
  {
    label: "Directions",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    href: "/locations",
    isExternal: false,
  },
  {
    label: "Weekly Ad",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    href: "/weekly-ad",
    isExternal: false,
  },
  {
    label: "Specials",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    href: "/specials",
    isExternal: false,
  },
];

export default function MobileBottomBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-brand text-brand-fg border-t border-brand-fg/20 md:hidden safe-area-inset-bottom">
      <div className="grid grid-cols-4">
        {items.map((item) =>
          item.isExternal ? (
            <a
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center py-2.5 gap-1 text-brand-fg/80 hover:text-brand-fg hover:bg-brand-fg/10 transition-all"
            >
              {item.icon}
              <span className="text-[10px] font-semibold uppercase tracking-wider">{item.label}</span>
            </a>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center py-2.5 gap-1 text-brand-fg/80 hover:text-brand-fg hover:bg-brand-fg/10 transition-all"
            >
              {item.icon}
              <span className="text-[10px] font-semibold uppercase tracking-wider">{item.label}</span>
            </Link>
          )
        )}
      </div>
    </nav>
  );
}
