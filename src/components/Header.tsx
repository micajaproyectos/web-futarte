import Link from "next/link";
import Image from "next/image";
import logoFutarte from "../../public/logo.png";

/**
 * Header global. Marca = logo.png (lockup completo).
 * El PNG trae fondo blanco; mix-blend-multiply lo funde con el crema.
 * TODO: idealmente un logo en PNG transparente o SVG.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6">
        <Link
          href="/"
          aria-label="Futarte — inicio"
          className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
        >
          <Image
            src={logoFutarte}
            alt="Futarte Souvenir"
            priority
            sizes="160px"
            className="h-12 w-auto mix-blend-multiply"
          />
        </Link>
      </div>
    </header>
  );
}
