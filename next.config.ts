import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    // CSS inline en <head>: elimina el request render-blocking del .css.
    // Ideal aquí: Tailwind atómico (~9 KiB) + visitantes mayoritariamente
    // nuevos en redes móviles. Revisar al actualizar Next (es experimental).
    inlineCss: true,
  },
  images: {
    // AVIF primero (≈20-30% más liviano que WebP a igual calidad visual),
    // con WebP como fallback para navegadores sin soporte.
    formats: ["image/avif", "image/webp"],
    // Calidades permitidas para next/image (Next 16 las exige explícitas).
    qualities: [75, 90],
  },
};

export default nextConfig;
