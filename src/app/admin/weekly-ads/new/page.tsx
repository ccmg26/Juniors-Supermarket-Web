import Link from "next/link";
import WeeklyAdForm from "../WeeklyAdForm";

export default function NewWeeklyAdPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/weekly-ads" className="text-muted-fg hover:text-fg text-sm">
          ← Weekly Ads
        </Link>
        <span className="text-muted-fg">/</span>
        <h1 className="text-2xl font-black text-fg">New Ad</h1>
      </div>
      <WeeklyAdForm />
    </div>
  );
}
