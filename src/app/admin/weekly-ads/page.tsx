import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatDateRange } from "@/lib/utils";

export default async function AdminWeeklyAdsPage() {
  const supabase = await createClient();
  const { data: ads } = await supabase
    .from("weekly_ads")
    .select("*")
    .order("valid_from", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-fg">Weekly Ads</h1>
          <p className="text-muted-fg text-sm">{ads?.length ?? 0} ads</p>
        </div>
        <Link href="/admin/weekly-ads/new" className="btn-primary">
          + Upload Ad
        </Link>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-muted-fg">Title</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-fg hidden sm:table-cell">Valid Dates</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-fg">Status</th>
              <th className="text-right px-4 py-3 font-semibold text-muted-fg">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {(ads ?? []).map((ad) => (
              <tr key={ad.id} className="hover:bg-muted transition-colors">
                <td className="px-4 py-3 font-medium text-fg">{ad.title}</td>
                <td className="px-4 py-3 text-muted-fg hidden sm:table-cell">
                  {formatDateRange(ad.valid_from, ad.valid_to)}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    ad.is_active ? "bg-green-100 text-green-700" : "bg-muted text-muted-fg"
                    ad.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-muted-fg"
                  }`}>
                    {ad.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/weekly-ads/${ad.id}`} className="text-brand hover:underline text-xs font-semibold">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
