import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatDateRange } from "@/lib/utils";
import SpecialActions from "./SpecialActions";

export default async function AdminSpecialsPage() {
  const supabase = await createClient();
  const { data: specials } = await supabase
    .from("specials")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const active = (specials ?? []).filter((s) => s.is_active);
  const featured = (specials ?? []).filter((s) => s.is_featured);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-fg">Specials</h1>
          <p className="text-muted-fg text-sm">
            {specials?.length ?? 0} total &middot; {active.length} active &middot; {featured.length} featured
          </p>
        </div>
        <Link href="/admin/specials/new" className="btn-primary text-sm">
          + Add Special
        </Link>
      </div>

      {(specials ?? []).length === 0 ? (
        <div className="bg-card rounded-2xl border border-border text-center py-16 text-muted-fg">
          <p className="text-4xl mb-3">🏷️</p>
          <p className="font-semibold text-fg">No specials yet</p>
          <p className="text-sm mt-1">Add your first special to display on the website.</p>
          <Link href="/admin/specials/new" className="btn-primary mt-4 inline-flex">
            + Add Special
          </Link>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-muted-fg">Special</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-fg hidden sm:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-fg hidden md:table-cell">Price</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-fg hidden lg:table-cell">Valid</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-fg">Status</th>
                <th className="text-right px-4 py-3 font-semibold text-muted-fg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(specials ?? []).map((s) => (
                <tr key={s.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {s.image_url ? (
                        <img
                          src={s.image_url}
                          alt={s.title}
                          className="w-10 h-10 rounded-lg object-cover shrink-0 bg-muted"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-muted shrink-0 flex items-center justify-center text-muted-fg text-xs">
                          No img
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-fg leading-tight">{s.title}</p>
                        {s.is_featured && (
                          <span className="text-xs text-yellow-600 font-semibold">★ Featured</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-fg hidden sm:table-cell">{s.category}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="font-bold text-brand">{s.price}</span>
                    {s.original_price && (
                      <span className="text-xs text-muted-fg line-through ml-1">{s.original_price}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-fg text-xs hidden lg:table-cell">
                    {formatDateRange(s.valid_from, s.valid_to)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      s.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-muted text-muted-fg"
                    }`}>
                      {s.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <SpecialActions special={s} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
