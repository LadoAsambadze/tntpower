import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/pricing", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
  ].map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages];
}
