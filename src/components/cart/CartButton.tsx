"use client";
import { useCart } from "./CartProvider";
import { cartCount } from "@/lib/cart";

export function CartButton() {
  const { items, toggle } = useCart();
  const count = cartCount(items);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={count > 0 ? `Abrir carrito (${count})` : "Abrir carrito"}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-md text-text transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden
      >
        <path d="M6 6h15l-1.5 9h-12L5 3H2" />
        <circle cx="9" cy="20" r="1.4" />
        <circle cx="18" cy="20" r="1.4" />
      </svg>
      {count > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-text px-1 text-[11px] font-semibold leading-none text-bg">
          {count}
        </span>
      ) : null}
    </button>
  );
}
