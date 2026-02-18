interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  as?: "input" | "textarea" | "select";
  children?: React.ReactNode;
  rows?: number;
}

export default function FormField({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  as = "input",
  children,
  rows = 4,
}: FormFieldProps) {
  const base = "input-base";

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-brand-black mb-1.5">
        {label} {required && <span className="text-brand-red">*</span>}
      </label>
      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          required={required}
          placeholder={placeholder}
          rows={rows}
          className={base}
        />
      ) : as === "select" ? (
        <select id={name} name={name} required={required} className={base}>
          {children}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={base}
        />
      )}
    </div>
  );
}
