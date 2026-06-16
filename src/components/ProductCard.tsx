import Image from "next/image";
import type { Product } from "@/data/products";
import { WhatsAppButton } from "./WhatsAppButton";

const clpFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
});

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0">
      <div className="relative aspect-[4/3] bg-bg">
        <Image
          src={product.imagen}
          alt={product.nombre}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-semibold text-text">{product.nombre}</h3>
        <p className="flex-1 text-sm leading-relaxed text-muted">
          {product.descripcion}
        </p>
        <p className="text-lg font-semibold text-text">
          {clpFormatter.format(product.precio)}
        </p>
        <WhatsAppButton
          message={`Hola, me interesa el producto: ${product.nombre}`}
          className="mt-2 w-full"
        >
          Consultar por WhatsApp
        </WhatsAppButton>
      </div>
    </article>
  );
}
