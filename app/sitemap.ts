import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://honestauto.md'
  return [
    { url: `${base}/ru`, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/ru/privacy`, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
