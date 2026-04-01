import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "dark"
  | "outline"
  | "white-outline"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  dark: "btn-dark",
  outline: "btn-outline",
  "white-outline": "btn-white-outline",
  ghost: "btn-ghost",
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: "!px-4 !py-2 !text-sm",
  md: "",
  lg: "!px-8 !py-4 !text-base",
};

/**
 * Generate a button className string.
 * Use this when you need to style a <Link> or <a> with button appearance:
 *   <Link className={buttonVariants("dark", "lg")}>...</Link>
 */
export function buttonVariants(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  extra?: string
): string {
  const parts = [VARIANT_CLASS[variant], SIZE_CLASS[size], extra];
  return parts.filter(Boolean).join(" ");
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

/**
 * Button component for <button> elements.
 * For links, use buttonVariants() to generate the className instead:
 *   <Link className={buttonVariants("primary")}>...</Link>
 */
export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = [VARIANT_CLASS[variant], SIZE_CLASS[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
