import WeeklyAdForm from "../WeeklyAdForm";

export default function NewWeeklyAdPage() {
  return (
    <div>
      <h1 className="text-2xl font-black text-brand-black mb-6">Upload Weekly Ad</h1>
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <WeeklyAdForm />
      </div>
    </div>
  );
}
