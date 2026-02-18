"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "🏠", exact: true },
  { href: "/admin/stores", label: "Stores", icon: "🏪" },
  { href: "/admin/weekly-ads", label: "Weekly Ads", icon: "📋" },
  { href: "/admin/specials", label: "Specials", icon: "🏷️" },
  { href: "/admin/departments", label: "Departments", icon: "🏬" },
  { href: "/admin/events", label: "Events", icon: "📅" },
  { href: "/admin/jobs", label: "Jobs", icon: "💼" },
  { href: "/admin/submissions", label: "Submissions", icon: "📬" },
];

export default function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-64 bg-brand-black min-h-screen flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-red rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-lg">J</span>
          </div>
          <div>
            <p className="text-white font-black text-sm">Admin Panel</p>
            <p className="text-brand-red text-xs">Junior&apos;s Supermarket</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-brand-red text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User + logout */}
      <div className="p-4 border-t border-white/10">
        <p className="text-gray-400 text-xs truncate mb-3">{userEmail}</p>
        <button
          onClick={handleLogout}
          className="w-full text-left text-gray-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/10 transition-all"
        >
          🚪 Sign Out
        </button>
      </div>
    </aside>
  );
}
