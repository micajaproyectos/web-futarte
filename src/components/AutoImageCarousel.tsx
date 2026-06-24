"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  images: string[];
  alt: string;
  /** Intervalo entre modelos en ms. */
  interval?: number;
  /** Marca la primera imagen como candidata a LCP. */
  priority?: boolean;
  /** sizes para next/image. */
  sizes?: string;
};

export function AutoImageCarousel({
  images,
  alt,
  interval = 3000,
  priority = false,
  sizes,
}: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    // La vitrina siempre rota entre modelos. Con "reducir movimiento" el cambio
    // es instantáneo (sin deslizamiento) gracias a `motion-reduce:transition-none`
    // en la pista, pero igualmente va mostrando todos los productos.
    const id = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      interval,
    );
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Pista que se desplaza horizontalmente entre modelos */}
      <div
        className="flex h-full w-full transition-transform duration-700 ease-in-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={src} className="relative h-full w-full shrink-0">
            <Image
              src={src}
              alt={i === 0 ? alt : ""}
              fill
              sizes={sizes}
              className="object-cover"
              priority={priority && i === 0}
            />
          </div>
        ))}
      </div>

      {/* Indicadores de modelo */}
      {images.length > 1 ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
          {images.map((src, i) => (
            <span
              key={src}
              aria-hidden
              className={`h-1.5 rounded-full bg-bone transition-all duration-300 ${
                i === index ? "w-5 opacity-100" : "w-1.5 opacity-60"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
