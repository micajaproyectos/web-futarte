import Link from "next/link";
import { categories } from "@/data/categories";
import { MountainMotif } from "./MountainMotif";

// TODO: redes reales de Futarte (Instagram / Facebook / etc.).
const socials = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
];

const linkClass =
  "text-muted underline-offset-4 transition-colors hover:text-text hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark";

const colTitleClass =
  "mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-text";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Logo + concepto */}
        <div className="flex flex-col gap-3">
          {/* TODO: reemplazar wordmark por el logo real */}
          <span className="font-display text-xl font-semibold uppercase tracking-[0.12em] text-text">Futarte</span>
          <MountainMotif variant="divider" className="h-7 w-32 text-border" />
          <p className="text-sm leading-relaxed text-muted">
            {/* TODO: copy final */}
            Souvenirs personalizados con identidad patagónica de Futaleufú.
          </p>
        </div>

        {/* Categorías (data-driven) */}
        <nav aria-label="Categorías">
          <h2 className={colTitleClass}>Categorías</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/${cat.slug}`} className={linkClass}>
                  {cat.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Horario */}
        <div>
          <h2 className={colTitleClass}>Horario</h2>
          {/* TODO: horario real de atención */}
          <ul className="flex flex-col gap-2 text-sm text-muted">
            <li>Lunes a viernes: 10:00 – 18:00</li>
            <li>Sábado: 10:00 – 14:00</li>
            <li>Domingo: cerrado</li>
          </ul>
        </div>

        {/* Redes */}
        <div>
          <h2 className={colTitleClass}>Síguenos</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted">
          © {year} Futarte. Hecho en Futaleufú, Patagonia. {/* TODO: copy legal */}
        </p>
      </div>
    </footer>
  );
}
