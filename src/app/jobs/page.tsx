import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Careers – Jobs at Junior's Supermarket",
  description: "Join the Junior's Supermarket family. Browse open positions across our 8 Rio Grande Valley locations and apply through Paycom.",
};

export const revalidate = 3600;

export default async function JobsPage() {
  const supabase = await createClient();
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  type JobRow = NonNullable<typeof jobs>[number];
  const grouped = (jobs ?? []).reduce(
    (acc: Record<string, JobRow[]>, job: JobRow) => {
      const dept = job.department || "General";
      if (!acc[dept]) acc[dept] = [];
      acc[dept].push(job);
      return acc;
    },
    {} as Record<string, JobRow[]>
  );

  return (
    <div>
      {/* Hero — dark section */}
      <div className="bg-fg py-12 px-4">
        <div className="container-max text-center">
          <p className="text-bg/60 text-xs font-bold uppercase tracking-widest mb-2">
            Join Our Team
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-bg mb-3">Careers at Junior&apos;s</h1>
          <p className="text-bg/80 text-lg max-w-xl mx-auto">
            Be part of the family. We&apos;re always looking for passionate people to join our team
            across 8 Rio Grande Valley locations.
          </p>
        </div>
      </div>

      <section className="section-pad bg-accent">
        <div className="container-max">
          {(jobs ?? []).length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">💼</div>
              <p className="text-2xl font-black text-fg mb-2">No Open Positions Right Now</p>
              <p className="text-muted-fg mb-6">
                Check back soon — we&apos;re always growing! In the meantime, call us.
              </p>
              <a href={BRAND.phone.link} className="btn-primary">
                Call {BRAND.phone.display}
              </a>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(grouped).map(([dept, deptJobs]) => (
                <div key={dept}>
                  <h2 className="text-xl font-black text-fg mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-brand rounded-full inline-block"></span>
                    {dept}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {(deptJobs ?? []).map((job) => (
                      <div key={job.id} className="card p-6">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <h3 className="font-black text-fg text-lg">{job.title}</h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <span className="text-xs bg-brand/10 text-brand font-semibold px-2 py-0.5 rounded-full">
                                {job.type}
                              </span>
                              {/* bg-muted text-muted-fg: semantic, always readable ✅ */}
                              <span className="text-xs bg-muted text-muted-fg font-semibold px-2 py-0.5 rounded-full">
                                {job.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        {job.description && (
                          <p className="text-muted-fg text-sm leading-relaxed mb-4">
                            {job.description}
                          </p>
                        )}
                        <a
                          href={job.paycom_url || "https://www.paycomonline.net"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary w-full text-center"
                        >
                          Apply Now
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Benefits — CRITICAL FIX: was bg-brand-black with text-gray-600 (2.76:1 ❌)
              Now bg-fg with text-bg/70 (white/70 on dark navy: ~8:1 ✅) */}
          <div className="mt-16 bg-fg rounded-2xl p-8 grid sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: "❤️", title: "Family Culture", desc: "We treat every employee like family — because we are." },
              { icon: "📈", title: "Growth Opportunities", desc: "Promote from within. Build your career with us." },
              { icon: "💪", title: "Benefits", desc: "Competitive pay and benefits for full-time team members." },
            ].map((b) => (
              <div key={b.title}>
                <div className="text-4xl mb-3">{b.icon}</div>
                <h3 className="text-bg font-bold text-lg mb-1">{b.title}</h3>
                <p className="text-bg/70 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
