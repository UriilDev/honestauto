import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Phone } from 'lucide-react'
import { CarCard } from '@/components/site/car-card'
import { CarGallery } from '@/components/site/car-gallery'
import { Breadcrumbs, JsonLd, PageShell, SITE_URL } from '@/components/site/shell'
import { LeadFormSection } from '@/components/site/lead-form'
import { carImages, cars, categoryOf, formatPrice, getCar, phone } from '@/lib/catalog'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() { return cars.map(car => ({ slug: car.slug })) }
export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const car = getCar(slug)
  if (!car) return {}
  const path = `/ru/cars/${car.slug}`
  return {
    title: { absolute: car.seoTitle.includes('HonestAuto') ? car.seoTitle : `${car.seoTitle} | HonestAuto` },
    description: car.seoDescription,
    alternates: { canonical: path },
    openGraph: { title: car.seoTitle, description: car.seoDescription, url: path, type: 'website', images: [{ url: carImages(car)[0], alt: car.name }] },
  }
}

export default async function CarPage({ params }: Props) {
  const { slug } = await params
  const car = getCar(slug)
  if (!car) notFound()
  const category = categoryOf(car)
  const images = carImages(car)
  const related = cars.filter(item => item.slug !== car.slug && item.category === car.category).concat(cars.filter(item => item.category !== car.category)).slice(0, 3)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Car', name: car.name, description: car.seoDescription, brand: { '@type': 'Brand', name: car.brand }, image: images.map(src => `${SITE_URL}${src}`), url: `${SITE_URL}/ru/cars/${car.slug}`,
        ...(car.year ? { vehicleModelDate: String(car.year) } : {}),
        ...(car.mileageKm ? { mileageFromOdometer: { '@type': 'QuantitativeValue', value: car.mileageKm, unitCode: 'KMT' } } : {}),
        offers: { '@type': 'Offer', price: car.price, priceCurrency: 'EUR', url: `${SITE_URL}/ru/cars/${car.slug}`, seller: { '@type': 'Organization', name: 'HonestAuto' } },
      },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Главная', item: `${SITE_URL}/ru` }, { '@type': 'ListItem', position: 2, name: category.title, item: `${SITE_URL}${category.path}` }, { '@type': 'ListItem', position: 3, name: car.shortName, item: `${SITE_URL}/ru/cars/${car.slug}` }] },
    ],
  }

  return (
    <PageShell>
      <JsonLd data={jsonLd} />
      <section className="car-page">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Главная', href: '/ru' }, { label: category.title, href: category.path }, { label: car.shortName }]} />
          <div className="car-layout">
            <CarGallery images={images} alt={car.name} />
            <aside className="car-summary">
              <span className="section-label">{car.brand}</span>
              <h1>{car.name}</h1>
              <p className="car-lead">{car.summary}</p>
              <div className="car-price"><span>Цена в Молдове</span><strong>{formatPrice(car.price)}{car.oldPrice && <s className="old-price">{formatPrice(car.oldPrice)}</s>}</strong></div>
              {car.highlights && <ul className="car-highlights">{car.highlights.map(item => <li key={item}>{item}</li>)}</ul>}
              <div className="car-actions">
                <a className="solid-button" href="#contact">Заказать этот автомобиль <ArrowRight size={17} aria-hidden="true" /></a>
                <a className="outline-button" href={phone.href}><Phone size={16} aria-hidden="true" /> {phone.display}</a>
              </div>
              <dl className="spec-table">{car.specs.map(spec => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}</dl>
            </aside>
          </div>
          <article className="car-description">
            {car.sections.map((section, index) => (
              <section key={section.title ?? index}>
                {section.title && <h2>{section.title}</h2>}
                {section.paragraphs?.map(text => <p key={text}>{text}</p>)}
                {section.list && <ul>{section.list.map(item => <li key={item}>{item}</li>)}</ul>}
              </section>
            ))}
          </article>
        </div>
      </section>
      <section className="section catalog-section page-section">
        <div className="container">
          <div className="section-top"><div><span className="section-label">Смотрите также</span><h2>Другие автомобили</h2></div><Link className="text-link" href={category.path}>Весь каталог <ArrowRight size={15} aria-hidden="true" /></Link></div>
          <div className="new-cars-grid">{related.map(item => <CarCard car={item} key={item.slug} />)}</div>
        </div>
      </section>
      <LeadFormSection eyebrow="Заказать автомобиль" title={`Хотите ${car.shortName}? Рассчитаем стоимость.`} text="Оставьте контакты. Ответим в течение рабочего дня, назовём итоговую цену и сроки." defaultCar={car.name} />
    </PageShell>
  )
}
