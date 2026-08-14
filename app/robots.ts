import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/auth/", "/fan/"],
    },
    sitemap: "https://beatballot.space/sitemap.xml",
  };
}
