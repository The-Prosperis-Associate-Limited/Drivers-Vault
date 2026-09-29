import type { MetadataRoute } from "next";
import { SITE_URL } from "./_lib/site";

const pages = [
  { path: "", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/drivers", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/terms", changeFrequency: "monthly" as const, priority: 0.3 },
  { path: "/privacy", changeFrequency: "monthly" as const, priority: 0.3 },
  { path: "/auth/signup", changeFrequency: "monthly" as const, priority: 0.5 },
  { path: "/auth/signin", changeFrequency: "monthly" as const, priority: 0.4 },
  {
    path: "/driver/auth/signup",
    changeFrequency: "monthly" as const,
    priority: 0.5,
  },
  {
    path: "/driver/auth/signin",
    changeFrequency: "monthly" as const,
    priority: 0.4,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
