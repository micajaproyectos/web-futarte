import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import { MAPS_URL } from "@/lib/seo";
import logoTransparente from "../../public/logo_transparente.svg";

const INSTAGRAM_URL = "https://www.instagram.com/_futaartesouvenir_";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
const WHATSAPP_DISPLAY = "+56 9 9150 2017";

const linkClass =
  "text-muted underline-offset-4 transition-colors hover:text-text hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark";

const colTitleClass =
  "mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-text";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-bone">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Logo + concepto */}
        <div className="flex flex-col gap-4">
          <Image
            src={logoTransparente}
            alt="Futarte — más patagonia"
            width={176}
            height={176}
            className="h-auto w-44"
          />
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
          <ul className="flex flex-col gap-2 text-sm text-muted">
            <li>Lunes a sábado: 9:00 – 20:00</li>
            <li>Domingo: cerrado</li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h2 className={colTitleClass}>Contacto</h2>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Manuel Rodríguez 10, Futaleufú
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Instagram
              </a>
            </li>
            <li>
              <a href="mailto:futaleufusouvenir@gmail.com" className={linkClass}>
                futaleufusouvenir@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs sm:flex-row">
          <p className="text-muted">
            © {year} Futarte. Hecho en Futaleufú, Patagonia.
          </p>
          <a
            href="https://amtecnologia.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
          >
            Creado por
            <span className="font-bold">
              <span className="bg-gradient-to-r from-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent">
                AM
              </span>
              <span className="text-text">Tecnología</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
