interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  center = false,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={center ? "text-center" : ""}>
      {label && (
        <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${light ? "text-brand-red" : "text-brand-red"}`}>
          {label}
        </p>
      )}
      <h2 className={`text-3xl sm:text-4xl font-black leading-tight ${light ? "text-white" : "text-brand-black"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-base sm:text-lg leading-relaxed ${light ? "text-gray-300" : "text-brand-gray"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
