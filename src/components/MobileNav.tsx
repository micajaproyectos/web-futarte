"use client";
import { useState } from "react";
import Link from "next/link";
import { categories } from "@/data/categories";

/**
 * Navegación de categorías para pantallas pequeñas (< sm).
 * Botón hamburguesa que despliega un panel con las categorías.
 * En sm+ se oculta y toma el relevo la <nav> horizontal del Header.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative sm:hidden">
      <button
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
          aria-hidden
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open ? (
        <>
          {/* Capa para cerrar al tocar fuera */}
          <button
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <nav
            aria-label="Categorías"
            className="absolute right-0 top-full z-50 mt-2 min-w-44 rounded-lg border border-border bg-bone p-2 shadow-lg"
          >
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-text transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
              >
                {cat.nombre}
              </Link>
            ))}
            <Link
              href="/#quienes-somos"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-text transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
            >
              Quiénes somos
            </Link>
          </nav>
        </>
      ) : null}
    </div>
  );
}
