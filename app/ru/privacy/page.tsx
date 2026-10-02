import type { Metadata } from 'next'
import Link from 'next/link'
import { siteContent } from '@/lib/site-content'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  alternates: { canonical: '/ru/privacy' },
  openGraph: { url: '/ru/privacy', title: 'Политика конфиденциальности | HonestAuto', images: [{ url: '/og-image.png', width: 1200, height: 630 }] },
}

export default function PrivacyPage() {
  return <main className="legal-page"><div className="container"><Link href="/ru">← Вернуться на сайт</Link><h1>Политика конфиденциальности</h1><p>Оператор: [Название компании], IDNO: [IDNO].</p><p>Последнее обновление: [дата]</p><p>Мы используем данные из формы только для связи по вашему запросу и не передаём их третьим лицам, кроме случаев, предусмотренных законом.</p><h2>Какие данные мы получаем</h2><p>Имя, номер телефона и сведения об интересующем автомобиле.</p><h2>Контакты</h2><p>По вопросам обработки данных: {siteContent.contacts.email}</p></div></main>
}
