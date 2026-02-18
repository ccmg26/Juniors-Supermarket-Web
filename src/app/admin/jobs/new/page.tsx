import JobForm from "../JobForm";
export default function NewJobPage() {
  return (
    <div>
      <h1 className="text-2xl font-black text-fg mb-6">Post a Job</h1>
      <div className="bg-card rounded-2xl border border-border p-6"><JobForm /></div>
    </div>
  );
}
