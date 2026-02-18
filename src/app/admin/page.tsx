import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: storeCount },
    { count: adCount },
    { count: specialCount },
    { count: eventCount },
    { count: jobCount },
    { count: contactCount },
    { count: leasingCount },
    { count: suggestionCount },
    { count: subscriberCount },
  ] = await Promise.all([
    supabase.from("stores").select("*", { count: "exact", head: true }),
    supabase.from("weekly_ads").select("*", { count: "exact", head: true }),
    supabase.from("specials").select("*", { count: "exact", head: true }),
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase.from("jobs").select("*", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
    supabase.from("leasing_inquiries").select("*", { count: "exact", head: true }),
    supabase.from("customer_suggestions").select("*", { count: "exact", head: true }),
    supabase.from("deals_club_subscribers").select("*", { count: "exact", head: true }),
  ]);

  const cards = [
    { label: "Stores", count: storeCount, href: "/admin/stores", icon: "🏪", color: "bg-blue-500" },
    { label: "Weekly Ads", count: adCount, href: "/admin/weekly-ads", icon: "📋", color: "bg-brand" },
    { label: "Specials", count: specialCount, href: "/admin/specials", icon: "🏷️", color: "bg-orange-500" },
    { label: "Events", count: eventCount, href: "/admin/events", icon: "📅", color: "bg-purple-500" },
    { label: "Jobs", count: jobCount, href: "/admin/jobs", icon: "💼", color: "bg-green-500" },
    { label: "Contact Forms", count: contactCount, href: "/admin/submissions?tab=contact", icon: "📬", color: "bg-yellow-500" },
    { label: "Leasing Inquiries", count: leasingCount, href: "/admin/submissions?tab=leasing", icon: "🏢", color: "bg-teal-500" },
    { label: "Suggestions", count: suggestionCount, href: "/admin/submissions?tab=suggestions", icon: "💬", color: "bg-pink-500" },
    { label: "Deals Club Members", count: subscriberCount, href: "/admin/submissions?tab=subscribers", icon: "✉️", color: "bg-indigo-500" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-fg">Dashboard</h1>
        <p className="text-muted-fg mt-1">Junior&apos;s Supermarket Admin Panel</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-card text-card-fg rounded-2xl p-5 border border-border hover:border-brand/30 hover:shadow-md transition-all group"
          >
            <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center mb-4 text-xl`}>
              {card.icon}
            </div>
            <p className="text-3xl font-black text-fg mb-1">{card.count ?? 0}</p>
            <p className="text-muted-fg text-sm font-medium group-hover:text-brand transition-colors">
              {card.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mt-8">
        <h2 className="text-xl font-black text-fg mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/weekly-ads" className="btn-primary">
            + Upload Weekly Ad
          </Link>
          <Link href="/admin/specials" className="btn-secondary">
            + Add Special
          </Link>
          <Link href="/admin/events" className="btn-secondary">
            + Add Event
          </Link>
          <Link href="/admin/jobs" className="btn-secondary">
            + Post Job
          </Link>
        </div>
      </div>
    </div>
  );
}
