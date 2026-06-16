type SectionHeadingProps = {
  title: string;
  /** Pequeño rótulo superior (uppercase, gris). */
  eyebrow?: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

export function SectionHeading({
  title,
  eyebrow,
  description,
  align = "left",
  as = "h2",
  id,
  className = "",
}: SectionHeadingProps) {
  const Tag = as;
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignment} ${className}`}>
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          {eyebrow}
        </span>
      ) : null}
      <Tag
        id={id}
        className={
          as === "h1"
            ? "font-display text-4xl font-semibold leading-tight tracking-tight text-text sm:text-5xl"
            : "font-display text-2xl font-semibold leading-tight tracking-tight text-text sm:text-3xl"
        }
      >
        {title}
      </Tag>
      {description ? (
        <p className="text-base leading-relaxed text-muted sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
