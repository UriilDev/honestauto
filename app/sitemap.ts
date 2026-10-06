import type { MetadataRoute } from 'next'
import { cars } from '@/lib/catalog'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://honestauto.md'
  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/ru`, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/ru/chinese-brands`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/ru/global-brands`, changeFrequency: 'weekly', priority: 0.9 },
    ...cars.map(car => ({ url: `${base}/ru/cars/${car.slug}`, changeFrequency: 'weekly' as const, priority: 0.8 })),
    { url: `${base}/ru/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/ru/contacts`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/ru/privacy`, changeFrequency: 'yearly', priority: 0.2 },
  ]
  return pages
}
