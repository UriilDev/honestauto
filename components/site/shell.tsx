import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Footer, Header } from '@/components/site/sections'

export function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="new-site"><Header /><main>{children}</main><Footer /></div>
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Навигационная цепочка">
      <ol>
        {items.map((item, index) => (
          <li key={item.label}>
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
            {index < items.length - 1 && <ChevronRight size={14} aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://honestauto.md'
