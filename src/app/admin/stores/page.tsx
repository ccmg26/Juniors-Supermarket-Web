import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { adminDeleteStore } from "@/lib/actions";

export default async function AdminStoresPage() {
  const supabase = await createClient();
  const { data: stores } = await supabase
    .from("stores")
    .select("*")
    .order("name");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-brand-black">Stores</h1>
          <p className="text-brand-gray text-sm">{stores?.length ?? 0} locations</p>
        </div>
        <Link href="/admin/stores/new" className="btn-primary">
          + Add Store
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-brand-gray">Name</th>
              <th className="text-left px-4 py-3 font-semibold text-brand-gray hidden sm:table-cell">City</th>
              <th className="text-left px-4 py-3 font-semibold text-brand-gray hidden md:table-cell">Phone</th>
              <th className="text-left px-4 py-3 font-semibold text-brand-gray">Status</th>
              <th className="text-right px-4 py-3 font-semibold text-brand-gray">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {(stores ?? []).map((store) => (
              <tr key={store.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-brand-black">{store.name}</td>
                <td className="px-4 py-3 text-brand-gray hidden sm:table-cell">{store.city}, {store.state}</td>
                <td className="px-4 py-3 text-brand-gray hidden md:table-cell">{store.phone}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    store.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}>
                    {store.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/stores/${store.id}`}
                      className="text-brand-red hover:underline text-xs font-semibold"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/locations/${store.slug}`}
                      target="_blank"
                      className="text-brand-gray hover:underline text-xs"
                    >
                      View
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
