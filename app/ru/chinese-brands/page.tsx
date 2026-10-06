import type { Metadata } from 'next'
import { CategoryPage } from '@/components/site/category-page'
import { getCategory } from '@/lib/catalog'

const category = getCategory('chinese-brands')!
export const metadata: Metadata = {
  title: { absolute: `${category.seoTitle} | HonestAuto` },
  description: category.seoDescription,
  alternates: { canonical: category.path },
  openGraph: { title: category.seoTitle, description: category.seoDescription, url: category.path },
}
export default function Page() { return <CategoryPage category={category} /> }
