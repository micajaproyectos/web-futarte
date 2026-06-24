// Lógica pura del carrito (sin React). Tipos, cálculos, formato y el mensaje
// de WhatsApp del checkout. Se consume desde el CartProvider y la UI.

export type CartItem = {
  id: string; // único por producto + variante de color
  nombre: string;
  precio: number;
  imagen: string;
  qty: number;
};

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

/** Mensaje de WhatsApp con producto + cantidad + total. */
export function buildCheckoutMessage(items: CartItem[]): string {
  if (items.length === 0) return "Hola, quiero hacer un pedido en su tienda.";
  const lineas = items.map(
    (it) => `• ${it.qty}× ${it.nombre} — ${formatCLP(it.precio * it.qty)}`,
  );
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
