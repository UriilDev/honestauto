import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter', display: 'swap' })
const manrope = Manrope({ subsets: ['latin', 'cyrillic'], variable: '--font-manrope', display: 'swap' })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://honestauto.md'
const TITLE = 'Автомобили из Китая в Молдову под ключ | HonestAuto'
const DESCRIPTION = 'Подбор, независимая экспертиза и доставка автомобилей из Китая в Молдову под ключ. BYD, Geely, BMW, Audi и другие. Прозрачная цена до сделки. Кишинёв.'

const NOINDEX = process.env.NEXT_PUBLIC_NOINDEX === '1'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: '%s | HonestAuto' },
  description: DESCRIPTION,
  applicationName: 'HonestAuto',
  keywords: ['автомобили из Китая в Молдову', 'авто из Китая', 'доставка авто из Китая', 'китайские автомобили', 'BYD Молдова', 'запчасти из Китая'],
  robots: NOINDEX
    ? { index: false, follow: false }
    : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  // Подтверждение права на сайт в Google Search Console (то же, что стояло на старом сайте)
  verification: { google: 'kYLlyEfFVJt8gqUjpdV3p8btSX8Ju9V-KAxnjxRjgfk' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/ru',
    siteName: 'HonestAuto',
    locale: 'ru_RU',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'HonestAuto — автомобили из Китая в Молдову' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/og-image.png'] },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${manrope.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
