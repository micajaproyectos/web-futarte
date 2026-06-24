"use client";
import { useEffect, useState } from "react";

type Props = {
  /** Frase completa que se "escribe" carácter a carácter. */
  text: string;
  /** Milisegundos por carácter. */
  speed?: number;
  /** Clases extra para el contenedor. */
  className?: string;
};

/**
 * Escribe la frase como una máquina de escribir en el primer montaje
 * (es decir, cada vez que se carga/recarga la página o se entra por primera
 * vez). No persiste estado: un refresco vuelve a animar.
 *
 * Accesibilidad: la frase completa siempre está en el DOM (`sr-only`) y se
 * reserva su espacio con una copia invisible para evitar saltos de layout.
 * Con "reducir movimiento" se muestra completa de inmediato, sin cursor.
 */
export function Typewriter({ text, speed = 55, className = "" }: Props) {
  const [count, setCount] = useState(0);
  const [caretOn, setCaretOn] = useState(true);

  useEffect(() => {
    // El titular siempre se escribe en el primer montaje (carga/recarga),
    // incluso con "reducir movimiento" activo, porque es la entrada pedida.
    let i = 0;
    const typing = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) {
        clearInterval(typing);
        // Deja el cursor un instante y luego lo oculta.
        setTimeout(() => setCaretOn(false), 1500);
      }
    }, speed);
    return () => clearInterval(typing);
  }, [text, speed]);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Reserva el alto/ancho final → sin saltos de layout mientras escribe */}
      <span aria-hidden className="invisible">
        {text}
      </span>

      {/* Texto que se va revelando, superpuesto sobre la reserva */}
      <span aria-hidden className="absolute inset-0">
        {text.slice(0, count)}
        <span
          className={`ml-[0.06em] inline-block h-[0.85em] w-[0.06em] translate-y-[0.06em] bg-text align-baseline ${
            caretOn ? "animate-blink" : "opacity-0"
          }`}
        />
      </span>

      {/* Frase completa para lectores de pantalla y SEO */}
      <span className="sr-only">{text}</span>
    </span>
  );
}
