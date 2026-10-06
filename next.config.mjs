/**
 * Редиректы со старого сайта (SerTan/InnoShop) на новые адреса.
 * Старый сайт отдавал страницы под /ru/... и /ro/...
 */
const pageMap = [
  ['category-global-brands', '/ru/global-brands'],
  ['category-cardboard-boxes', '/ru/chinese-brands'],
  ['about', '/ru/about'],
  ['contacts', '/ru/contacts'],
  ['products/15', '/ru/cars/byd-seagull'],
  ['products/16', '/ru/cars/geely-galaxy-e5'],
  ['products/17', '/ru/cars/avatr-07'],
  ['product-bmw-120i', '/ru/cars/bmw-120i'],
  ['product-audi-q2l-2020-35tfsi-fashion-dynamic-edition', '/ru/cars/audi-q2l'],
  ['product-byd-seal', '/ru/cars/byd-seal'],
  ['brand-byd', '/ru/chinese-brands'],
  ['brand-geely', '/ru/chinese-brands'],
  ['brand-avatr', '/ru/chinese-brands'],
  ['brand-bmw', '/ru/global-brands'],
  ['brand-audi', '/ru/global-brands'],
  ['products', '/ru#catalog'],
  ['brands', '/ru#catalog'],
  ['catalog-product', '/ru#catalog'],
  ['articles', '/ru'],
  ['carts/create', '/ru/contacts'],
  ['checkout', '/ru/contacts'],
  ['locales/switch/ru', '/ru'],
  ['locales/switch/ro', '/ru'],
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: false },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: '**.public.blob.vercel-storage.com' }],
  },
  async redirects() {
    return [
      // Пока нет румынской версии, главная ведёт на русскую. Временный (307) редирект, чтобы потом не мешал.
      { source: '/', destination: '/ru', permanent: false },
      { source: '/privacy', destination: '/ru/privacy', permanent: true },
      // Старые русские адреса: постоянные (301)
      // (about и contacts остались по тем же адресам, редирект на самих себя не нужен)
      ...pageMap.filter(([from, to]) => `/ru/${from}` !== to).map(([from, to]) => ({ source: `/ru/${from}`, destination: to, permanent: true })),
      // Старые румынские адреса: временно на русскую версию, пока не готов /ro
      { source: '/ro', destination: '/ru', permanent: false },
      ...pageMap.map(([from, to]) => ({ source: `/ro/${from}`, destination: to, permanent: false })),
    ]
  },
}

export default nextConfig
