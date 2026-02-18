import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatDateRange } from "@/lib/utils";

export default async function AdminEventsPage() {
  const supabase = await createClient();
  const { data: events } = await supabase.from("events").select("*").order("start_date", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-brand-black">Events</h1>
          <p className="text-brand-gray text-sm">{events?.length ?? 0} events</p>
        </div>
        <Link href="/admin/events/new" className="btn-primary">+ Add Event</Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-brand-gray">Title</th>
              <th className="text-left px-4 py-3 font-semibold text-brand-gray hidden sm:table-cell">Dates</th>
              <th className="text-left px-4 py-3 font-semibold text-brand-gray">Featured</th>
              <th className="text-left px-4 py-3 font-semibold text-brand-gray">Status</th>
              <th className="text-right px-4 py-3 font-semibold text-brand-gray">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {(events ?? []).map((ev) => (
              <tr key={ev.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-brand-black">{ev.title}</td>
                <td className="px-4 py-3 text-brand-gray text-xs hidden sm:table-cell">{formatDateRange(ev.start_date, ev.end_date)}</td>
                <td className="px-4 py-3">
                  {ev.is_featured && <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Featured</span>}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${ev.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-muted-fg"}`}>
                    {ev.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/events/${ev.id}`} className="text-brand-red hover:underline text-xs font-semibold">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
