export default function EbtBadge({ size = "sm" }: { size?: "sm" | "md" }) {
  const cls = size === "md"
    ? "inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 font-bold text-sm px-4 py-2 rounded-full"
    : "badge-ebt";

  return (
    <span className={cls}>
      <span className="text-green-500">✓</span>
      EBT / WIC Accepted
    </span>
  );
}
