import type { Categoria } from "./products";

export type Category = {
  slug: Categoria;
  nombre: string;
  descripcion: string;
  imagen: string;
};

export const categories: Category[] = [
  {
    slug: "ropa",
    nombre: "Ropa",
    descripcion: "Prendas con identidad patagónica: poleras, gorras y más.",
    imagen: "/polera_futaleufu_verde.png",
  },
  {
    slug: "souvenir",
    nombre: "Souvenir",
    descripcion: "Objetos para llevar un pedazo de Futaleufú a casa.",
    imagen: "/botella_blanca_futaleufu.png",
  },
  {
    slug: "artesania",
    nombre: "Artesanía",
    descripcion: "Piezas elaboradas a mano con materiales del sur de Chile.",
    imagen: "/mate_blanco.png",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
