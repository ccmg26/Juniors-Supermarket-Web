import WeeklyAdForm from "../WeeklyAdForm";

export default function NewWeeklyAdPage() {
  return (
    <div>
      <h1 className="text-2xl font-black text-fg mb-6">Upload Weekly Ad</h1>
      <div className="bg-card rounded-2xl border border-border p-6">
        <WeeklyAdForm />
      </div>
    </div>
  );
}
