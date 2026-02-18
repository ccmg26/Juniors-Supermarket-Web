import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export default async function AdminSubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab = "contact" } = await searchParams;
  const supabase = await createClient();

  const [
    { data: contacts },
    { data: leasings },
    { data: suggestions },
    { data: subscribers },
  ] = await Promise.all([
    supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
    supabase.from("leasing_inquiries").select("*").order("created_at", { ascending: false }),
    supabase.from("customer_suggestions").select("*").order("created_at", { ascending: false }),
    supabase.from("deals_club_subscribers").select("*").order("created_at", { ascending: false }),
  ]);

  const tabs = [
    { id: "contact", label: "Contact", count: contacts?.length ?? 0 },
    { id: "leasing", label: "Leasing", count: leasings?.length ?? 0 },
    { id: "suggestions", label: "Suggestions", count: suggestions?.length ?? 0 },
    { id: "subscribers", label: "Deals Club", count: subscribers?.length ?? 0 },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-fg">Submissions</h1>
        <p className="text-muted-fg text-sm">View all customer submissions</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 mb-6 border-b border-border">
        {tabs.map((t) => (
          <a
            key={t.id}
            href={`?tab=${t.id}`}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px ${
              tab === t.id
                ? "border-brand text-brand"
                : "border-transparent text-muted-fg hover:text-fg"
            }`}
          >
            {t.label} ({t.count})
          </a>
        ))}
      </div>

      {/* Contact submissions */}
      {tab === "contact" && (
        <div className="space-y-3">
          {(contacts ?? []).map((c) => (
            <div key={c.id} className="bg-white rounded-xl border border-border p-5">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="font-bold text-fg">{c.name}</p>
                  <p className="text-muted-fg text-sm">{c.email} {c.phone && `· ${c.phone}`}</p>
                </div>
                <p className="text-xs text-muted-fg whitespace-nowrap">{formatDate(c.created_at)}</p>
              </div>
              <p className="text-brand font-semibold text-sm mb-1">{c.subject}</p>
              <p className="text-muted-fg text-sm leading-relaxed">{c.message}</p>
            </div>
          ))}
          {!contacts?.length && <Empty label="No contact submissions yet" />}
        </div>
      )}

      {/* Leasing inquiries */}
      {tab === "leasing" && (
        <div className="space-y-3">
          {(leasings ?? []).map((l) => (
            <div key={l.id} className="bg-white rounded-xl border border-border p-5">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="font-bold text-fg">{l.name}</p>
                  <p className="text-muted-fg text-sm">{l.email} · {l.phone}</p>
                </div>
                <p className="text-xs text-muted-fg whitespace-nowrap">{formatDate(l.created_at)}</p>
              </div>
              <p className="text-brand font-semibold text-sm mb-1">Preferred: {l.preferred_location}</p>
              <p className="text-muted-fg text-sm leading-relaxed">{l.message}</p>
            </div>
          ))}
          {!leasings?.length && <Empty label="No leasing inquiries yet" />}
        </div>
      )}

      {/* Customer suggestions */}
      {tab === "suggestions" && (
        <div className="space-y-3">
          {(suggestions ?? []).map((s) => (
            <div key={s.id} className="bg-white rounded-xl border border-border p-5">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="font-bold text-fg">{s.name}</p>
                  <p className="text-muted-fg text-sm">{s.email} {s.phone && `· ${s.phone}`}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold bg-brand/10 text-brand px-2 py-1 rounded-full">{s.type}</span>
                  <p className="text-xs text-muted-fg mt-1">{formatDate(s.created_at)}</p>
                </div>
              </div>
              <p className="text-muted-fg text-sm leading-relaxed">{s.message}</p>
              {s.image_url && (
                <a href={s.image_url} target="_blank" rel="noopener noreferrer" className="text-brand text-xs hover:underline mt-2 inline-block">
                  View attached image
                </a>
              )}
            </div>
          ))}
          {!suggestions?.length && <Empty label="No suggestions yet" />}
        </div>
      )}

      {/* Deals club subscribers */}
      {tab === "subscribers" && (
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-muted-fg">Email</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-fg">Phone</th>
                <th className="text-left px-4 py-3 font-semibold text-muted-fg">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(subscribers ?? []).map((s) => (
                <tr key={s.id} className="hover:bg-muted">
                  <td className="px-4 py-3 text-fg">{s.email}</td>
                  <td className="px-4 py-3 text-muted-fg">{s.phone || "—"}</td>
                  <td className="px-4 py-3 text-muted-fg text-xs">{formatDate(s.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!subscribers?.length && <div className="p-12 text-center text-muted-fg">No subscribers yet.</div>}
        </div>
      )}
    </div>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div className="bg-white rounded-xl border border-border p-12 text-center text-muted-fg">
      <p>{label}</p>
    </div>
  );
}
