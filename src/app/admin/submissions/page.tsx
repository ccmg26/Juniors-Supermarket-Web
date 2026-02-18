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
        <h1 className="text-2xl font-black text-brand-black">Submissions</h1>
        <p className="text-brand-gray text-sm">View all customer submissions</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {tabs.map((t) => (
          <a
            key={t.id}
            href={`?tab=${t.id}`}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px ${
              tab === t.id
                ? "border-brand-red text-brand-red"
                : "border-transparent text-brand-gray hover:text-brand-black"
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
            <div key={c.id} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="font-bold text-brand-black">{c.name}</p>
                  <p className="text-brand-gray text-sm">{c.email} {c.phone && `· ${c.phone}`}</p>
                </div>
                <p className="text-xs text-brand-gray whitespace-nowrap">{formatDate(c.created_at)}</p>
              </div>
              <p className="text-brand-red font-semibold text-sm mb-1">{c.subject}</p>
              <p className="text-brand-gray text-sm leading-relaxed">{c.message}</p>
            </div>
          ))}
          {!contacts?.length && <Empty label="No contact submissions yet" />}
        </div>
      )}

      {/* Leasing inquiries */}
      {tab === "leasing" && (
        <div className="space-y-3">
          {(leasings ?? []).map((l) => (
            <div key={l.id} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="font-bold text-brand-black">{l.name}</p>
                  <p className="text-brand-gray text-sm">{l.email} · {l.phone}</p>
                </div>
                <p className="text-xs text-brand-gray whitespace-nowrap">{formatDate(l.created_at)}</p>
              </div>
              <p className="text-brand-red font-semibold text-sm mb-1">Preferred: {l.preferred_location}</p>
              <p className="text-brand-gray text-sm leading-relaxed">{l.message}</p>
            </div>
          ))}
          {!leasings?.length && <Empty label="No leasing inquiries yet" />}
        </div>
      )}

      {/* Customer suggestions */}
      {tab === "suggestions" && (
        <div className="space-y-3">
          {(suggestions ?? []).map((s) => (
            <div key={s.id} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="font-bold text-brand-black">{s.name}</p>
                  <p className="text-brand-gray text-sm">{s.email} {s.phone && `· ${s.phone}`}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold bg-brand-red/10 text-brand-red px-2 py-1 rounded-full">{s.type}</span>
                  <p className="text-xs text-brand-gray mt-1">{formatDate(s.created_at)}</p>
                </div>
              </div>
              <p className="text-brand-gray text-sm leading-relaxed">{s.message}</p>
              {s.image_url && (
                <a href={s.image_url} target="_blank" rel="noopener noreferrer" className="text-brand-red text-xs hover:underline mt-2 inline-block">
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
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-brand-gray">Email</th>
                <th className="text-left px-4 py-3 font-semibold text-brand-gray">Phone</th>
                <th className="text-left px-4 py-3 font-semibold text-brand-gray">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(subscribers ?? []).map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-brand-black">{s.email}</td>
                  <td className="px-4 py-3 text-brand-gray">{s.phone || "—"}</td>
                  <td className="px-4 py-3 text-brand-gray text-xs">{formatDate(s.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!subscribers?.length && <div className="p-12 text-center text-brand-gray">No subscribers yet.</div>}
        </div>
      )}
    </div>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-brand-gray">
      <p>{label}</p>
    </div>
  );
}
