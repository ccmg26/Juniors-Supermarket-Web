import EventForm from "../EventForm";
export default function NewEventPage() {
  return (
    <div>
      <h1 className="text-2xl font-black text-brand-black mb-6">Add Event</h1>
      <div className="bg-white rounded-2xl border border-gray-100 p-6"><EventForm /></div>
    </div>
  );
}
