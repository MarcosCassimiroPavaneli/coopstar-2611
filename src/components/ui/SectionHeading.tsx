import { Reveal } from "./Section";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <Reveal className={`max-w-2xl ${alignClass} mb-12`}>
      <p className="mb-3 text-sm font-bold uppercase tracking-widest text-brand-sky">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
