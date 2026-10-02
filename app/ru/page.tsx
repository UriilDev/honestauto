import type { Metadata } from 'next'
import { Advantages, Catalog, CategoryCards, Contact, Footer, Header, Hero, Location, Process, TrustStrip } from '@/components/site/sections'

export const metadata: Metadata = {
  alternates: { canonical: '/ru' },
}

export default function Page() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://honestauto.md'
  const jsonLd = { '@context': 'https://schema.org', '@type': 'AutoDealer', '@id': `${siteUrl}/#organization`, name: 'HonestAuto', url: `${siteUrl}/ru`, image: `${siteUrl}/og-image.png`, logo: `${siteUrl}/og-image.png`, areaServed: 'MD', inLanguage: 'ru', telephone: '+37367899299', email: 'info@honestauto.md', address: { '@type': 'PostalAddress', streetAddress: 'ул. Мештерул Маноле 14/3', addressLocality: 'Кишинёв', addressCountry: 'MD' } }
  return <div className="new-site"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><Header /><main><Hero /><TrustStrip /><Catalog /><Advantages /><CategoryCards /><Process /><Location /><Contact /></main><Footer /></div>
}
