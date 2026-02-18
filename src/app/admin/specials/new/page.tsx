import SpecialForm from "../SpecialForm";
export default function NewSpecialPage() {
  return (
    <div>
      <h1 className="text-2xl font-black text-brand-black mb-6">Add Special</h1>
      <div className="bg-white rounded-2xl border border-gray-100 p-6"><SpecialForm /></div>
    </div>
  );
}
