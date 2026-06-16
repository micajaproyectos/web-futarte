const raw =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "development" ? "http://localhost:3000" : undefined);

if (!raw) {
  throw new Error(
    "Falta NEXT_PUBLIC_SITE_URL. Defínela en el panel del hosting para producción."
  );
}

export const siteUrl = raw;
