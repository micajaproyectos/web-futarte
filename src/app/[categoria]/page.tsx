import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, getCategoryBySlug } from "@/data/categories";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { MountainMotif } from "@/components/MountainMotif";
import { JsonLd } from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo";

type Props = { params: Promise<{ categoria: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const cat = getCategoryBySlug(categoria);
  if (!cat) return {};

  return {
    title: cat.nombre,
    description: cat.descripcion,
    alternates: { canonical: `/${cat.slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { categoria } = await params;
  const cat = getCategoryBySlug(categoria);
  if (!cat) notFound();

  const categoryProducts = products.filter((p) => p.categoria === cat.slug);

  // Agrupa por `tipo` conservando el orden de aparición → cada tipo = una fila
  const groups = categoryProducts.reduce<{ tipo?: string; items: typeof products }[]>(
    (acc, product) => {
      const group = acc.find((g) => g.tipo === product.tipo);
      if (group) group.items.push(product);
      else acc.push({ tipo: product.tipo, items: [product] });
      return acc;
    },
    [],
  );

  const breadcrumb = getBreadcrumbSchema([
    { name: "Inicio", path: "/" },
    { name: cat.nombre, path: `/${cat.slug}` },
  ]);

  return (
    // overflow-x-clip → la fila full-bleed no genera scroll horizontal de página
    <main className="w-full overflow-x-clip py-12">
      <JsonLd data={breadcrumb} />
      {/* ── ENCABEZADO (contenido constreñido al contenedor) ──── */}
      <header className="mx-auto mb-12 grid w-full max-w-6xl gap-8 px-4 md:grid-cols-2 md:items-center">
        <SectionHeading
          as="h1"
          eyebrow="Categoría"
          title={cat.nombre}
          description={cat.descripcion}
        />
        <div
          className="relative overflow-hidden rounded-xl border border-border bg-surface"
          style={{ aspectRatio: cat.aspecto ?? "16 / 9" }}
        >
          <Image
            src={cat.imagen}
            alt={`${cat.nombre} de Futaleufú — Futarte, Patagonia chilena`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </header>

      {/* ── PRODUCTOS ─────────────────────────────────────────── */}
      {categoryProducts.length === 0 ? (
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 rounded-xl border border-border bg-surface px-6 py-20 text-center">
          <MountainMotif variant="mark" className="h-12 w-12 text-muted" />
          <p className="text-muted">
            {/* TODO: quitar este mensaje cuando haya productos reales */}
            Próximamente productos en esta categoría.
          </p>
        </div>
      ) : (
        // Una grilla por cada tipo (p. ej. Poleras, Gorras): hasta 4 por fila
        <div className="flex flex-col gap-12">
          {groups.map((group) => (
            <div key={group.tipo ?? "general"}>
              {group.tipo ? (
                <h2 className="mx-auto mb-4 w-full max-w-6xl px-4 font-display text-xl font-semibold text-text">
                  {group.tipo}
                </h2>
              ) : null}
              <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
                {group.items.map((product, i) => (
                  <Reveal key={product.id} delay={(i % 4) * 70}>
                    <ProductCard product={product} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
