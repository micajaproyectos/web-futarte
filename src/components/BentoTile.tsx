import Link from "next/link";
import Image from "next/image";

type BentoTileProps = {
  href: string;
  title: string;
  description?: string;
  image: string;
  /** Marca la imagen como candidata a LCP (solo el tile más grande). */
  priority?: boolean;
  /** Tile destacado: tipografía más grande y sinónimo visual de "featured". */
  featured?: boolean;
  /** Clases extra para el <Link> raíz (p.ej. h-full desde Reveal). */
  className?: string;
};

export function BentoTile({
  href,
  title,
  description,
  image,
  priority = false,
  featured = false,
  className = "",
}: BentoTileProps) {
  return (
    <Link
      href={href}
      className={[
        "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface",
        "transition-colors hover:border-accent-dark",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark",
        className,
      ].join(" ")}
    >
      {/* Imagen — overflow-hidden contiene el scale del hover */}
      <div className="relative min-h-0 flex-1 overflow-hidden bg-bg">
        <Image
          src={image}
          alt={title}
          fill
          sizes={
            featured
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 50vw, 25vw"
          }
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
          priority={priority}
        />
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
        <div className="min-w-0">
          <h3
            className={`truncate font-semibold text-text transition-colors group-hover:text-accent-dark ${
              featured ? "text-lg" : "text-base"
            }`}
          >
            {title}
          </h3>
          {description ? (
            <p className="truncate text-sm text-muted">{description}</p>
          ) : null}
        </div>
        <span
          aria-hidden
          className="shrink-0 text-muted transition-colors group-hover:text-accent-dark"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
