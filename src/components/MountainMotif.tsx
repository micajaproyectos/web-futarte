type MountainMotifProps = {
  /** "divider" = banda horizontal ancha; "mark" = icono compacto. */
  variant?: "divider" | "mark";
  className?: string;
  /** Si se pasa, el SVG deja de ser decorativo y se anuncia con este título. */
  title?: string;
};

/**
 * Motivo line-art de montaña/pinos/estrellas, el lenguaje visual de la marca.
 * Se usa como textura sobria: divisores de sección, iconos y estados vacíos.
 * Usa `currentColor`, así que hereda el color del contenedor.
 *
 * TODO: reemplazar por el line-art real de los badges de Futarte.
 */
export function MountainMotif({
  variant = "divider",
  className,
  title,
}: MountainMotifProps) {
  const a11y = title
    ? { role: "img" as const }
    : { "aria-hidden": true as const };

  if (variant === "mark") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...a11y}
      >
        {title ? <title>{title}</title> : null}
        {/* estrella */}
        <path d="M37 8v6M34 11h6" />
        {/* cordillera */}
        <path d="M5 39 19 16l7 11 5-7 7 19" />
        {/* línea de nieve en el pico principal */}
        <path d="M15 23l4-7 4 6" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 240 40"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...a11y}
    >
      {title ? <title>{title}</title> : null}
      {/* estrellas */}
      <path d="M40 6v6M37 9h6" />
      <path d="M150 4v5M147.5 6.5h5" />
      <path d="M205 8v5M202.5 10.5h5" />
      {/* cordillera */}
      <path d="M0 36 28 14l14 13 22-21 20 24 26-18 22 22 24-16 22 18 24-12" />
      {/* dos pinos sobre la línea base */}
      <path d="M112 36v-12M107 30l5-6 5 6M109 33l3-3 3 3" />
      <path d="M132 36v-9M128 31l4-5 4 5" />
    </svg>
  );
}
