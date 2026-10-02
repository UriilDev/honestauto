import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Страница не найдена', robots: { index: false, follow: false } }

export default function NotFound() { return <main className="legal-page"><div className="container"><p className="section-label">404</p><h1>Страница не найдена</h1><p>Похоже, такой страницы больше нет.</p><Link className="solid-button" href="/ru">На главную</Link></div></main> }
