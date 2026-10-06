/**
 * Скачивает фото со старого сайта honestauto.md, сжимает в WebP и раскладывает по папкам.
 * Запуск (из папки проекта):  pnpm images
 * Делайте это, пока старый сайт ещё работает на домене.
 * Можно указать другой источник: IMAGE_BASE=http://localhost:8000 pnpm images
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const BASE = (process.env.IMAGE_BASE ?? 'https://honestauto.md').replace(/\/$/, '')
const m = 'static/media/'
const day = (a, b) => `${m}2026_${a}.jpg`

const cars = {
  'byd-seagull': ['07_30_08_46_38', '07_30_08_46_37', '07_30_08_46_35', '07_30_08_46_33(1)', '07_30_08_46_33', '07_30_08_46_31', '07_30_08_46_30', '07_30_08_46_29', '07_30_08_46_28', '07_30_08_46_27', '07_30_08_46_25'].map(n => day(n)),
  'byd-seal': ['photo_2026-02-17_18-18-03', 'photo_2026-02-28_09-34-34', 'photo_2026-02-28_09-34-29', 'photo_2026-02-28_09-34-25', 'photo_2026-02-28_09-34-21', 'photo_2026-02-28_09-34-17', 'photo_2026-02-28_09-34-12', 'photo_2026-02-17_18-18-03 (2)'].map(n => `${m}products/byd/${n}.jpg`),
  'geely-galaxy-e5': ['08_19_08_37_38', '08_19_08_37_32', '08_19_08_37_35', '08_19_08_38_38(1)', '08_19_08_38_10', '08_19_08_38_03', '08_19_08_37_58', '08_19_08_37_48'].map(n => day(n)),
  'avatr-07': ['08_19_10_34_36', '08_19_10_35_26', '08_19_10_34_57', '08_19_10_34_50', '08_19_10_34_44'].map(n => day(n)),
  'audi-q2l': ['photo_2026-02-18_11-40-19', 'photo_2026-02-17_17-46-12 (8)', 'photo_2026-02-17_17-46-12 (7)', 'photo_2026-02-17_17-46-12 (6)', 'photo_2026-02-17_17-46-12 (5)', 'photo_2026-02-17_17-46-12 (4)', 'photo_2026-02-17_17-46-12 (2)', 'photo_2026-02-17_17-46-12', 'photo_2026-02-18_11-39-42'].map(n => `${m}products/audi/${n}.jpg`),
  'bmw-120i': ['photo_2026-02-28_12-41-32'].map(n => `${m}products/bmw/${n}.jpg`),
}
const categories = { 'chinese-brands': `${m}byd.jpg`, 'global-brands': `${m}2026_02_18_09_41_53.jpg` }

async function download(rel) {
  const response = await fetch(`${BASE}/${encodeURI(rel)}`)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return Buffer.from(await response.arrayBuffer())
}
async function toWebp(buffer, file, width) {
  await mkdir(path.dirname(file), { recursive: true })
  await sharp(buffer).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(file)
}

const counts = {}
const failed = []
for (const [slug, list] of Object.entries(cars)) {
  let n = 0
  for (const rel of list) {
    try {
      n += 1
      await toWebp(await download(rel), `public/images/cars/${slug}/${String(n).padStart(2, '0')}.webp`, 1600)
      process.stdout.write(`ok   ${slug} ${n}\n`)
    } catch (error) { n -= 1; failed.push(`${rel} (${error.message})`); process.stdout.write(`FAIL ${rel}: ${error.message}\n`) }
  }
  counts[slug] = n
}
for (const [slug, rel] of Object.entries(categories)) {
  try { await toWebp(await download(rel), `public/images/categories/${slug}.webp`, 1400); console.log('ok   category', slug) }
  catch (error) { failed.push(`${rel} (${error.message})`); console.log('FAIL', rel, error.message) }
}
try { const logo = await download(`${m}logo.png`); await mkdir('public/images/brand', { recursive: true }); await writeFile('public/images/brand/logo.png', logo); console.log('ok   logo') }
catch (error) { failed.push(`${m}logo.png (${error.message})`) }

await writeFile('lib/image-counts.json', JSON.stringify(counts, null, 2) + '\n')
console.log('\nГотово. Фото на машину:', counts)
if (failed.length) console.log('\nНе скачалось:\n' + failed.map(item => ' - ' + item).join('\n'))
