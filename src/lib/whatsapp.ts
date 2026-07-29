// Número de contacto de WhatsApp, en el formato que exige wa.me: código de país
// + número, solo dígitos, sin "+" ni espacios (+56 9 9150 2017 → 56991502017).
//
// Va escrito aquí a propósito y no en una variable de entorno. Next congela las
// NEXT_PUBLIC_* al compilar (las reemplaza por su valor literal en el bundle),
// así que si la variable falta en el build el enlace queda como "wa.me/" sin
// destinatario: WhatsApp abre su home y se pierden número y mensaje. Es lo que
// ocurría en producción, donde el .env local nunca llegó (está en .gitignore).
// El número es público —ya aparece en el footer y en el JSON-LD— y es el mismo
// en todos los entornos, así que no gana nada viviendo en una env var.
export const WHATSAPP_NUMBER = "56991502017";

/** El mismo número, formateado para mostrarlo en pantalla. */
export const WHATSAPP_DISPLAY = "+56 9 9150 2017";

/** URL de WhatsApp, con mensaje opcional pre-rellenado. */
export function whatsappHref(message?: string): string {
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${WHATSAPP_NUMBER}${query}`;
}
