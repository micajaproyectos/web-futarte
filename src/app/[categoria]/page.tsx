import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, getCategoryBySlug } from "@/data/categories";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { MountainMotif } from "@/components/MountainMotif";
import { Reveal } from "@/components/Reveal";

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
    description: cat.descripcion, // TODO: copy SEO final por categoría
  };
}

export default async function CategoryPage({ params }: Props) {
  const { categoria } = await params;
  const cat = getCategoryBySlug(categoria);
  if (!cat) notFound();

  const categoryProducts = products.filter((p) => p.categoria === cat.slug);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      {/* ── ENCABEZADO ────────────────────────────────────────── */}
      <header className="mb-12 grid gap-8 md:grid-cols-2 md:items-center">
        <SectionHeading
          as="h1"
          eyebrow="Categoría"
          title={cat.nombre}
          description={cat.descripcion}
        />
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-surface">
          <Image
            src={cat.imagen}
            alt={cat.nombre}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </header>

      {/* ── GRILLA DE PRODUCTOS ───────────────────────────────── */}
      {categoryProducts.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-surface px-6 py-20 text-center">
          <MountainMotif variant="mark" className="h-12 w-12 text-muted" />
          <p className="text-muted">
            {/* TODO: quitar este mensaje cuando haya productos reales */}
            Próximamente productos en esta categoría.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryProducts.map((product, i) => (
            <Reveal key={product.id} delay={(i % 3) * 70}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      )}
    </main>
  );
}
