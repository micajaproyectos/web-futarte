// URL base del sitio (solo se usa en servidor/build: metadata, sitemap, robots,
// JSON-LD). Orden de prioridad:
//   1. NEXT_PUBLIC_SITE_URL          → override explícito (úsalo con tu dominio propio).
//   2. VERCEL_PROJECT_PRODUCTION_URL → dominio de producción ESTABLE en Vercel
//      (se actualiza solo si conectas un dominio propio como producción).
//      Nota: NO usamos VERCEL_URL porque es la URL efímera de cada deploy.
//   3. http://localhost:3000         → desarrollo local.
const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

const raw =
  process.env.NEXT_PUBLIC_SITE_URL ??
  vercelProduction ??
  (process.env.NODE_ENV === "development" ? "http://localhost:3000" : undefined);

if (!raw) {
  throw new Error(
    "Falta NEXT_PUBLIC_SITE_URL (y no se detectó URL de Vercel). Defínela en el panel del hosting para producción.",
  );
}

// Sin barra final, para evitar dobles barras al construir rutas.
export const siteUrl = raw.replace(/\/+$/, "");
