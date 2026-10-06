import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { CarCard } from '@/components/site/car-card'
import { Breadcrumbs, JsonLd, PageShell, SITE_URL } from '@/components/site/shell'
import { Contact } from '@/components/site/sections'
import { carsInCategory, categories, phone, type Category } from '@/lib/catalog'

export function CategoryPage({ category }: { category: Category }) {
  const list = carsInCategory(category.slug === 'chinese-brands' ? 'chinese' : 'global')
  const other = categories.find(item => item.slug !== category.slug)!
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'CollectionPage', name: category.h1, description: category.seoDescription, url: `${SITE_URL}${category.path}`, inLanguage: 'ru' },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Главная', item: `${SITE_URL}/ru` }, { '@type': 'ListItem', position: 2, name: category.title, item: `${SITE_URL}${category.path}` }] },
      { '@type': 'ItemList', itemListElement: list.map((car, index) => ({ '@type': 'ListItem', position: index + 1, url: `${SITE_URL}/ru/cars/${car.slug}`, name: car.name })) },
    ],
  }
  return (
    <PageShell>
      <JsonLd data={jsonLd} />
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Главная', href: '/ru' }, { label: category.title }]} />
          <span className="section-label">Каталог HonestAuto</span>
          <h1>{category.h1}</h1>
          <div className="page-intro">{category.intro.map(line => <p key={line}>{line}</p>)}</div>
          <div className="brand-pills" aria-label="Бренды">{category.brands.map(brand => <span key={brand}>{brand}</span>)}</div>
        </div>
      </section>
      <section className="section catalog-section page-section">
        <div className="container">
          <div className="section-top"><div><span className="section-label">В каталоге</span><h2>Автомобили под заказ</h2></div><p>Цена указана для Молдовы. Подберём похожие варианты под ваш бюджет и задачу.</p></div>
          <div className="new-cars-grid category-grid-cars">{list.map(car => <CarCard car={car} key={car.slug} />)}</div>
          <div className="page-cta">
            <a className="solid-button" href="#contact">Подобрать автомобиль <ArrowRight size={17} aria-hidden="true" /></a>
            <a className="outline-button" href={phone.href}><Phone size={16} aria-hidden="true" /> {phone.display}</a>
            <Link className="text-link" href={other.path}>{other.title} <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
      <Contact />
    </PageShell>
  )
}
