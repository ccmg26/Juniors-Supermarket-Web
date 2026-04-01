import { createClient } from "@/lib/supabase/server";
import HomepageSettingsForm from "./HomepageSettingsForm";
import type { SiteSettings } from "@/types";

export default async function AdminHomepagePage() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  const settings = data as SiteSettings | null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-fg">Homepage Content</h1>
        <p className="text-muted-fg text-sm mt-1">
          Manage the text and messaging shown on the public homepage.
        </p>
      </div>

      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-2xl p-4">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Note:</span> Changes here update the live website immediately after saving.
          The hero image and store stats are managed separately in code.
        </p>
      </div>

      <HomepageSettingsForm settings={settings} />
    </div>
  );
}
