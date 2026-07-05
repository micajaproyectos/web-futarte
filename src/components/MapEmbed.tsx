"use client";
import { useState } from "react";
import Image from "next/image";

/**
 * Facade del mapa de "Cómo llegar": muestra una vista previa estática
 * (tiles de OpenStreetMap generados a partir de la misma coordenada) y
 * solo carga el iframe de Google Maps —~400 KiB de JS— cuando el
 * visitante hace clic. Rellena el contenedor posicionado del padre.
 */
export function MapEmbed() {
  const [cargado, setCargado] = useState(false);

  if (cargado) {
    return (
      <iframe
        src="https://maps.google.com/maps?q=-43.1832852,-71.8654784&z=16&output=embed"
        title="Ubicación de Futarte en Futaleufú"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full"
        style={{ border: 0 }}
      />
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setCargado(true)}
        aria-label="Cargar el mapa interactivo de Google Maps"
        className="group absolute inset-0 block h-full w-full cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent-dark"
      >
        <Image
          src="/mapa_futaleufu.webp"
          alt="Mapa de Futaleufú con la ubicación de la tienda Futarte, en Manuel Rodríguez 10"
          fill
          sizes="(max-width: 1024px) 100vw, 560px"
          quality={65}
          className="object-cover"
        />
        {/* Abajo y centrado para no tapar el pin de la tienda */}
        <span className="absolute inset-0 flex items-end justify-center pb-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-text/90 px-5 py-2.5 text-sm font-semibold text-bg shadow-sm backdrop-blur transition-[background-color,transform] duration-150 group-hover:-translate-y-px group-hover:bg-accent-dark motion-reduce:group-hover:translate-y-0">
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
            Ver mapa interactivo
          </span>
        </span>
      </button>
      {/* Atribución requerida por la licencia de OpenStreetMap (vista previa) */}
      <a
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-1 right-2 rounded bg-bg/70 px-1.5 text-[10px] leading-relaxed text-muted backdrop-blur-sm hover:underline"
      >
        © OpenStreetMap
      </a>
    </>
  );
}
