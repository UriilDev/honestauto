import type { Metadata } from 'next'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { Breadcrumbs, JsonLd, PageShell, SITE_URL } from '@/components/site/shell'
import { Contact } from '@/components/site/sections'
import { phone, social } from '@/lib/catalog'
import { siteContent } from '@/lib/site-content'

const description = 'Контакты HonestAuto: Кишинёв, ул. Мештерул Маноле 14/3. Телефон, Viber, Telegram, WhatsApp +373 67 899 299. Автомобили из Китая в Молдову.'
export const metadata: Metadata = {
  title: { absolute: 'Контакты HonestAuto — Кишинёв, телефон, адрес' },
  description,
  alternates: { canonical: '/ru/contacts' },
  openGraph: { title: 'Контакты HonestAuto', description, url: '/ru/contacts' },
}

export default function ContactsPage() {
  const c = siteContent.contacts
  const jsonLd = { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Контакты HonestAuto', url: `${SITE_URL}/ru/contacts`, inLanguage: 'ru', about: { '@id': `${SITE_URL}/#organization` } }
  return (
    <PageShell>
      <JsonLd data={jsonLd} />
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Главная', href: '/ru' }, { label: 'Контакты' }]} />
          <span className="section-label">Свяжитесь с нами</span>
          <h1>Контакты</h1>
          <div className="page-intro"><p>Свяжитесь с нами, чтобы получить лучшие предложения и скидки.</p></div>
        </div>
      </section>
      <section className="section white-section page-section">
        <div className="container contacts-layout">
          <div className="contacts-cards">
            <a className="contact-card" href={phone.href}><Phone size={22} aria-hidden="true" /><div><small>Телефон, Viber, Telegram, WhatsApp</small><b>{phone.display}</b></div></a>
            <a className="contact-card" href={`mailto:${c.email}`}><Mail size={22} aria-hidden="true" /><div><small>Email</small><b>{c.email}</b></div></a>
            <a className="contact-card" href={c.mapUrl} target="_blank" rel="noreferrer noopener"><MapPin size={22} aria-hidden="true" /><div><small>Адрес</small><b>{c.address}</b></div></a>
            <a className="contact-card" href={social.telegram} target="_blank" rel="noreferrer noopener"><Send size={22} aria-hidden="true" /><div><small>Telegram-канал с ценами и новинками</small><b>t.me/honestautomoldova</b></div></a>
            <p className="contacts-social"><a href={social.facebook} target="_blank" rel="noreferrer noopener">Facebook</a> · <a href={social.instagram} target="_blank" rel="noreferrer noopener">Instagram</a></p>
          </div>
          <div className="map-card contacts-map"><iframe title="Карта HonestAuto в Кишинёве" src="https://www.openstreetmap.org/export/embed.html?bbox=28.85%2C46.98%2C28.9%2C47.04&layer=mapnik&marker=47.02%2C28.87" loading="lazy" referrerPolicy="no-referrer" /></div>
        </div>
      </section>
      <Contact />
    </PageShell>
  )
}
