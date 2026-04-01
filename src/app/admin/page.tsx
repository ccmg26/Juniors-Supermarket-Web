import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatDateRange } from "@/lib/utils";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: storeCount },
    { data: ads },
    { count: specialCount },
    { count: eventCount },
    { count: jobCount },
    { count: contactCount },
    { count: leasingCount },
    { count: suggestionCount },
    { count: subscriberCount },
  ] = await Promise.all([
    supabase.from("stores").select("*", { count: "exact", head: true }),
    supabase.from("weekly_ads").select("id,title,status,is_active,valid_from,valid_to").order("valid_from", { ascending: false }).limit(5),
    supabase.from("specials").select("*", { count: "exact", head: true }),
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase.from("jobs").select("*", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
    supabase.from("leasing_inquiries").select("*", { count: "exact", head: true }),
    supabase.from("customer_suggestions").select("*", { count: "exact", head: true }),
    supabase.from("deals_club_subscribers").select("*", { count: "exact", head: true }),
  ]);

  const adCount = ads?.length ?? 0;
  const liveAd = ads?.find((a) => a.status === "published" || a.is_active);

  const statCards = [
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

      {/* ── Live Ad Status ── */}
      {liveAd ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-green-700 mb-1">
              ✓ Weekly Ad Live
            </p>
            <p className="font-black text-fg text-lg">{liveAd.title}</p>
            <p className="text-sm text-muted-fg mt-0.5">
              {formatDateRange(liveAd.valid_from, liveAd.valid_to)}
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Link href={`/admin/weekly-ads/${liveAd.id}`} className="btn-secondary text-xs">
              Edit Ad
            </Link>
            <a href="/weekly-ad" target="_blank" className="btn-outline text-xs">
              View Live ↗
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-yellow-700 mb-1">
              ⚠ No Ad Published
            </p>
            <p className="font-semibold text-fg">No weekly ad is currently live on the website.</p>
          </div>
          <Link href="/admin/quick-upload" className="btn-primary text-xs shrink-0">
            ⚡ Quick Publish
          </Link>
        </div>
      )}

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statCards.map((card) => (
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

      {/* ── Quick Actions ── */}
      <div>
        <h2 className="text-lg font-black text-fg mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/quick-upload" className="btn-primary text-sm">
            ⚡ Quick Publish Ad
          </Link>
          <Link href="/admin/weekly-ads/new" className="btn-secondary text-sm">
            + New Ad
          </Link>
          <Link href="/admin/specials/new" className="btn-secondary text-sm">
            + Add Special
          </Link>
          <Link href="/admin/events/new" className="btn-secondary text-sm">
            + Add Event
          </Link>
          <Link href="/admin/jobs/new" className="btn-secondary text-sm">
            + Post Job
          </Link>
          <Link href="/admin/homepage" className="btn-secondary text-sm">
            ✏️ Edit Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
