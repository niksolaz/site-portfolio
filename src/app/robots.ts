import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // La pagina /blogs e ancora un segnaposto: la teniamo fuori dall'indice.
      disallow: "/blogs",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
