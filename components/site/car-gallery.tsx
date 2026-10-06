'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function CarGallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0)
  const go = (step: number) => setIndex(current => (current + step + images.length) % images.length)
  return (
    <div className="car-gallery">
      <div className="car-gallery-main">
        <Image key={images[index]} src={images[index]} alt={`${alt}, фото ${index + 1}`} fill priority={index === 0} sizes="(max-width: 900px) 100vw, 56vw" />
        {images.length > 1 && (
          <>
            <button type="button" className="gallery-nav gallery-prev" onClick={() => go(-1)} aria-label="Предыдущее фото"><ChevronLeft size={22} aria-hidden="true" /></button>
            <button type="button" className="gallery-nav gallery-next" onClick={() => go(1)} aria-label="Следующее фото"><ChevronRight size={22} aria-hidden="true" /></button>
            <span className="gallery-count">{index + 1} / {images.length}</span>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="car-gallery-thumbs" role="tablist" aria-label="Фотографии автомобиля">
          {images.map((src, i) => (
            <button type="button" key={src} role="tab" aria-selected={i === index} aria-label={`Фото ${i + 1}`} className={i === index ? 'is-active' : ''} onClick={() => setIndex(i)}>
              <Image src={src} alt="" fill sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
