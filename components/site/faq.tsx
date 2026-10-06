import { ArrowRight } from 'lucide-react'
import { faq } from '@/lib/faq'

export function Faq() {
  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-layout">
        <div className="faq-intro">
          <span className="section-label">Вопросы и ответы</span>
          <h2>Отвечаем<br /><em>на главное.</em></h2>
          <p>Если не нашли ответ, оставьте заявку или позвоните. Ответим в течение рабочего дня.</p>
          <a className="solid-button" href="#contact">Задать вопрос <ArrowRight size={17} aria-hidden="true" /></a>
        </div>
        <div className="faq-list">
          {faq.map(item => (
            <details key={item.question} className="faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
