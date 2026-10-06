'use client'

import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, Check, Menu, Phone, X } from 'lucide-react'
import { LeadFormSection } from '@/components/site/lead-form'
import { images, siteContent as content } from '@/lib/site-content'
import { carImages, cars, formatPrice } from '@/lib/catalog'
const CarModel = dynamic(() => import('@/components/site/car-model').then(module => module.CarModel), { ssr: false, loading: () => <div className="car-model-poster" aria-label="Загрузка 3D-модели" /> })

function DesktopCarModel() {
  // Сначала показываем текст и кнопки, 3D запускаем чуть позже, чтобы страница открывалась быстрее
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 600)
    return () => window.clearTimeout(timer)
  }, [])
  return ready ? <CarModel /> : <div className="car-model-poster" aria-label="Загрузка 3D-модели" />
}

export function Logo({ light = false }: { light?: boolean }) { return <Link href="/ru" className={`site-logo ${light ? 'site-logo-light' : ''}`}><span className="logo-frame"><Image src={images.logoMark} alt="HONEST AUTO" width={52} height={52} priority /></span><span className="logo-wordmark"><b>HONEST</b><strong>AUTO</strong></span></Link> }
export function Header() { const [open, setOpen] = useState(false); useEffect(() => { const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }; const closeOnOutsideClick = (event: MouseEvent) => { if (!(event.target as Element).closest('.site-header')) setOpen(false) }; window.addEventListener('keydown', closeOnEscape); document.addEventListener('mousedown', closeOnOutsideClick); return () => { window.removeEventListener('keydown', closeOnEscape); document.removeEventListener('mousedown', closeOnOutsideClick) } }, []); return <header className="site-header"><div className="container nav-inner"><Logo /><nav className="main-nav">{content.navLinks.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav><div className="nav-right"><a className="nav-phone" href={content.contacts.phoneHref}><Phone size={15} aria-hidden="true" /> {content.footer.phone}</a><a className="nav-button" href="#contact">Оставить заявку <ArrowRight size={15} aria-hidden="true" /></a></div><button className="mobile-trigger" aria-label={open ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button></div>{open && <nav className="mobile-nav">{content.navLinks.map(item => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}<a className="nav-button" href="#contact" onClick={() => setOpen(false)}>Оставить заявку <ArrowRight size={15} aria-hidden="true" /></a></nav>}</header> }

export function Hero() { return <section className="new-hero" id="top"><div className="container hero-layout"><div className="hero-content"><div className="hero-kicker"><span className="kicker-dot" /> {content.hero.eyebrow}</div><h1>{content.hero.title.split('\n').map((line, i) => <span key={line} className={i === 1 ? 'accent-line' : ''}>{line}</span>)}</h1><p>{content.hero.description}</p><div className="hero-actions"><a className="solid-button" href="#contact">{content.hero.primaryCta}<ArrowRight size={18} /></a><a className="text-button" href="#process">{content.hero.secondaryCta}<ArrowDown size={17} aria-hidden="true" /></a></div></div><div className="hero-media"><div className="hero-image-wrap" aria-label="3D-модель автомобиля BYD Yangwang U9"><div className="car-stage"><span className="stage-caption">BYD YANGWANG U9</span><DesktopCarModel /></div></div></div></div></section> }

export function TrustStrip() { return <section className="trust-strip"><div className="container trust-inner"><span className="trust-title">Нам доверяют свой автомобиль</span><div className="trust-items"><span>ПРОЗРАЧНО</span><span>НАДЁЖНО</span><span>ПОД КЛЮЧ</span><span>БЕЗ ПОСРЕДНИКОВ</span></div></div></section> }

export function Advantages() { return <section className="section white-section" id="about"><div className="container"><div className="split-heading"><div><span className="section-label">Почему HonestAuto</span><h2>Не просто привезём.<br /><em>Позаботимся.</em></h2></div><p>Мы выстроили процесс так, чтобы вы всегда понимали, за что платите и что происходит с вашим автомобилем.</p></div><div className="advantage-list">{content.advantages.map((item, i) => <article key={item.title}><span>0{i + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><ArrowRight size={20} aria-hidden="true" /></article>)}</div></div></section> }

function RotatingCarImage({ images }: { images: readonly string[] }) {
  const [imageIndex, setImageIndex] = useState(0)
  useEffect(() => {
    if (images.length <= 1) return
    const interval = window.setInterval(() => setImageIndex(prev => (prev + 1) % images.length), 3200)
    return () => window.clearInterval(interval)
  }, [images.length])
  return <div className="car-image-track" aria-label="Фотографии автомобиля">
    {images.map((image, index) => <Image key={image} src={image} alt="" fill sizes="(max-width: 720px) 100vw, 33vw" className={index === imageIndex ? 'is-active' : ''} />)}
    <div className="car-image-progress" aria-hidden="true">{images.map((image, index) => <span key={image} className={index === imageIndex ? 'is-active' : ''} />)}</div>
  </div>
}

export function Catalog() {
  const [active, setActive] = useState(0)
  const visible = [0, 1, 2].map(offset => cars[(active + offset) % cars.length])
  return <section className="section catalog-section" id="catalog"><div className="container"><div className="section-top"><div><span className="section-label">{content.catalog.eyebrow}</span><h2>{content.catalog.title}</h2></div><div className="catalog-heading-actions"><p>{content.catalog.description}</p><div className="carousel-controls"><button aria-label="Предыдущий автомобиль" onClick={() => setActive((active - 1 + cars.length) % cars.length)}><ArrowRight size={18} style={{ transform: 'scaleX(-1)' }} aria-hidden="true" /></button><button aria-label="Следующий автомобиль" onClick={() => setActive((active + 1) % cars.length)}><ArrowRight size={18} aria-hidden="true" /></button></div></div></div><div className="new-cars-grid">{visible.map((car, i) => <Link className="new-car-card" href={`/ru/cars/${car.slug}`} key={`${car.slug}-${active}-${i}`}><div className="new-car-image"><Image src={carImages(car)[0]} alt={car.name} fill sizes="(max-width: 720px) 100vw, 33vw" /></div><div className="new-car-info"><span>{car.brand}</span><h3>{car.shortName}</h3><div><strong>{formatPrice(car.price)}</strong><span className="card-arrow" aria-hidden="true"><ArrowRight size={18} /></span></div></div></Link>)}</div><div className="catalog-bottom"><span>{String(active + 1).padStart(2, '0')} / {String(cars.length).padStart(2, '0')}</span><Link href="/ru/chinese-brands" className="outline-button">Весь каталог <ArrowRight size={17} aria-hidden="true" /></Link></div></div></section>
}

export function CategoryCards() { return <section className="section category-section"><div className="container"><div className="section-top"><div><span className="section-label">{content.categories.eyebrow}</span><h2>{content.categories.title}</h2></div><p>{content.categories.description}</p></div><div className="category-grid"><Link href="/ru/chinese-brands" className="category-card category-card-blue"><span>01 / 02</span><div><small>КИТАЙСКИЕ БРЕНДЫ</small><h3>BYD, Geely,<br />Chery и другие</h3><ArrowRight size={20} aria-hidden="true" /></div></Link><Link href="/ru/global-brands" className="category-card category-card-image"><Image src={images.audi} alt="Audi Q2L" fill sizes="(max-width: 720px) 100vw, 50vw" /><div><small>МЕЖДУНАРОДНЫЕ БРЕН��Ы</small><h3>Audi, BMW<br />и премиум-класс</h3><ArrowRight size={20} aria-hidden="true" /></div></Link></div></div></section> }

export function Location() { return <section className="section location-section" id="location"><div className="container location-layout"><div><span className="section-label">{content.location.eyebrow}</span><h2>{content.location.title}</h2><p>{content.location.description}</p><div className="location-address"><span className="map-pin" aria-hidden="true">●</span><div><b>{content.location.address}</b><small>Открыть маршрут в Google Maps</small></div></div><a className="solid-button" href="https://maps.app.goo.gl/z9HFczGHMEZkCpf79" target="_blank" rel="noreferrer">Построить маршрут <ArrowRight size={17} aria-hidden="true" /></a></div><div className="map-card"><iframe title="Карта HonestAuto в Кишинёве" src="https://www.openstreetmap.org/export/embed.html?bbox=28.85%2C46.98%2C28.9%2C47.04&layer=mapnik&marker=47.02%2C28.87" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div className="map-card-label"><span>HONEST AUTO</span><b>Кишинёв</b></div></div></div></section> }

export function Process() { return <section className="section process-section" id="process"><div className="container"><div className="section-top"><div><span className="section-label">Простой путь</span><h2>От желания<br /><em>до ключей.</em></h2></div><p>Четыре понятных шага, одна команда и никакой неопределённости.</p></div><div className="process-grid">{content.steps.map((step, i) => <article key={step.number}><div className="process-number">{step.number}</div><div className="process-line" /><h3>{step.title}</h3><p>{step.text}</p>{i === content.steps.length - 1 && <Check className="process-check" size={22} aria-hidden="true" />}</article>)}</div></div></section> }


export function Contact() { return <LeadFormSection eyebrow={content.contact.eyebrow} title={content.contact.title} text={content.contact.text} /> }

export function Footer() { return <footer className="new-footer"><div className="container footer-top"><div><Logo light /><p>{content.footer.description}</p></div><div><span className="footer-label">Навигация</span>{content.navLinks.slice(1).map(item => <Link href={item.href} key={item.href}>{item.label}</Link>)}</div><div><span className="footer-label">Контакты</span><a href={`tel:${content.footer.phone.replaceAll(' ', '')}`}>{content.footer.phone}</a><a href={`mailto:${content.footer.email}`}>{content.footer.email}</a><p>{content.footer.address}</p></div></div><div className="container footer-bottom"><span>© 2026 HonestAuto</span><a href="/ru/privacy">Политика конфиденциальности</a></div></footer> }
