import Link from "next/link";
import Image from "next/image";
import heroFutaleufu from "../../public/futaleufu-chile.jpg";
import { categories } from "@/data/categories";
import { BentoTile } from "@/components/BentoTile";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MountainMotif } from "@/components/MountainMotif";
import { Reveal } from "@/components/Reveal";

export default function HomePage() {
  const [featuredCategory, ...restCategories] = categories;

  return (
    <main className="flex flex-col">
      {/* ── HERO ──────────────────────────────────────────────────────
          sticky + z-0 → el catálogo sube encima al scrollear.
          La <Image> tiene priority y SIN fade (es el LCP).
      ──────────────────────────────────────────────────────────────── */}
      <section className="sticky top-0 z-0 grid min-h-screen items-stretch md:grid-cols-[5fr_7fr]">
        {/* Texto — entrada escalonada above-the-fold vía CSS puro */}
        <div className="flex flex-col items-start justify-center gap-6 px-6 py-16 sm:px-10 md:py-24">
          <h1 className="animate-fade-up font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-text sm:text-5xl lg:text-6xl">
            {/* TODO: titular final */}
            Llévate una parte de la Patagonia
          </h1>
          <p className="animate-fade-up max-w-md text-lg leading-relaxed text-muted [--anim-delay:80ms]">
            {/* TODO: copy final */}
            Souvenirs personalizados con identidad de Futaleufú: ropa, regalos y
            piezas para recordar el sur.
          </p>
          <Link
            href="#categorias"
            className="animate-fade-up inline-flex items-center justify-center rounded-full bg-text px-8 py-3 text-sm font-semibold text-bg [--anim-delay:160ms] transition-[color,background-color,border-color,transform,box-shadow] duration-150 hover:-translate-y-px hover:bg-accent-dark hover:shadow-sm motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
          >
            {/* TODO: copy CTA */}
            Ver el catálogo
          </Link>
        </div>

        {/* Imagen — 30% paisaje desenfocado · 70% productos protagonistas */}
        <div className="relative min-h-[260px] overflow-hidden md:min-h-[540px]">

          {/* Capa 1: paisaje con ken-burns + desenfoque fuerte.
              [inset:-12%] extiende el div 12 % en cada lado para que el
              borde difuminado quede fuera del overflow:hidden del padre. */}
          <div className="absolute inset-0">
            <div className="absolute [inset:-12%] animate-ken-burns">
              <Image
                src={heroFutaleufu}
                alt=""
                fill
                priority
                aria-hidden
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover [filter:blur(2px)_brightness(0.95)]"
              />
            </div>
          </div>

          {/* Capa 2: gradiente inferior — enraíza los productos en el encuadre */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Capa 3: productos en primer plano.
              items-end los ancla a la base; mb-* en el secundario lo eleva
              para dar profundidad sin animar nada. */}
          <div className="relative z-10 flex h-full items-end justify-center gap-3 px-4 pb-6 md:gap-8 md:pb-10">

            {/* Protagonista — polera */}
            <div className="relative h-[220px] w-[148px] shrink-0 drop-shadow-2xl md:h-[480px] md:w-[310px]">
              <Image
                src="/polera_futaleufu_verde.png"
                alt="Polera Futaleufú"
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Secundario — botella, elevada para dar perspectiva */}
            <div className="relative mb-10 h-[168px] w-[84px] shrink-0 drop-shadow-xl md:mb-24 md:h-[340px] md:w-[168px]">
              <Image
                src="/botella_blanca_futaleufu.png"
                alt="Botella Futaleufú"
                fill
                className="object-contain"
              />
            </div>

          </div>
        </div>
      </section>

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

          {/* Grid — Reveal es el grid-child; col-span viene aquí, no en BentoTile */}
          <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:grid-cols-3 md:gap-4">
            {featuredCategory ? (
              <Reveal className="col-span-2 row-span-2" delay={0}>
                <BentoTile
                  href={`/${featuredCategory.slug}`}
                  title={featuredCategory.nombre}
                  description={featuredCategory.descripcion}
                  image={featuredCategory.imagen}
                  featured
                  priority
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
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERSONALIZACIÓN ─────────────────────────────────────────── */}
      <Reveal>
        <section className="relative z-10 border-y border-border bg-surface">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 py-20 md:flex-row md:items-center md:justify-between">
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
        </section>
      </Reveal>

      {/* ── CONTACTO / WHATSAPP ─────────────────────────────────────── */}
      <Reveal>
        <section className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24">
          <div className="flex flex-col items-center gap-6 text-center">
            <MountainMotif variant="divider" className="h-8 w-48 text-border" />
            <SectionHeading
              as="h2"
              align="center"
              eyebrow="Compra por WhatsApp"
              title="Sin carrito: te atendemos directo"
              description="Escríbenos y coordinamos tu pedido, personalización y envío por mensaje. Respondemos en horario de atención."
            />
            {/* TODO: copy final */}
            <WhatsAppButton message="Hola, quiero hacer un pedido.">
              Escribir por WhatsApp
            </WhatsAppButton>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
