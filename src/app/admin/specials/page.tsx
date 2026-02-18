import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatDateRange } from "@/lib/utils";

export default async function AdminSpecialsPage() {
  const supabase = await createClient();
  const { data: specials } = await supabase
    .from("specials")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-brand-black">Specials</h1>
          <p className="text-brand-gray text-sm">{specials?.length ?? 0} specials</p>
        </div>
        <Link href="/admin/specials/new" className="btn-primary">+ Add Special</Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-brand-gray">Title</th>
              <th className="text-left px-4 py-3 font-semibold text-brand-gray hidden sm:table-cell">Category</th>
              <th className="text-left px-4 py-3 font-semibold text-brand-gray hidden md:table-cell">Price</th>
              <th className="text-left px-4 py-3 font-semibold text-brand-gray hidden lg:table-cell">Valid</th>
              <th className="text-left px-4 py-3 font-semibold text-brand-gray">Status</th>
              <th className="text-right px-4 py-3 font-semibold text-brand-gray">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {(specials ?? []).map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-brand-black">{s.title}</td>
                <td className="px-4 py-3 text-brand-gray hidden sm:table-cell">{s.category}</td>
                <td className="px-4 py-3 font-bold text-brand-red hidden md:table-cell">{s.price}</td>
                <td className="px-4 py-3 text-brand-gray text-xs hidden lg:table-cell">
                  {formatDateRange(s.valid_from, s.valid_to)}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    s.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-muted-fg"
                  }`}>
                    {s.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/specials/${s.id}`} className="text-brand-red hover:underline text-xs font-semibold">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
