import JobForm from "../JobForm";
export default function NewJobPage() {
  return (
    <div>
      <h1 className="text-2xl font-black text-brand-black mb-6">Post a Job</h1>
      <div className="bg-white rounded-2xl border border-gray-100 p-6"><JobForm /></div>
    </div>
  );
}
