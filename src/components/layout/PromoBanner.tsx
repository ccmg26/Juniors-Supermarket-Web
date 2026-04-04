import { createClient } from "@/lib/supabase/server";

const STYLE_CLASSES: Record<string, string> = {
  red:    "bg-brand text-brand-fg",
  yellow: "bg-yellow-400 text-yellow-900",
  green:  "bg-green-600 text-white",
  blue:   "bg-blue-600 text-white",
  dark:   "bg-fg text-bg",
};

export default async function PromoBanner() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("banner_active, banner_text, banner_link_url, banner_link_label, banner_style")
    .eq("id", 1)
    .maybeSingle();

  if (!settings?.banner_active || !settings.banner_text) return null;

  const style = STYLE_CLASSES[settings.banner_style ?? "red"] ?? STYLE_CLASSES.red;

  return (
    <div className={`${style} text-center text-sm font-semibold py-2.5 px-4`} role="banner">
      <span>{settings.banner_text}</span>
      {settings.banner_link_url && settings.banner_link_label && (
        <>
          {" "}
          <a
            href={settings.banner_link_url}
            className="underline underline-offset-2 opacity-90 hover:opacity-100 font-bold"
          >
            {settings.banner_link_label} →
          </a>
        </>
      )}
    </div>
  );
}
