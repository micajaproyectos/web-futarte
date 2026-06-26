"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useCart } from "./CartProvider";
import {
  cartTotal,
  checkoutHref,
  faltanOpciones,
  formatCLP,
  COLORES_ROPA,
  TALLAS_ROPA,
} from "@/lib/cart";

export function CartDrawer() {
  const { items, isOpen, close, setQty, setOpciones, remove, clear } = useCart();
  const total = cartTotal(items);
  const vacio = items.length === 0;
  const incompleto = faltanOpciones(items);

  // Cierra con Escape y bloquea el scroll del fondo mientras está abierto.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <>
      {/* Telón */}
      <div
        aria-hidden
        onClick={close}
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Tu pedido"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-bg shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-lg font-semibold text-text">
            Tu pedido
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar carrito"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-cream hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
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
        </div>

        {/* Lista de ítems */}
        {vacio ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
            <p className="text-text">Tu carrito está vacío.</p>
            <p className="text-sm text-muted">
              Añade productos y arma tu pedido para enviarlo por WhatsApp.
            </p>
          </div>
        ) : (
          <ul className="flex-1 overflow-y-auto px-5 py-4">
            {items.map((it) => (
              <li
                key={it.id}
                className="flex gap-3 border-b border-border py-4 last:border-b-0"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
                  <Image
                    src={it.imagen}
                    alt={it.nombre}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="truncate text-sm font-medium text-text">
                    {it.nombre}
                  </p>
                  <p className="text-sm text-muted">{formatCLP(it.precio)}</p>

                  {/* Color (poleras, polerones y polerones infantiles) y
                      talla (solo poleras y polerones de adulto) */}
                  {it.pideColor || it.pideTalla ? (
                    <div className="mt-2 flex flex-col gap-2">
                      {it.pideColor ? (
                      <div
                        role="group"
                        aria-label={`Color de ${it.nombre}`}
                        className="flex flex-wrap items-center gap-2"
                      >
                        {COLORES_ROPA.map((c) => {
                          const sel = it.color === c.nombre;
                          return (
                            <button
                              key={c.nombre}
                              type="button"
                              onClick={() => setOpciones(it.id, { color: c.nombre })}
                              aria-pressed={sel}
                              aria-label={`Color ${c.nombre}`}
                              title={c.nombre}
                              className={`h-5 w-5 rounded-full transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark ${
                                sel
                                  ? "ring-2 ring-text ring-offset-2 ring-offset-bg"
                                  : "ring-1 ring-border hover:ring-text/40"
                              }`}
                              style={{ backgroundColor: c.hex }}
                            />
                          );
                        })}
                      </div>
                      ) : null}
                      {it.pideTalla ? (
                      <div
                        role="group"
                        aria-label={`Talla de ${it.nombre}`}
                        className="flex flex-wrap items-center gap-1.5"
                      >
                        {TALLAS_ROPA.map((t) => {
                          const sel = it.talla === t;
                          return (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setOpciones(it.id, { talla: t })}
                              aria-pressed={sel}
                              className={`min-w-7 rounded-md border px-1.5 py-0.5 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark ${
                                sel
                                  ? "border-text bg-text text-bg"
                                  : "border-border text-text hover:border-text/40"
                              }`}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                      ) : null}
                    </div>
                  ) : null}

                  <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                    {/* Cantidad */}
                    <div className="inline-flex items-center rounded-full border border-border">
                      <button
                        type="button"
                        onClick={() => setQty(it.id, it.qty - 1)}
                        aria-label={`Quitar uno de ${it.nombre}`}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full text-text transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
                      >
                        −
                      </button>
                      <span className="min-w-6 text-center text-sm font-medium text-text">
                        {it.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(it.id, it.qty + 1)}
                        aria-label={`Añadir uno de ${it.nombre}`}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full text-text transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(it.id)}
                      className="text-xs text-muted underline-offset-4 transition-colors hover:text-text hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Pie: total + checkout */}
        {!vacio ? (
          <div className="border-t border-border px-5 py-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted">Total aprox.</span>
              <span className="text-lg font-semibold text-text">
                {formatCLP(total)}
              </span>
            </div>
            {incompleto ? (
              <>
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-text/40 px-6 py-3 text-sm font-semibold text-bg"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z" />
                  </svg>
                  Ir a Pagar
                </button>
                <p className="mt-2 text-center text-xs text-accent-dark">
                  Elige color y talla en cada prenda para continuar.
                </p>
              </>
            ) : (
              <a
                href={checkoutHref(items)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-text px-6 py-3 text-sm font-semibold text-bg transition-[color,background-color,transform,box-shadow] duration-150 hover:-translate-y-px hover:bg-accent-dark hover:shadow-sm motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z" />
                </svg>
                Ir a Pagar
              </a>
            )}
            <button
              type="button"
              onClick={clear}
              className="mt-2 w-full text-center text-xs text-muted underline-offset-4 transition-colors hover:text-text hover:underline"
            >
              Vaciar carrito
            </button>
          </div>
        ) : null}
      </aside>
    </>
  );
}
