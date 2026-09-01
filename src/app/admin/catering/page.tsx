import { createClient } from "@/lib/supabase/server";
import { formatDateRange } from "@/lib/utils";

export const metadata = { title: "Catering Requests" };

const STATUS_COLORS: Record<string, string> = {
  new:       "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-muted text-muted-fg",
};

export default async function AdminCateringPage() {
  const supabase = await createClient();
  const { data: requests } = await supabase
    .from("catering_requests")
    .select("*")
    .order("created_at", { ascending: false });

  const newCount = (requests ?? []).filter((r) => r.status === "new").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-fg">Catering Requests</h1>
          <p className="text-muted-fg text-sm">
            {requests?.length ?? 0} total &middot;{" "}
            <span className="text-blue-600 font-semibold">{newCount} new</span>
          </p>
        </div>
      </div>

      {(requests ?? []).length === 0 ? (
        <div className="bg-card rounded-2xl border border-border text-center py-16 text-muted-fg">
          <p className="text-4xl mb-3">🎉</p>
          <p className="font-semibold text-fg">No catering requests yet</p>
          <p className="text-sm mt-1">
            Requests from{" "}
            <a href="/catering" className="text-brand underline" target="_blank">
              /catering
            </a>{" "}
            will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-muted-fg">Contact</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-fg hidden sm:table-cell">Event</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-fg hidden md:table-cell">Date</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-fg hidden lg:table-cell">Guests</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-fg">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-fg hidden xl:table-cell">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(requests ?? []).map((r) => (
                <tr key={r.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-fg">{r.name}</p>
                    <a href={`mailto:${r.email}`} className="text-brand text-xs">{r.email}</a>
                    <a href={`tel:${r.phone}`} className="block text-xs text-muted-fg">{r.phone}</a>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <p className="font-medium text-fg">{r.event_type}</p>
                    {r.location_preference && (
                      <p className="text-xs text-muted-fg">{r.location_preference}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-fg text-xs hidden md:table-cell">
                    {r.event_date ? new Date(r.event_date).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                    }) : "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-fg text-xs hidden lg:table-cell">
                    {r.guest_count ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${
                      STATUS_COLORS[r.status] ?? "bg-muted text-muted-fg"
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-fg text-xs hidden xl:table-cell">
                    {new Date(r.created_at).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Show items/notes for new requests */}
      {(requests ?? []).filter((r) => r.status === "new" && (r.items || r.notes)).length > 0 && (
        <div className="mt-8">
          <h2 className="font-black text-fg text-lg mb-4">New Request Details</h2>
          <div className="space-y-4">
            {(requests ?? []).filter((r) => r.status === "new").map((r) => (
              <div key={`detail-${r.id}`} className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-fg">{r.name} — {r.event_type}</p>
                  <span className="text-xs text-muted-fg">
                    {new Date(r.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
                {r.items && (
                  <div className="mb-2">
                    <p className="text-xs font-semibold text-muted-fg uppercase tracking-wide mb-0.5">What They Need</p>
                    <p className="text-sm text-fg">{r.items}</p>
                  </div>
                )}
                {r.notes && (
                  <div>
                    <p className="text-xs font-semibold text-muted-fg uppercase tracking-wide mb-0.5">Notes</p>
                    <p className="text-sm text-muted-fg">{r.notes}</p>
                  </div>
                )}
                <div className="mt-3 flex gap-3">
                  <a href={`tel:${r.phone}`} className="btn-primary text-xs py-1.5">📞 Call {r.name}</a>
                  <a href={`mailto:${r.email}`} className="btn-secondary text-xs py-1.5">✉️ Email</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
