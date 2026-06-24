import type { Categoria } from "./products";

export type Category = {
  slug: Categoria;
  nombre: string;
  descripcion: string;
  imagen: string;
  aspecto?: string; // relación de aspecto de la imagen de portada; por defecto "16/9"
};

export const categories: Category[] = [
  {
    slug: "ropa",
    nombre: "Ropa",
    descripcion:
      "Poleras, polerones y gorros con diseños de Futaleufú y la fauna patagónica. Algodón de calidad con identidad del sur de Chile.",
    imagen: "/ropa/poleras/polera_futaleufu_chile.png",
    aspecto: "1254/1254",
  },
  {
    slug: "souvenir",
    nombre: "Souvenir",
    descripcion:
      "Botellas, termos y recuerdos de Futaleufú para llevar contigo la esencia de la Patagonia chilena.",
    imagen: "/botellas/botella_futaleufu2_blanca.png",
    aspecto: "1254/1254",
  },
  {
    slug: "piezas-unicas",
    nombre: "Piezas Únicas",
    descripcion:
      "Mates, vasos esmaltados y piezas artesanales únicas inspiradas en Futaleufú y la Patagonia.",
    imagen: "/piezasunicas/mate_dibujo_emoji.png",
    aspecto: "1254/1254",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
