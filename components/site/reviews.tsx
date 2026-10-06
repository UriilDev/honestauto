'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { getReviewLinks } from '@/lib/reviews'

const TRUSTINDEX_SCRIPT = 'https://cdn.trustindex.io/loader.js?19ee0718240b98456586dcb9be6'

export function Reviews() {
  const { read, write } = getReviewLinks()
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const widget = widgetRef.current
    if (!widget || widget.querySelector('script')) return

    const script = document.createElement('script')
    script.src = TRUSTINDEX_SCRIPT
    script.async = true
    script.defer = true
    widget.appendChild(script)
  }, [])

  return (
    <section className="section reviews-section" id="reviews">
      <div className="container">
        <div className="section-top">
          <div>
            <span className="section-label">Отзывы клиентов</span>
            <h2>Нам доверяют,<br /><em>потому что честно.</em></h2>
          </div>
          <div className="reviews-summary">
            <p>Реальные отзывы наших клиентов на Google Maps.</p>
          </div>
        </div>

        <div ref={widgetRef} className="trustindex-widget" aria-label="Отзывы клиентов из Google Maps">
          <div className="ti-widget" data-ti-widget-id="19ee0718240b98456586dcb9be6" />
        </div>

        <div className="reviews-actions">
          <a className="solid-button" href={read} target="_blank" rel="noreferrer noopener">Смотреть все отзывы на Google Maps <ArrowRight size={17} aria-hidden="true" /></a>
          <a className="outline-button" href={write} target="_blank" rel="noreferrer noopener">Оставить отзыв</a>
        </div>
      </div>
    </section>
  )
}
