/** Редиректы со старого сайта (SerTan/InnoShop), чтобы не потерять позиции в Google */
const oldPages = [
  // каталог и товары → блок каталога на главной
  ['/ru/category-global-brands', '/ru#catalog'],
  ['/ru/category-cardboard-boxes', '/ru#catalog'],
  ['/ru/products', '/ru#catalog'],
  ['/ru/products/15', '/ru#catalog'],
  ['/ru/brands', '/ru#catalog'],
  ['/ru/catalog-product', '/ru#catalog'],
  ['/ru/product-bmw-120i', '/ru#catalog'],
  ['/ru/product-byd-seal', '/ru#catalog'],
  ['/ru/product-audi-q2l-2020-35tfsi-fashion-dynamic-edition', '/ru#catalog'],
  // информационные страницы
  ['/ru/about', '/ru#about'],
  ['/ru/contacts', '/ru#contact'],
  ['/ru/articles', '/ru'],
  // переключатели языка старой CMS
  ['/ru/locales/switch/ru', '/ru'],
  ['/ru/locales/switch/ro', '/ru'],
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**.public.blob.vercel-storage.com' }],
  },
  async redirects() {
    return [
      { source: '/', destination: '/ru', permanent: true },
      { source: '/privacy', destination: '/ru/privacy', permanent: true },
      // пока нет румынской версии — временно (302) на русскую
      { source: '/ro', destination: '/ru', permanent: false },
      ...oldPages.map(([source, destination]) => ({ source, destination, permanent: true })),
    ]
  },
}

export default nextConfig
