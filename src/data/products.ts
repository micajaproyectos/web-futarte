export type Categoria = "ropa" | "souvenir" | "artesania";

export type Product = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number; // pesos CLP, sin decimales
  imagen: string; // ruta relativa a /public o URL externa
  categoria: Categoria;
};

export const products: Product[] = [
  {
    id: "polera-futaleufu-verde",
    nombre: "Polera Futaleufú",
    descripcion: "Polera de algodón con diseño exclusivo de Futaleufú. Disponible en tallas S a XXL.",
    precio: 18000,
    imagen: "/polera_futaleufu_verde.png",
    categoria: "ropa",
  },
  {
    id: "gorra-chucao-crema",
    nombre: "Gorra Chucao",
    descripcion: "Gorra con bordado del chucao, ave emblema de la Patagonia. Talla única ajustable.",
    precio: 12000,
    imagen: "/gorra_chucao_crema.png",
    categoria: "ropa",
  },
  {
    id: "botella-blanca-futaleufu",
    nombre: "Botella Futaleufú",
    descripcion: "Botella reutilizable con diseño ilustrado de los paisajes de Futaleufú.",
    precio: 15000,
    imagen: "/botella_blanca_futaleufu.png",
    categoria: "souvenir",
  },
  {
    id: "mate-blanco",
    nombre: "Mate Patagónico",
    descripcion: "Mate de cerámica blanca con motivos del sur. Ideal como regalo o recuerdo.",
    precio: 22000,
    imagen: "/mate_blanco.png",
    categoria: "artesania",
  },
];
