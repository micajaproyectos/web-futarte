export type Categoria = "ropa" | "souvenir" | "piezas-unicas";

export type ColorVariante = {
  nombre: string; // etiqueta del color (ej. "Verde")
  hex: string; // color del círculo selector
  imagen: string; // foto del producto en ese color
};

export type Product = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number; // pesos CLP, sin decimales
  imagen: string; // ruta relativa a /public o URL externa (foto principal)
  imagenes?: string[]; // fotos adicionales del mismo producto → la tarjeta rota entre ellas
  categoria: Categoria;
  tipo?: string; // subgrupo dentro de la categoría → cada tipo se muestra en su propia fila
  aspecto?: string; // relación de aspecto del contenedor de imagen (ej. "1/1"); por defecto "3/2"
  // Variantes de color: si se definen, la tarjeta muestra círculos selectores
  // y cambia la imagen al elegir uno. La 1.ª variante es la activa por defecto.
  colores?: ColorVariante[];
};

export const products: Product[] = [
  // ── ROPA · Poleras ──────────────────────────────────────────
  {
    id: "polera-futaleufu-chile",
    nombre: "Polera Futaleufú Chile",
    descripcion: "Polera de algodón con diseño Futaleufú Chile. Disponible en tallas S a XXL.",
    precio: 18000,
    imagen: "/ropa/poleras/polera_futaleufu_chile.png",
    categoria: "ropa",
    tipo: "Poleras",
    aspecto: "1254/1254",
  },
  {
    id: "polera-futaleufu",
    nombre: "Polera Futaleufú Clásica",
    descripcion: "Polera de algodón con diseño clásico de Futaleufú. Disponible en tallas S a XXL.",
    precio: 18000,
    imagen: "/ropa/poleras/polera_futaleufu.png",
    categoria: "ropa",
    tipo: "Poleras",
    aspecto: "1254/1254",
  },
  {
    id: "polera-patagonia-chilena",
    nombre: "Polera Patagonia Chilena",
    descripcion: "Polera de algodón con diseño de la Patagonia chilena. Disponible en tallas S a XXL.",
    precio: 18000,
    imagen: "/ropa/poleras/polera_patagonia chilena.png",
    categoria: "ropa",
    tipo: "Poleras",
    aspecto: "1254/1254",
  },
  {
    id: "polera-azul-futaleufu",
    nombre: "Polera Azul Futaleufú",
    descripcion: "Polera de algodón en azul con diseño de Futaleufú. Disponible en tallas S a XXL.",
    precio: 18000,
    imagen: "/ropa/poleras/polera_azul_futaleufu.png",
    categoria: "ropa",
    tipo: "Poleras",
    aspecto: "1254/1254",
  },
  {
    id: "polera-futaleufu-pink",
    nombre: "Polera Futaleufú Rosada",
    descripcion: "Polera de algodón en rosado con diseño de Futaleufú. Disponible en tallas S a XXL.",
    precio: 18000,
    imagen: "/ropa/poleras/polera_futaleufu_pink.png",
    categoria: "ropa",
    tipo: "Poleras",
    aspecto: "1254/1254",
  },
  {
    id: "polera-chucao-verde",
    nombre: "Polera Chucao",
    descripcion: "Polera de algodón verde con ilustración del chucao, ave emblema de los bosques patagónicos. Disponible en tallas S a XXL.",
    precio: 18000,
    imagen: "/ropa/poleras/polera_chucao_verde.png",
    categoria: "ropa",
    tipo: "Poleras",
    aspecto: "1254/1254",
  },
  {
    id: "polera-martinpescador-verde",
    nombre: "Polera Martín Pescador",
    descripcion: "Polera de algodón verde con ilustración del martín pescador de Futaleufú. Disponible en tallas S a XXL.",
    precio: 18000,
    imagen: "/ropa/poleras/polera_martinpescador_verde.png",
    categoria: "ropa",
    tipo: "Poleras",
    aspecto: "1254/1254",
  },

  // ── ROPA · Gorras ───────────────────────────────────────────
  {
    id: "gorro-chucao-crema",
    nombre: "Gorro Chucao",
    descripcion: "Gorro con bordado del chucao, ave emblema de los bosques patagónicos. Talla única ajustable.",
    precio: 10000,
    imagen: "/ropa/gorras/gorro_chucao_crema.png",
    categoria: "ropa",
    tipo: "Gorras",
    aspecto: "1254/1254",
  },
  {
    id: "gorro-carpintero",
    nombre: "Gorro Carpintero",
    descripcion: "Gorro con bordado del carpintero, ave emblemática de la Patagonia. Talla única ajustable.",
    precio: 10000,
    imagen: "/ropa/gorras/gorro_carpintero_verde.png",
    categoria: "ropa",
    tipo: "Gorras",
    aspecto: "1254/1254",
    colores: [
      { nombre: "Verde", hex: "#cbdbc8", imagen: "/ropa/gorras/gorro_carpintero_verde.png" },
      { nombre: "Rosado", hex: "#e88a92", imagen: "/ropa/gorras/gorro_carpintero_pink.png" },
    ],
  },
  {
    id: "gorra-futaleufu-azul",
    nombre: "Gorra Futaleufú Azul",
    descripcion: "Gorra con diseño de Futaleufú en azul. Talla única ajustable.",
    precio: 15000,
    imagen: "/ropa/gorras/gorra_futaleufu_azul.png",
    categoria: "ropa",
    tipo: "Gorras",
    aspecto: "1254/1254",
  },
  {
    id: "gorro-invierno-futaleufu-azul",
    nombre: "Gorro de Invierno Futaleufú",
    descripcion: "Gorro de invierno azul con bordado de la cordillera de Futaleufú, Patagonia chilena. Talla única ajustable.",
    precio: 10000,
    imagen: "/ropa/gorras/gorro_invierno_futaleufu_azul.png",
    categoria: "ropa",
    tipo: "Gorras",
    aspecto: "1254/1254",
  },

  // ── ROPA · Polerones ────────────────────────────────────────
  {
    id: "poleron-carpintero-rosa",
    nombre: "Polerón Carpintero",
    descripcion: "Polerón con capucha en rosado con ilustración del carpintero de Futaleufú. Disponible en tallas S a XXL.",
    precio: 28000,
    imagen: "/ropa/polerones/poleron_carpintero_mate_rosa.png",
    categoria: "ropa",
    tipo: "Polerones",
    aspecto: "1254/1254",
  },
  {
    id: "poleron-chucao-celeste",
    nombre: "Polerón Chucao",
    descripcion: "Polerón con capucha en celeste con ilustración del chucao de Futaleufú. Disponible en tallas S a XXL.",
    precio: 28000,
    imagen: "/ropa/polerones/poleron_chucao_mate_celeste.png",
    categoria: "ropa",
    tipo: "Polerones",
    aspecto: "1254/1254",
  },

  // ── ROPA · Polerones Infantiles (unisex) ────────────────────
  {
    id: "poleron-nino-futaleufu-azul",
    nombre: "Polerón Infantil Futaleufú Azul",
    descripcion: "Polerón infantil unisex en azul con diseño de Futaleufú. Tallas de niño y niña.",
    precio: 25000,
    imagen: "/ropa/polerones/poleron_nino_futaleufu_chucao_azul_A.png",
    imagenes: [
      "/ropa/polerones/poleron_nino_futaleufu_chucao_azul_A.png",
      "/ropa/polerones/poleron_nino_futaleufu_chucao_azul_B.png",
    ],
    categoria: "ropa",
    tipo: "Polerones Infantiles",
    aspecto: "1254/1254",
  },
  {
    id: "poleron-nino-futaleufu-celeste",
    nombre: "Polerón Infantil Futaleufú Celeste",
    descripcion: "Polerón infantil unisex en celeste con diseño de Futaleufú. Tallas de niño y niña.",
    precio: 25000,
    imagen: "/ropa/polerones/poleron_nino_futaleufu_chucao_celeste_A.png",
    imagenes: [
      "/ropa/polerones/poleron_nino_futaleufu_chucao_celeste_A.png",
      "/ropa/polerones/poleron_nino_futaleufu_chucao_celeste_B.png",
    ],
    categoria: "ropa",
    tipo: "Polerones Infantiles",
    aspecto: "1254/1254",
  },

  // ── SOUVENIR · Botellas ─────────────────────────────────────
  {
    id: "botella-chucao-azul",
    nombre: "Botella Chucao Azul",
    descripcion: "Botella reutilizable azul con ilustración del chucao, ave emblema de los bosques patagónicos.",
    precio: 10000,
    imagen: "/botellas/botella_chucao_azul.png",
    categoria: "souvenir",
    tipo: "Botellas",
    aspecto: "1254/1254",
  },
  {
    id: "botella-paisaje-blanca",
    nombre: "Botella Paisaje",
    descripcion: "Botella reutilizable blanca con ilustración del paisaje de Futaleufú.",
    precio: 10000,
    imagen: "/botellas/botella_paisaje_blanca.png",
    categoria: "souvenir",
    tipo: "Botellas",
    aspecto: "1254/1254",
  },
  {
    id: "botella-paisaje-lago-blanca",
    nombre: "Botella Paisaje Lago",
    descripcion: "Botella reutilizable blanca con ilustración del lago y los álamos de Futaleufú en otoño.",
    precio: 10000,
    imagen: "/botellas/botella_paisaje2_blanca.png",
    categoria: "souvenir",
    tipo: "Botellas",
    aspecto: "1254/1254",
  },
  {
    id: "botella-icono-naranja",
    nombre: "Botella Ícono Naranja",
    descripcion: "Botella reutilizable naranja con el ícono de la marca Futarte.",
    precio: 10000,
    imagen: "/botellas/botella_icono_naranja.png",
    categoria: "souvenir",
    tipo: "Botellas",
    aspecto: "1254/1254",
  },
  {
    id: "botella-futaleufu-blanca",
    nombre: "Botella Futaleufú Blanca",
    descripcion: "Botella reutilizable blanca con diseño de Futaleufú.",
    precio: 10000,
    imagen: "/botellas/botella_futaleufu2_blanca.png",
    categoria: "souvenir",
    tipo: "Botellas",
    aspecto: "1254/1254",
  },
  {
    id: "botella-martin-blanco",
    nombre: "Botella Martín Pescador",
    descripcion: "Botella reutilizable blanca con ilustración del martín pescador de Futaleufú.",
    precio: 10000,
    imagen: "/botellas/botella_martin_blanco.png",
    categoria: "souvenir",
    tipo: "Botellas",
    aspecto: "1254/1254",
  },
  {
    id: "botella-rafting-blanca",
    nombre: "Botella Rafting",
    descripcion: "Botella reutilizable blanca con ilustración del rafting en el río Futaleufú.",
    precio: 10000,
    imagen: "/botellas/botella_rafting_blanca.png",
    categoria: "souvenir",
    tipo: "Botellas",
    aspecto: "1254/1254",
  },
  {
    id: "botella-rio-blanca",
    nombre: "Botella Río",
    descripcion: "Botella reutilizable blanca con ilustración del río Futaleufú.",
    precio: 10000,
    imagen: "/botellas/botella_rio_blanca.png",
    categoria: "souvenir",
    tipo: "Botellas",
    aspecto: "1254/1254",
  },

  // ── SOUVENIR · Termos ───────────────────────────────────────
  {
    id: "termo-naranja",
    nombre: "Termo Naranja",
    descripcion: "Termo de acero inoxidable naranja con diseño de Futarte. Mantiene la temperatura por horas.",
    precio: 25000,
    imagen: "/botellas/termo_naranja.png",
    categoria: "souvenir",
    tipo: "Termos",
    aspecto: "1254/1254",
  },
  {
    id: "termo-negro",
    nombre: "Termo Negro",
    descripcion: "Termo de acero inoxidable negro con diseño de Futarte. Mantiene la temperatura por horas.",
    precio: 25000,
    imagen: "/botellas/termo_negro.png",
    categoria: "souvenir",
    tipo: "Termos",
    aspecto: "1254/1254",
  },

  // ── PIEZAS ÚNICAS · Mates y Cajas (comparten fila) ──────────
  {
    id: "mate-dibujo-emoji",
    nombre: "Mate Ilustrado",
    descripcion: "Mate de cerámica con dibujo ilustrado de la marca. Ideal como regalo o recuerdo.",
    precio: 12000,
    imagen: "/piezasunicas/mate_dibujo_emoji.png",
    categoria: "piezas-unicas",
    tipo: "Mates y Cajas",
    aspecto: "1254/1254",
  },
  {
    id: "caja-naipes-truco",
    nombre: "Caja de Naipes Truco",
    descripcion:
      "Caja de madera con grabado del marcador de Truco y mazo de naipes en su interior. Pieza única ideal para regalo.",
    precio: 20000,
    imagen: "/piezasunicas/cajatruco/truco_A.png",
    imagenes: ["/piezasunicas/cajatruco/truco_A.png", "/piezasunicas/cajatruco/truco_b.png"],
    categoria: "piezas-unicas",
    tipo: "Mates y Cajas",
    aspecto: "1254/1254",
  },

  // ── ARTESANÍA · Vasos ───────────────────────────────────────
  {
    id: "vaso-carpintero-blanco",
    nombre: "Vaso Carpintero",
    descripcion: "Vaso esmaltado blanco con ilustración del carpintero, ave emblemática de la Patagonia chilena.",
    precio: 14000,
    imagen: "/piezasunicas/vasos_unicos/vaso_carpintero_blanco.png",
    categoria: "piezas-unicas",
    tipo: "Vasos",
    aspecto: "1254/1254",
  },
  {
    id: "vaso-chucao-blanco",
    nombre: "Vaso Chucao",
    descripcion: "Vaso esmaltado blanco con ilustración del chucao, ave emblema de los bosques patagónicos.",
    precio: 14000,
    imagen: "/piezasunicas/vasos_unicos/vaso_chucao_blanco.png",
    categoria: "piezas-unicas",
    tipo: "Vasos",
    aspecto: "1254/1254",
  },
  {
    id: "vaso-rafting-futaleufu",
    nombre: "Vaso Rafting",
    descripcion: "Vaso esmaltado con ilustración del rafting en el río Futaleufú.",
    precio: 14000,
    imagen: "/piezasunicas/vasos_unicos/vaso_rafting_futaleufu.png",
    categoria: "piezas-unicas",
    tipo: "Vasos",
    aspecto: "1254/1254",
  },
  {
    id: "vaso-rio-blanco",
    nombre: "Vaso Río",
    descripcion: "Vaso esmaltado blanco con ilustración del río Futaleufú.",
    precio: 14000,
    imagen: "/piezasunicas/vasos_unicos/vaso_rio_blanco.png",
    categoria: "piezas-unicas",
    tipo: "Vasos",
    aspecto: "1254/1254",
  },
  {
    id: "vaso-sietecolores-blanco",
    nombre: "Vaso Siete Colores",
    descripcion: "Vaso esmaltado blanco con ilustración del siete colores, ave de la Patagonia chilena.",
    precio: 14000,
    imagen: "/piezasunicas/vasos_unicos/vaso_sietecolores_blanco.png",
    categoria: "piezas-unicas",
    tipo: "Vasos",
    aspecto: "1254/1254",
  },
];
