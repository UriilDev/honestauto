import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { carImages, formatPrice, type Car } from '@/lib/catalog'

export function CarCard({ car }: { car: Car }) {
  const meta = [car.year, car.mileageKm ? `${car.mileageKm.toLocaleString('ru-RU').replace(/\u00a0/g, ' ')} км` : null].filter(Boolean).join(' · ')
  return (
    <Link className="new-car-card" href={`/ru/cars/${car.slug}`}>
      <div className="new-car-image"><Image src={carImages(car)[0]} alt={car.name} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" /></div>
      <div className="new-car-info">
        <span>{car.brand}{meta && ` · ${meta}`}</span>
        <h3>{car.name}</h3>
        <div>
          <strong>{formatPrice(car.price)}{car.oldPrice && <s className="old-price">{formatPrice(car.oldPrice)}</s>}</strong>
          <span className="card-arrow" aria-hidden="true"><ArrowRight size={18} /></span>
        </div>
      </div>
    </Link>
  )
}
