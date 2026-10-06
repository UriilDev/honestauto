'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Check, Phone } from 'lucide-react'

export function LeadForm({ defaultCar = '' }: { defaultCar?: string }) {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [car, setCar] = useState(defaultCar)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const handler = (event: Event) => setCar(String((event as CustomEvent<string>).detail ?? ''))
    window.addEventListener('lead:car', handler)
    return () => window.removeEventListener('lead:car', handler)
  }, [])

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const nextErrors: Record<string, string> = {}
    if (name.length < 2) nextErrors.name = 'Введите имя (минимум 2 символа).'
    if (!/^\+?[\d\s-]{8,15}$/.test(phone) || phone.replace(/\D/g, '').length < 8 || phone.replace(/\D/g, '').length > 15) nextErrors.phone = 'Введите корректный номер телефона.'
    if (!data.get('consent')) nextErrors.consent = 'Необходимо согласие на обработку данных.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) { setState('error'); return }
    setState('loading')
    try {
      const response = await fetch('/api/lead', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name, phone, car: String(data.get('car') ?? ''), company: String(data.get('company') ?? '') }) })
      if (!response.ok) throw new Error('Request failed')
      setState('success')
      form.reset()
      setCar(defaultCar)
    } catch {
      setState('error')
    }
  }

  if (state === 'success') return <div className="form-success" role="status"><Check size={22} /><b>Заявка отправлена</b><span>Мы свяжемся с вами в течение рабочего дня.</span></div>
  return <form onSubmit={submit} noValidate aria-busy={state === 'loading'}>
    <div className="form-heading"><span>01</span><b>Расскажите о задаче</b></div>
    <label htmlFor="lead-name">Ваше имя</label><input id="lead-name" name="name" required minLength={2} autoComplete="name" placeholder="Ваше имя" aria-invalid={Boolean(errors.name)} />{errors.name && <span className="form-error" aria-live="polite">{errors.name}</span>}
    <label htmlFor="lead-phone">Номер телефона</label><input id="lead-phone" name="phone" type="tel" required autoComplete="tel" placeholder="Номер телефона" aria-invalid={Boolean(errors.phone)} />{errors.phone && <span className="form-error" aria-live="polite">{errors.phone}</span>}
    <label htmlFor="lead-car">Автомобиль</label><input id="lead-car" name="car" value={car} onChange={event => setCar(event.target.value)} placeholder="Какой автомобиль интересует?" />
    <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="honeypot" />
    <label className="consent-label"><input name="consent" type="checkbox" required aria-invalid={Boolean(errors.consent)} /><span>Согласен на <a href="/ru/privacy">обработку персональных данных</a></span></label>{errors.consent && <span className="form-error" aria-live="polite">{errors.consent}</span>}
    {state === 'error' && !Object.keys(errors).length && <p className="form-error" role="alert">Не удалось отправить заявку. Позвоните нам, и мы поможем.</p>}
    <button className="solid-button form-submit" type="submit" disabled={state === 'loading'}>{state === 'loading' ? 'Отправляем…' : 'Получить консультацию'} {state !== 'loading' && <ArrowRight size={17} />}</button>
    <a className="form-direct-phone" href="tel:+37367899299"><Phone size={15} /> Или позвоните: +373 67 899 299</a>
  </form>
}

export function LeadFormSection({ eyebrow, title, text, defaultCar }: { eyebrow: string; title: string; text: string; defaultCar?: string }) {
  return <section className="contact-section" id="contact"><div className="container contact-layout"><div className="contact-content"><span className="section-label">{eyebrow}</span><h2>{title}</h2><p>{text}</p><div className="contact-features"><div className="feature"><span className="feature-icon">⚡</span><span>Быстрый ответ</span></div><div className="feature"><span className="feature-icon">🎯</span><span>Точная оценка</span></div><div className="feature"><span className="feature-icon">✓</span><span>Без обязательств</span></div></div></div><LeadForm defaultCar={defaultCar} /></div></section>
}

export default LeadForm
