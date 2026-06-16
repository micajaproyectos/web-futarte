import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/env";

const BASE_URL = siteUrl;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // TODO: agregar disallow si hay rutas privadas (ej: /admin)
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
