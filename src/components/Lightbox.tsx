"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

/**
 * Modal que muestra una imagen ampliada (lightbox). Cierra con la X,
 * clic en el fondo o tecla Escape; bloquea el scroll del fondo.
 *
 * Se renderiza con un portal a <body>: así el `position: fixed` se mide
 * respecto a la ventana y NO se ve afectado por el `transform` de la
 * tarjeta (que lo encogería y provocaría parpadeo por el hover).
 */
export function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Solo se monta en cliente (al hacer clic), así que document existe.
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar imagen"
        className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-bg/90 text-text shadow-sm backdrop-blur transition-colors hover:bg-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark sm:right-5 sm:top-5"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {/* Detener la propagación para que el clic sobre la imagen no cierre */}
      <Image
        src={src}
        alt={alt}
        width={1254}
        height={1254}
        sizes="(max-width: 768px) 92vw, 760px"
        onClick={(e) => e.stopPropagation()}
        className="h-auto max-h-[88vh] w-auto max-w-[92vw] rounded-lg object-contain shadow-2xl"
      />
    </div>,
    document.body,
  );
}
