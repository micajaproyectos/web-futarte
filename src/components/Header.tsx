import Link from "next/link";
import Image from "next/image";
import logoFutarte from "../../public/logo_trasnparente.png";
import { categories } from "@/data/categories";
import { MobileNav } from "./MobileNav";
import { CartButton } from "./cart/CartButton";

/**
 * Header global. Marca = logo.png (lockup completo).
 * El PNG trae fondo blanco; mix-blend-multiply lo funde con el crema.
 * TODO: idealmente un logo en PNG transparente o SVG.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bone">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6">
        <Link
          href="/"
          aria-label="Futarte — inicio"
          className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
        >
          <Image
            src={logoFutarte}
            alt="Futarte — más patagonia"
            priority
            sizes="140px"
            className="h-14 w-auto"
          />
        </Link>

        {/* Lado derecho: nav (desktop) + carrito + hamburguesa (móvil) */}
        <div className="ml-auto flex items-center gap-1 sm:gap-4">
          <nav
            aria-label="Categorías"
            className="hidden items-center gap-6 sm:flex"
          >
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="text-sm font-medium text-black underline-offset-4 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
              >
                {cat.nombre}
              </Link>
            ))}
            <Link
              href="/#quienes-somos"
              className="text-sm font-medium text-black underline-offset-4 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
            >
              Quiénes somos
            </Link>
          </nav>

          <CartButton />

          {/* Navegación móvil (< sm): hamburguesa con desplegable */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
