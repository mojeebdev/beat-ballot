import type { MetadataRoute } from "next";

const pages = ["", "/catalogue", "/season-01", "/method"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((path) => ({
    url: `https://beatballot.space${path}`,
    lastModified: new Date("2026-08-14"),
    changeFrequency: path === "" ? "daily" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
