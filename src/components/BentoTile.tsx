import Link from "next/link";
import Image from "next/image";
import { AutoImageCarousel } from "./AutoImageCarousel";

type BentoTileProps = {
  href: string;
  title: string;
  description?: string;
  image: string;
  /** Si se pasan varias imágenes, el área se convierte en un carrusel automático. */
  images?: string[];
  /** Intervalo del carrusel automático en ms (por defecto 3000). */
  interval?: number;
  /** Marca la imagen como candidata a LCP (solo el tile más grande). */
  priority?: boolean;
  /** Tile destacado: tipografía más grande y sinónimo visual de "featured". */
  featured?: boolean;
  /** Relación de aspecto del área de imagen (ej. "1255/1254"). Si se define, el
   *  contenedor se adapta al tamaño de la imagen en vez de rellenar la celda. */
  aspecto?: string;
  /** Clases extra para el <Link> raíz (p.ej. h-full desde Reveal). */
  className?: string;
};

export function BentoTile({
  href,
  title,
  description,
  image,
  images,
  interval,
  priority = false,
  featured = false,
  aspecto,
  className = "",
}: BentoTileProps) {
  const sizes = featured
    ? "(max-width: 768px) 100vw, 50vw"
    : "(max-width: 768px) 50vw, 25vw";
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
      {/* Imagen — overflow-hidden contiene el scale del hover.
          Con `aspecto`, el contenedor adopta la relación de la imagen (no recorta).
          Sin él: en móvil usa un cuadrado (aspect-square) para no recortar los
          productos —las celdas apaisadas cortaban botellas/mates—; en md+ vuelve
          a rellenar la celda del bento (flex-1), donde la alineación 2×2 funciona. */}
      <div
        className={`relative overflow-hidden bg-surface ${
          aspecto
            ? "w-full"
            : "aspect-square w-full md:aspect-auto md:w-auto md:min-h-0 md:flex-1"
        }`}
        style={aspecto ? { aspectRatio: aspecto } : undefined}
      >
        {images && images.length > 1 ? (
          <AutoImageCarousel
            images={images}
            alt={title}
            priority={priority}
            sizes={sizes}
            interval={interval}
          />
        ) : (
          <Image
            src={images?.[0] ?? image}
            alt={title}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
            priority={priority}
          />
        )}
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
