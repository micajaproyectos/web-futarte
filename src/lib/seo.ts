import { siteUrl } from "./env";

const INSTAGRAM_URL = "https://www.instagram.com/_futaartesouvenir_";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=-43.1832852,-71.8654784";

const abs = (path: string) => new URL(path, siteUrl).toString();

/**
 * Negocio local (tienda física en Futaleufú). Alimenta el panel de
 * conocimiento de Google y se cruza con el Google Business Profile.
 * Solo afirma datos reales y verificables.
 */
export function getStoreSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${siteUrl}/#store`,
    name: "Futarte",
    description:
      "Souvenirs y regalos de Futaleufú, en la Patagonia chilena: ropa, botellas, mates y piezas únicas.",
    slogan: "Más Patagonia",
    url: siteUrl,
    image: abs("/logo_futarte.webp"),
    logo: abs("/logo_futarte.webp"),
    telephone: "+56991502017",
    email: "futaleufusouvenir@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Manuel Rodríguez 10",
      addressLocality: "Futaleufú",
      addressRegion: "Los Lagos",
      addressCountry: "CL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -43.1832852,
      longitude: -71.8654784,
    },
    hasMap: MAPS_URL,
    // Lunes a sábado 09:00–20:00; domingo cerrado (se omite por ausencia).
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    sameAs: [INSTAGRAM_URL],
    priceRange: "$$",
    currenciesAccepted: "CLP",
    areaServed: "Futaleufú, Patagonia, Chile",
  };
}

/** Asocia el sitio con la marca y el idioma. */
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Futarte",
    url: siteUrl,
    inLanguage: "es-CL",
    publisher: { "@id": `${siteUrl}/#store` },
  };
}

/** Migas de pan (Inicio › Categoría) para los resultados de Google. */
export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}
