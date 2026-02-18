import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminJobsPage() {
  const supabase = await createClient();
  const { data: jobs } = await supabase.from("jobs").select("*").order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-fg">Jobs</h1>
          <p className="text-muted-fg text-sm">{jobs?.length ?? 0} positions</p>
        </div>
        <Link href="/admin/jobs/new" className="btn-primary">+ Add Job</Link>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-muted-fg">Title</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-fg hidden sm:table-cell">Department</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-fg hidden md:table-cell">Location</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-fg">Status</th>
              <th className="text-right px-4 py-3 font-semibold text-muted-fg">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {(jobs ?? []).map((job) => (
              <tr key={job.id} className="hover:bg-muted transition-colors">
                <td className="px-4 py-3 font-medium text-fg">{job.title}</td>
                <td className="px-4 py-3 text-muted-fg hidden sm:table-cell">{job.department}</td>
                <td className="px-4 py-3 text-muted-fg hidden md:table-cell">{job.location}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${job.is_active ? "bg-green-100 text-green-700" : "bg-muted text-muted-fg"}`}>
                    {job.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/jobs/${job.id}`} className="text-brand hover:underline text-xs font-semibold">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
