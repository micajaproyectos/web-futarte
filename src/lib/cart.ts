// Lógica pura del carrito (sin React). Tipos, cálculos, formato y el mensaje
// de WhatsApp del checkout. Se consume desde el CartProvider y la UI.

export type CartItem = {
  id: string; // único por producto + variante de color
  nombre: string;
  precio: number;
  imagen: string;
  qty: number;
  // Prendas que eligen opciones dentro del carrito antes de ir a pagar:
  //  · poleras y polerones de adulto → color y talla
  //  · polerones infantiles → solo color
  pideColor?: boolean;
  pideTalla?: boolean;
  color?: string;
  talla?: string;
};

// Color y talla seleccionables para poleras y polerones de adulto. Aplican a
// todas las prendas por igual (independiente del color que muestre la foto).
export const COLORES_ROPA = [
  { nombre: "Negro", hex: "#1a1a1a" },
  { nombre: "Blanco", hex: "#ffffff" },
  { nombre: "Azul Marino", hex: "#1e2a44" },
  { nombre: "Verde Botella", hex: "#0f3d2e" },
  { nombre: "Café", hex: "#5b3a29" },
] as const;

export const TALLAS_ROPA = ["XS", "S", "M", "L", "XL", "XXL"] as const;

const clp = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export function formatCLP(value: number): string {
  return clp.format(value);
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, it) => sum + it.precio * it.qty, 0);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, it) => sum + it.qty, 0);
}

/** Une un ítem nuevo al carrito: si ya existe (mismo id), suma cantidad. */
export function addToCart(items: CartItem[], nuevo: Omit<CartItem, "qty">): CartItem[] {
  const existente = items.find((i) => i.id === nuevo.id);
  if (existente) {
    return items.map((i) => (i.id === nuevo.id ? { ...i, qty: i.qty + 1 } : i));
  }
  return [...items, { ...nuevo, qty: 1 }];
}

/** Ajusta la cantidad; si llega a 0 o menos, elimina el ítem. */
export function setQty(items: CartItem[], id: string, qty: number): CartItem[] {
  if (qty <= 0) return items.filter((i) => i.id !== id);
  return items.map((i) => (i.id === id ? { ...i, qty } : i));
}

export function removeFromCart(items: CartItem[], id: string): CartItem[] {
  return items.filter((i) => i.id !== id);
}

/** True si alguna prenda con opciones aún no eligió el color o la talla pedidos. */
export function faltanOpciones(items: CartItem[]): boolean {
  return items.some(
    (it) => (it.pideColor && !it.color) || (it.pideTalla && !it.talla),
  );
}

/** Mensaje de WhatsApp con producto + cantidad + (color/talla) + total. */
export function buildCheckoutMessage(items: CartItem[]): string {
  if (items.length === 0) return "Hola, quiero hacer un pedido en su tienda.";
  const lineas = items.map((it) => {
    const partes: string[] = [];
    if (it.pideColor) partes.push(`Color: ${it.color ?? "—"}`);
    if (it.pideTalla) partes.push(`Talla: ${it.talla ?? "—"}`);
    const detalle = partes.length ? ` — ${partes.join(" · ")}` : "";
    return `• ${it.qty}× ${it.nombre}${detalle} — ${formatCLP(it.precio * it.qty)}`;
  });
  return [
    "Hola, quiero comprar los siguientes productos de su tienda:",
    "",
    ...lineas,
    "",
    `Total aprox.: ${formatCLP(cartTotal(items))}`,
  ].join("\n");
}

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

/** URL de WhatsApp con el detalle del carrito pre-rellenado. */
export function checkoutHref(items: CartItem[]): string {
  const text = encodeURIComponent(buildCheckoutMessage(items));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
