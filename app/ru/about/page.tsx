import type { Metadata } from 'next'
import { Breadcrumbs, JsonLd, PageShell, SITE_URL } from '@/components/site/shell'
import { Contact } from '@/components/site/sections'
import { aboutPage, phone } from '@/lib/catalog'

export const metadata: Metadata = {
  title: { absolute: `${aboutPage.seoTitle} | HonestAuto` },
  description: aboutPage.seoDescription,
  alternates: { canonical: '/ru/about' },
  openGraph: { title: aboutPage.seoTitle, description: aboutPage.seoDescription, url: '/ru/about' },
}

export default function AboutPage() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'AboutPage', name: aboutPage.seoTitle, url: `${SITE_URL}/ru/about`, inLanguage: 'ru', about: { '@id': `${SITE_URL}/#organization` } }
  return (
    <PageShell>
      <JsonLd data={jsonLd} />
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Главная', href: '/ru' }, { label: 'О компании' }]} />
          <span className="section-label">HonestAuto</span>
          <h1>{aboutPage.h1}</h1>
          <div className="page-intro"><p>{aboutPage.lead}</p></div>
        </div>
      </section>
      <section className="section white-section page-section">
        <div className="container about-grid">
          {aboutPage.blocks.map(block => (
            <section key={block.title} className="about-block">
              <h2>{block.title}</h2>
              {block.paragraphs?.map(text => <p key={text}>{text}</p>)}
              {block.list && <ul>{block.list.map(item => <li key={item}>{item}</li>)}</ul>}
            </section>
          ))}
          <p className="about-closing">{aboutPage.closing} <a href={phone.href}>{phone.display}</a></p>
        </div>
      </section>
      <Contact />
    </PageShell>
  )
}
