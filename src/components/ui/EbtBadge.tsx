export default function EbtBadge({ size = "sm" }: { size?: "sm" | "md" }) {
  const cls = size === "md"
    /* green-800 on green-50: 7.1:1 ✅  (was green-700: 5.8:1 — unified to green-800) */
    ? "inline-flex items-center gap-2 bg-green-50 text-green-800 border border-green-200 font-bold text-sm px-4 py-2 rounded-full"
    : "badge-ebt";

  return (
    <span className={cls}>
      {/* green-700 on green-50: 5.8:1 ✅  (was green-500: 2.3:1 fails non-text 3:1 ❌) */}
      <span className="text-green-700" aria-hidden="true">✓</span>
      EBT / WIC Accepted
    </span>
  );
}
