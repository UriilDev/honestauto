export const siteContent = {
  brand: { name: 'HONEST AUTO', tagline: 'Автомобили из Китая в Молдову' },
  nav: ['Главная', 'Каталог', 'Как мы работаем', 'О компании', 'Контакты'],
  navLinks: [{ label: 'Главная', href: '#top' }, { label: 'Каталог', href: '#catalog' }, { label: 'Как мы работаем', href: '#process' }, { label: 'О компании', href: '#about' }, { label: 'Контакты', href: '#contact' }],
  contacts: { phone: '+373 67 899 299', phoneHref: 'tel:+37367899299', email: 'info@honestauto.md', address: 'Кишинёв, ул. Мештерул Маноле 14/3', mapUrl: 'https://maps.app.goo.gl/z9HFczGHMEZkCpf79' },
  hero: { eyebrow: 'Прямые поставки из Китая', title: 'Ваш новый автомобиль —\nчестно и под ключ', accent: 'из Китая в Молдову', description: 'Находим, проверяем и доставляем автомобили из Китая. Вы знаете реальную цену и каждый шаг сделки.', primaryCta: 'Подобрать автомобиль', secondaryCta: 'Как это работает' },
  stats: [{ value: '500+', label: 'автомобилей доставили' }, { value: 'до 30%', label: 'экономия от рынка' }, { value: '7 лет', label: 'на рынке' }],
  advantages: [{ title: 'Прозрачная цена', text: 'Показываем полный расчёт до оформления сделки.' }, { title: 'Проверка экспертом', text: 'Диагностика, история и видеоотчёт по каждому авто.' }, { title: 'Доставка под ключ', text: 'Берём на себя логистику, документы и растаможку.' }],
  catalog: { eyebrow: 'В наличии и в пути', title: 'Автомобили, которые выбирают сейчас', description: 'Подберём похожие варианты под ваш бюджет и задачу.' },
  categories: { eyebrow: 'Каталог HonestAuto', title: 'Выбирайте по задаче', description: 'Изучите китайские модели и международные бренды в одном месте.' },
  location: { eyebrow: 'Мы рядом', title: 'HonestAuto в Кишинёве', description: 'Приезжайте на встречу или получите расчёт онлайн. Покажем автомобили, объясним процесс и ответим на вопросы.', address: 'Кишинёв, ул. Мештерул Маноле 14/3' },
  steps: [{ number: '01', title: 'Заявка', text: 'Расскажите, какой автомобиль ищете.' }, { number: '02', title: 'Подбор', text: 'Находим лучшие варианты и считаем стоимость.' }, { number: '03', title: 'Проверка', text: 'Проводим независимую экспертизу в Китае.' }, { number: '04', title: 'Доставка', text: 'Организуем путь до Молдовы.' }],
  contact: { eyebrow: 'Получите расчёт', title: 'Начните с разговора', text: 'Оставьте контакты. Ответим в течение рабочего дня и подскажем лучший вариант.', button: 'Получить консультацию' },
  footer: { description: 'Честный путь к вашему автомобилю из Китая в Молдову.', address: 'Кишинёв, ул. Мештерул Маноле 14/3', phone: '+373 67 899 299', email: 'info@honestauto.md' }
} as const

export const images = {
  logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-JGV1nvtptMuo9IreWToyj5jnTwCFC2.png',
  logoMark: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/409551027_880170130098610_7447221379427107222_n-ugYslTalZ0EV6Ho4sncDoZ9AL9Arvc.jpg',
  hero: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026_07_30_08_46_38.jpg-c77wfy39WNkgaGodhp5FJ6sktc63QP.png',
  bydSeal: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-02-17_18-18-03-800x700-J1rr2hu0NazVna4a4wGvPYFaZ5XBGC.jpg',
  audi: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uDFkVUfZKQklvSuiBlNaLE1y9GyCim.png',
  bmw: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hZvjOYhrrGpZ4TwTi8J49Yka7KrBQT.png',
  interior: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VaSuETLeVvpefjVfYGGpVHlRBYHqVi.png'
} as const

export const cars = [
  { name: 'BYD Seagull', spec: '2024 · Электро · 405 км', price: '10 900 €', status: 'В наличии', images: [images.hero, images.interior, images.audi] },
  { name: 'BYD Seal', spec: '2022 · Электро · 550 км', price: '18 400 €', status: 'В пути', images: [images.bydSeal, images.hero, images.bmw] },
  { name: 'Audi Q2L', spec: '2020 · Бензин · 1.4 TFSI', price: '16 300 €', status: 'В наличии', images: [images.audi, images.interior, images.bydSeal] },
  { name: 'BMW 120i', spec: '2021 · Бензин · M Sport', price: '15 950 €', status: 'В пути', images: [images.bmw, images.audi, images.hero] }
] as const

export type SiteContent = typeof siteContent
export type Car = typeof cars[number]

export function getSiteContent() { return siteContent }
export function getCars() { return cars }
