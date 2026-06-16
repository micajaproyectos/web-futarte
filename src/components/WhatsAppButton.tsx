import type { ReactNode } from "react";

type WhatsAppButtonProps = {
  /** Texto pre-rellenado del mensaje (se URL-encodea internamente). */
  message?: string;
  children: ReactNode;
  /** "solid" = relleno acento; "outline" = borde acento. */
  variant?: "solid" | "outline";
  className?: string;
};

// TODO: definir el número real en NEXT_PUBLIC_WHATSAPP_NUMBER (formato internacional, solo dígitos).
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold" +
  " transition-[color,background-color,border-color,transform,box-shadow] duration-150" +
  " hover:-translate-y-px hover:shadow-sm motion-reduce:hover:translate-y-0" +
  " focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark";

// CTA de venta = máximo peso: fondo negro + texto crema.
// El pizarra queda para lo secundario (outline): borde oscuro accesible y,
// en hover, relleno pizarra claro detrás de texto oscuro (5.41:1).
const VARIANTS: Record<NonNullable<WhatsAppButtonProps["variant"]>, string> = {
  solid: "bg-text text-bg hover:bg-accent-dark hover:text-bg",
  outline: "border border-accent-dark text-text hover:bg-accent hover:text-text",
};

export function WhatsAppButton({
  message,
  children,
  variant = "solid",
  className = "",
}: WhatsAppButtonProps) {
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  const href = `https://wa.me/${WHATSAPP_NUMBER}${query}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${BASE} ${VARIANTS[variant]} ${className}`}
    >
      {/* Glifo de chat line-art (currentColor) */}
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
      {children}
    </a>
  );
}
