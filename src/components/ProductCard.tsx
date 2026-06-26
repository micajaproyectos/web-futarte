"use client";
import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/data/products";
import { AutoImageCarousel } from "./AutoImageCarousel";
import { Lightbox } from "./Lightbox";
import { useCart } from "./cart/CartProvider";
import { formatCLP } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const colores = product.colores ?? [];
  const tieneColores = colores.length > 0;
  const [activo, setActivo] = useState(0);
  const [zoom, setZoom] = useState(false);

  // Varias fotos del mismo producto (solo cuando no hay variantes de color).
  const fotos = product.imagenes ?? [];
  const tieneFotos = !tieneColores && fotos.length > 1;

  const variante = tieneColores ? colores[activo] : null;
  const imagen = variante?.imagen ?? product.imagen;
  // Alt descriptivo con lugar → refuerza "Futaleufú" en Google Imágenes.
  const altImagen = variante
    ? `${product.nombre} ${variante.nombre} — souvenir de Futaleufú, Patagonia`
    : `${product.nombre} — souvenir de Futaleufú, Patagonia`;

  // Opciones que se eligen dentro del carrito:
  //  · poleras y polerones de adulto → color y talla
  //  · polerones infantiles → solo color
  const esRopa = product.categoria === "ropa";
  const pideTalla =
    esRopa && (product.tipo === "Poleras" || product.tipo === "Polerones");
  const pideColor = pideTalla || (esRopa && product.tipo === "Polerones Infantiles");
  const pideOpciones = pideColor || pideTalla;

  // Ítem de carrito. Las prendas con opciones reciben un id único por cada
  // "Añadir" (así dos combos color/talla del mismo modelo no se fusionan);
  // el resto mantiene id por producto + variante de color para sumar cantidad.
  const agregar = () =>
    add({
      id: pideOpciones
        ? `${product.id}--${crypto.randomUUID()}`
        : variante
          ? `${product.id}--${variante.nombre}`
          : product.id,
      nombre: variante ? `${product.nombre} (${variante.nombre})` : product.nombre,
      precio: product.precio,
      imagen,
      ...(pideColor ? { pideColor: true } : {}),
      ...(pideTalla ? { pideTalla: true } : {}),
    });

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0">
      <button
        type="button"
        onClick={() => setZoom(true)}
        aria-label={`Ampliar imagen de ${product.nombre}`}
        className="group relative block w-full cursor-zoom-in bg-surface focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent-dark"
        style={{ aspectRatio: product.aspecto ?? "3 / 2" }}
      >
        {tieneFotos ? (
          <AutoImageCarousel
            images={fotos}
            alt={altImagen}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <Image
            src={imagen}
            alt={altImagen}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        )}
        {/* Indicador de zoom (aparece al pasar el mouse) */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-bg/85 text-text opacity-0 shadow-sm backdrop-blur transition-opacity duration-200 group-hover:opacity-100"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
          </svg>
        </span>
      </button>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {tieneColores ? (
          <div
            role="group"
            aria-label="Color disponible"
            className="flex items-center gap-2.5"
          >
            {colores.map((c, i) => {
              const seleccionado = i === activo;
              return (
                <button
                  key={c.nombre}
                  type="button"
                  onClick={() => setActivo(i)}
                  aria-pressed={seleccionado}
                  aria-label={`Color ${c.nombre}`}
                  title={c.nombre}
                  className={`h-6 w-6 rounded-full transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark ${
                    seleccionado
                      ? "ring-2 ring-text ring-offset-2 ring-offset-surface"
                      : "ring-1 ring-border hover:ring-text/40"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              );
            })}
          </div>
        ) : null}
        <h3 className="line-clamp-2 min-h-[3rem] font-semibold text-text">
          {product.nombre}
        </h3>
        <p className="line-clamp-3 min-h-[3.75rem] text-sm leading-relaxed text-muted">
          {product.descripcion}
        </p>
        {/* Espaciador: empuja precio y botón al fondo para alinearlos en todas las tarjetas */}
        <div className="flex-1" />
        <p className="text-lg font-semibold text-text">
          {formatCLP(product.precio)}
        </p>
        <button
          type="button"
          onClick={agregar}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-text px-6 py-3 text-sm font-semibold text-bg transition-[color,background-color,transform,box-shadow] duration-150 hover:-translate-y-px hover:bg-accent-dark hover:shadow-sm motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Añadir
        </button>
      </div>

      {zoom ? (
        <Lightbox src={imagen} alt={altImagen} onClose={() => setZoom(false)} />
      ) : null}
    </article>
  );
}
