import type { ReactNode } from "react";
import { Reveal } from "./Section";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2";

const variants = {
  primary:
    "bg-brand-blue text-white shadow-card hover:-translate-y-0.5 hover:bg-brand-navy hover:shadow-lg",
  secondary:
    "border-2 border-brand-blue bg-white text-brand-blue hover:bg-brand-blue hover:text-white",
  ghost:
    "bg-transparent text-brand-navy underline-offset-4 hover:bg-brand-blue/5 hover:underline",
};

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  return (
    <Reveal>
      <a href={href} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </a>
    </Reveal>
  );
}
