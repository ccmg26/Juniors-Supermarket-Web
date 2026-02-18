import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDepartmentsPage() {
  const supabase = await createClient();
  const { data: departments } = await supabase.from("departments").select("*").order("sort_order");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-fg">Departments</h1>
          <p className="text-muted-fg text-sm">Manage department info and galleries</p>
        </div>
      </div>

      {departments && departments.length > 0 ? (
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-muted-fg">Department</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-fg">Slug</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-fg">Status</th>
                <th className="text-right px-4 py-3 font-semibold text-muted-fg">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {departments.map((dept) => (
                <tr key={dept.id} className="hover:bg-muted">
                  <td className="px-4 py-3 font-medium text-fg">{dept.name}</td>
                  <td className="px-4 py-3 text-muted-fg font-mono text-xs">{dept.slug}</td>
                  <td className="px-4 py-3">
claude/juniors-supermarket-platform-ILEbS
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${dept.is_active ? "bg-green-100 text-green-700" : "bg-muted text-muted-fg"}`}>

                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${dept.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-muted-fg"}`}>
main
                      {dept.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/departments/${dept.slug}`} target="_blank" className="text-brand hover:underline text-xs font-semibold">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border p-12 text-center text-muted-fg">
          <p>Departments are managed via the Supabase database directly. Seed data includes all 9 departments.</p>
        </div>
      )}
    </div>
  );
}
