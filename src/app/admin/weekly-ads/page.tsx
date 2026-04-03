import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatDateRange } from "@/lib/utils";
import WeeklyAdActions from "./WeeklyAdActions";

const STATUS_STYLES: Record<string, string> = {
  published: "bg-green-100 text-green-700",
  draft:     "bg-yellow-100 text-yellow-700",
  scheduled: "bg-blue-100 text-blue-700",
  archived:  "bg-muted text-muted-fg",
};

export default async function AdminWeeklyAdsPage() {
  const supabase = await createClient();
  const { data: ads } = await supabase
    .from("weekly_ads")
    .select("*")
    .order("valid_from", { ascending: false });

  const published = ads?.find((a) => a.status === "published" || a.is_active);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-fg">Weekly Ads</h1>
          <p className="text-muted-fg text-sm">{ads?.length ?? 0} total ads</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/quick-upload" className="btn-secondary text-sm">
            ⚡ Quick Publish
          </Link>
          <Link href="/admin/weekly-ads/new" className="btn-primary text-sm">
            + New Ad
          </Link>
        </div>
      </div>

      {/* Current published ad callout */}
      {published ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-green-700 mb-1">
              Currently Live on Website
            </p>
            <p className="font-black text-fg">{published.title}</p>
            <p className="text-sm text-muted-fg mt-0.5">
              {formatDateRange(published.valid_from, published.valid_to)}
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Link href={`/admin/weekly-ads/${published.id}`} className="btn-secondary text-xs">
              Edit
            </Link>
            <a
              href="/weekly-ad"
              target="_blank"
              className="btn-outline text-xs"
            >
              View Live ↗
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6">
          <p className="text-sm font-semibold text-yellow-800">
            No ad is currently published. Use Quick Publish or create a new ad.
          </p>
        </div>
      )}

      {/* Ads table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {(ads ?? []).length === 0 ? (
          <div className="text-center py-16 text-muted-fg">
            <p className="text-4xl mb-3">📋</p>
            <p className="font-semibold text-fg">No weekly ads yet</p>
            <p className="text-sm mt-1">Use Quick Publish to upload your first ad.</p>
            <Link href="/admin/quick-upload" className="btn-primary mt-4 inline-flex">
              ⚡ Quick Publish
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-muted-fg">Ad Title</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-fg hidden sm:table-cell">Valid Dates</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-fg">Status</th>
                <th className="text-right px-4 py-3 font-semibold text-muted-fg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(ads ?? []).map((ad) => {
                const status = ad.status ?? (ad.is_active ? "published" : "archived");
                return (
                  <tr key={ad.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-fg">{ad.title}</p>
                      {ad.mobile_image_url && (
                        <p className="text-xs text-muted-fg mt-0.5">+ mobile image</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-fg hidden sm:table-cell">
                      {formatDateRange(ad.valid_from, ad.valid_to)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${
                        STATUS_STYLES[status] ?? STATUS_STYLES.archived
                      }`}>
                        {status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <WeeklyAdActions ad={ad} currentStatus={status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  );
}
