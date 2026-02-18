import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDepartmentsPage() {
  const supabase = await createClient();
  const { data: departments } = await supabase.from("departments").select("*").order("sort_order");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-brand-black">Departments</h1>
          <p className="text-brand-gray text-sm">Manage department info and galleries</p>
        </div>
      </div>

      {departments && departments.length > 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-brand-gray">Department</th>
                <th className="text-left px-4 py-3 font-semibold text-brand-gray">Slug</th>
                <th className="text-left px-4 py-3 font-semibold text-brand-gray">Status</th>
                <th className="text-right px-4 py-3 font-semibold text-brand-gray">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {departments.map((dept) => (
                <tr key={dept.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-brand-black">{dept.name}</td>
                  <td className="px-4 py-3 text-brand-gray font-mono text-xs">{dept.slug}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${dept.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-muted-fg"}`}>
                      {dept.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/departments/${dept.slug}`} target="_blank" className="text-brand-red hover:underline text-xs font-semibold">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-brand-gray">
          <p>Departments are managed via the Supabase database directly. Seed data includes all 9 departments.</p>
        </div>
      )}
    </div>
  );
}
