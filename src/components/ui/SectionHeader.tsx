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
        /* light=true = dark section: text-bg/60 (white/60) for legibility ✅
           light=false = light section: label-eyebrow = text-brand on bg-bg ✅ */
        <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${light ? "text-bg/60" : "label-eyebrow"}`}>
          {label}
        </p>
      )}
      <h2 className={`text-3xl sm:text-4xl font-black leading-tight ${light ? "text-bg" : "text-fg"}`}>
        {title}
      </h2>
      {subtitle && (
        /* light=true: text-bg/80 on dark bg ✅ | light=false: text-muted-fg on light bg ✅ */
        <p className={`mt-3 text-base sm:text-lg leading-relaxed ${light ? "text-bg/80" : "text-muted-fg"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
