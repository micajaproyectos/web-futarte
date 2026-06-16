import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { siteUrl } from "@/lib/env";

const BASE_URL = siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...categoryEntries,
    // TODO: agregar rutas adicionales (páginas legales, etc.)
  ];
}
