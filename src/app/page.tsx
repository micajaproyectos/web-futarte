import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import heroFutarte from "../../public/futaerte.png";
import minimalistaLogo from "../../public/minimalista_logo.png";
import fotoCreadores from "../../public/foto_creadores.png";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { BentoTile } from "@/components/BentoTile";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MountainMotif } from "@/components/MountainMotif";
import { Reveal } from "@/components/Reveal";
import { Typewriter } from "@/components/Typewriter";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const [featuredCategory, ...restCategories] = categories;

  // Imágenes de los productos de una categoría (incluye cada variante de color).
  // Alimentan el carrusel automático de los tiles del catálogo del home.
  const imagesForCategory = (slug: string) =>
    products
      .filter((p) => p.categoria === slug)
      .flatMap((p) =>
        p.colores?.length ? p.colores.map((c) => c.imagen) : [p.imagen],
      );

  const featuredImages = featuredCategory
    ? imagesForCategory(featuredCategory.slug)
    : [];

  return (
    <main className="flex flex-col">
      {/* ── HERO ──────────────────────────────────────────────────────
          sticky + z-0 → el catálogo sube encima al scrollear.
          La <Image> tiene priority y SIN fade (es el LCP).
      ──────────────────────────────────────────────────────────────── */}
      <section className="sticky top-0 z-0 md:grid md:items-center md:grid-cols-[5fr_7fr]">
        {/* Texto — entrada escalonada above-the-fold vía CSS puro.
            En móvil va SOBRE la foto (que pasa a fondo full-bleed, ver más abajo)
            dentro de un panel claro semitransparente para mantener la legibilidad.
            En md+ el panel se desactiva y vuelve a ser la columna izquierda. */}
        <div className="relative z-10 px-6 py-16 sm:px-10 md:col-start-1 md:row-start-1 md:py-24">
          <div className="flex max-w-md flex-col items-start gap-6 rounded-2xl border border-border/60 bg-bone/85 p-6 shadow-sm backdrop-blur-sm sm:p-8 md:max-w-none md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none">
          <h1 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-text sm:text-5xl lg:text-6xl">
            {/* TODO: titular final */}
            <Typewriter text="Llévate una parte de Futaleufú" speed={77} />
          </h1>
          <p className="animate-fade-up max-w-md text-lg leading-relaxed text-muted [--anim-delay:80ms]">
            {/* TODO: copy final */}
            Souvenirs y regalos con la identidad de Futaleufú, en la Patagonia
            chilena: ropa, recuerdos y piezas únicas para llevar el sur contigo.
          </p>
          {/* Isotipo minimalista (fondo transparente) — refuerzo de marca */}
          <Image
            src={minimalistaLogo}
            alt="Futarte"
            width={88}
            height={88}
            className="animate-fade-up h-auto w-[88px] [--anim-delay:120ms]"
          />
          <Link
            href="#categorias"
            className="animate-fade-up inline-flex items-center justify-center rounded-full bg-text px-8 py-3 text-sm font-semibold text-bg [--anim-delay:160ms] transition-[color,background-color,border-color,transform,box-shadow] duration-150 hover:-translate-y-px hover:bg-accent-dark hover:shadow-sm motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
          >
            {/* TODO: copy CTA */}
            Ver el catálogo
          </Link>
          </div>
        </div>

        {/* Imagen — en móvil es el FONDO full-bleed del hero (absolute inset-0,
            detrás del panel de texto). En md+ vuelve a ser la columna derecha
            con relación 3:2 idéntica a la del archivo (1536×1024): object-cover
            solo la reduce, nunca la amplía, evitando el pixelado. */}
        <div
          className="absolute inset-0 overflow-hidden md:relative md:inset-auto md:col-start-2 md:row-start-1 md:aspect-[3/2] md:w-full md:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,#000_7%)] md:[mask-image:linear-gradient(to_right,transparent_0%,#000_7%)]"
        >
          <div className="absolute inset-0 animate-ken-burns">
            <Image
              src={heroFutarte}
              alt="Personas con prendas Futarte frente al lago y las montañas nevadas de Futaleufú, Chile"
              fill
              priority
              quality={90}
              sizes="(max-width: 768px) 100vw, 58vw"
              className="animate-blur-in object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── MARQUESINA ────────────────────────────────────────────────
          En reposo se ve al pie del hero. Al bajar con scroll sube y se
          fija bajo el navbar (sticky top-16) + z-30 → permanece visible
          y repitiéndose por encima del catálogo (z-10) y del hero (z-0)
          durante el resto del home. Nunca aparece sobre la foto.
      ──────────────────────────────────────────────────────────────── */}
      <div className="sticky top-16 z-30 overflow-hidden border-y border-border bg-text">
        <div className="animate-marquee flex w-max whitespace-nowrap">
          {[0, 1].map((dup) => (
            <ul
              key={dup}
              aria-hidden={dup === 1}
              className="flex shrink-0 items-center"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="flex items-center gap-6 px-6 py-2.5">
                  <span className="font-display text-sm font-medium uppercase tracking-[0.3em] text-bone">
                    + Patagonia
                  </span>
                  <span aria-hidden className="text-bone/40">
                    —
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* ── CATÁLOGO ──────────────────────────────────────────────────
          z-10 + bg-bg opaco + borde superior → sube SOBRE el hero.
      ──────────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="categorias"
        className="relative z-10 border-t border-border bg-bg"
      >
        <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-16">
          <Reveal>
            <SectionHeading
              as="h2"
              id="categorias"
              eyebrow="Catálogo"
              title="Explora por categoría"
              description="Cada pieza nace en Futaleufú. Elige una categoría para ver el detalle."
              className="mb-8"
            />
          </Reveal>

          {/* Grid — Reveal es el grid-child; col-span viene aquí, no en BentoTile.
              auto-rows con minmax(...,auto) → las filas que cubre el tile destacado
              crecen para adaptarse a su imagen cuadrada en vez de recortarla. */}
          <div className="grid auto-rows-[minmax(160px,auto)] grid-cols-2 gap-3 sm:auto-rows-[minmax(200px,auto)] md:grid-cols-3 md:gap-4">
            {featuredCategory ? (
              <Reveal className="col-span-2 row-span-2" delay={0}>
                <BentoTile
                  href={`/${featuredCategory.slug}`}
                  title={featuredCategory.nombre}
                  description={featuredCategory.descripcion}
                  image={featuredCategory.imagen}
                  images={featuredImages}
                  featured
                  priority
                  aspecto="1255/1254"
                />
              </Reveal>
            ) : null}

            {restCategories.map((cat, i) => (
              <Reveal key={cat.slug} delay={(i % 3) * 70}>
                <BentoTile
                  href={`/${cat.slug}`}
                  title={cat.nombre}
                  description={cat.descripcion}
                  image={cat.imagen}
                  images={imagesForCategory(cat.slug)}
                  interval={2500}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUIÉNES SOMOS ─────────────────────────────────────────────
          Retrato protagonista: foto grande con la cita de cierre
          superpuesta, y el relato en dos columnas debajo. bg-cream
          para calidez editorial. scroll-mt-28 deja libre el header
          sticky (h-16) + la marquesina (top-16) al saltar al ancla.
      ──────────────────────────────────────────────────────────────── */}
      <section
        id="quienes-somos"
        aria-labelledby="quienes-somos-title"
        className="relative z-10 scroll-mt-28 border-y border-border bg-bone"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-20 md:py-24">
          {/* Encabezado */}
          <Reveal>
            <div className="flex max-w-2xl flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Quiénes somos
              </span>
              <div className="flex items-center gap-3 sm:gap-4">
                <MountainMotif
                  variant="mark"
                  className="h-10 w-10 shrink-0 text-accent-dark/60 sm:h-12 sm:w-12"
                />
                <h2
                  id="quienes-somos-title"
                  className="font-display text-3xl font-semibold leading-tight tracking-tight text-text sm:text-4xl"
                >
                  De vuelta a las raíces
                </h2>
              </div>
            </div>
          </Reveal>

          {/* Split editorial: retrato a un lado, relato al otro */}
          <div className="mt-10 grid items-center gap-12 lg:mt-14 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <figure className="relative mx-auto w-full max-w-md lg:mx-0">
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-surface shadow-[12px_12px_0_0_rgba(78,98,110,0.18)]">
                  <Image
                    src={fotoCreadores}
                    alt="Sergio Álvarez y Zaira Flores, fundadores de Futarte"
                    fill
                    sizes="(max-width: 1024px) 100vw, 28rem"
                    className="object-cover"
                  />
                </div>
              </figure>
            </Reveal>

            <Reveal delay={100}>
              <div className="flex flex-col gap-5">
                <span className="inline-flex w-fit flex-wrap items-center gap-2 rounded-full border border-accent-dark/30 px-3 py-1 text-xs font-medium text-accent-dark">
                  <span>Puerto Montt</span>
                  <span aria-hidden>→</span>
                  <span>Futaleufú</span>
                  <span aria-hidden className="text-accent-dark/40">
                    ·
                  </span>
                  <span className="text-muted">hace 3 años</span>
                </span>
                <p className="text-base leading-relaxed text-muted">
                  FUTARTE nació hace tres años en la ciudad de Puerto Montt,
                  impulsado por la pasión por crear y personalizar productos con
                  identidad y significado. Sin embargo, el amor por Futaleufú, el
                  pueblo que me vio crecer y donde están mis raíces, me inspiró a
                  regresar para dar vida a este hermoso emprendimiento.
                </p>
                <p className="text-base leading-relaxed text-muted">
                  Hoy, FUTARTE se dedica a la personalización y venta de
                  recuerdos y souvenirs que buscan capturar la esencia de nuestra
                  tierra, sus paisajes, su cultura y su gente. Cada creación es
                  mucho más que un producto: es una forma de llevar consigo un
                  pedacito de Futaleufú, de conservar recuerdos y de compartir el
                  orgullo de pertenecer a este rincón único de la Patagonia.
                </p>
                <p className="mt-1 font-display text-sm font-semibold uppercase tracking-[0.18em] text-text">
                  — Sergio Álvarez &amp; Zaira Flores, Futarte
                </p>
              </div>
            </Reveal>
          </div>

          {/* Cita de cierre — pull-quote protagonista */}
          <Reveal delay={140}>
            <figure className="mx-auto mt-16 max-w-3xl text-center md:mt-20">
              <MountainMotif
                variant="mark"
                className="mx-auto h-8 w-8 text-accent-dark/50"
              />
              <blockquote className="mt-4">
                <p className="font-display text-2xl font-medium leading-snug tracking-tight text-text sm:text-3xl">
                  «Volver a las raíces no es regresar al pasado, sino transformar
                  los recuerdos en sueños que siguen creciendo día a día.»
                </p>
              </blockquote>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ── PERSONALIZACIÓN ─────────────────────────────────────────────
          La <section> es hijo directo de <main> con z-10 y bg opaco,
          para cubrir el hero sticky sin que el stacking context de
          <Reveal> interfiera. Reveal anima solo el contenido interior.
      ──────────────────────────────────────────────────────────────── */}
      <section className="relative z-10 border-y border-border bg-bg">
        <Reveal>
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <SectionHeading
                as="h2"
                eyebrow="Diseños a tu medida"
                title="Personalización con sello patagónico"
                description="Adaptamos cada diseño a tu idea —nombres, fechas, paisajes de Futaleufú— manteniendo la identidad de la marca. Cuéntanos qué imaginas y lo hacemos realidad."
              />
              {/* TODO: copy final del diferenciador */}
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <MountainMotif
                variant="mark"
                className="h-14 w-14 text-muted"
                title="Diseño personalizado con identidad patagónica"
              />
              <WhatsAppButton message="Hola, quiero un diseño personalizado.">
                Pedir un diseño
              </WhatsAppButton>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── CÓMO LLEGAR ──────────────────────────────────────────────── */}
      <section className="relative z-10 border-y border-border bg-bg">
        <div className="mx-auto w-full max-w-6xl px-4 py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Datos de la tienda */}
            <Reveal>
              <div className="flex flex-col gap-6">
                <SectionHeading
                  as="h2"
                  eyebrow="Visítanos"
                  title="Cómo llegar"
                  description="Te esperamos en nuestra tienda, en pleno Futaleufú, Patagonia chilena."
                />
                <dl className="flex flex-col gap-4 text-sm">
                  <div>
                    <dt className="font-semibold uppercase tracking-[0.12em] text-text">
                      Dirección
                    </dt>
                    <dd className="mt-1 text-muted">
                      Manuel Rodríguez 10, Futaleufú
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold uppercase tracking-[0.12em] text-text">
                      Horario
                    </dt>
                    <dd className="mt-1 text-muted">
                      Lunes a sábado: 9:00 – 20:00 · Domingo cerrado
                    </dd>
                  </div>
                </dl>
                <a
                  href="https://maps.app.goo.gl/hRGoBo9AyuA74xfv9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-text px-6 py-3 text-sm font-semibold text-bg transition-[color,background-color,transform,box-shadow] duration-150 hover:-translate-y-px hover:bg-accent-dark hover:shadow-sm motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Cómo llegar
                </a>
              </div>
            </Reveal>

            {/* Mapa */}
            <Reveal delay={100}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border shadow-sm lg:aspect-[16/11]">
                <iframe
                  src="https://maps.google.com/maps?q=-43.1832852,-71.8654784&z=16&output=embed"
                  title="Ubicación de Futarte en Futaleufú"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full"
                  style={{ border: 0 }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
