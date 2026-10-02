import { NextResponse } from 'next/server'
import { sendLeadToTelegram } from '@/lib/telegram'

const requests = new Map<string, number[]>()
const allowedPhoneCharacters = /^[+\s\-()\d]+$/

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    const now = Date.now()
    const recent = (requests.get(ip) ?? []).filter(timestamp => now - timestamp < 60_000)
    if (recent.length >= 5) return NextResponse.json({ ok: false, error: 'Слишком много запросов.' }, { status: 429 })
    recent.push(now)
    requests.set(ip, recent)

    const body = await request.json() as { name?: string; phone?: string; car?: string; company?: string }
    if (body.company) return NextResponse.json({ ok: true })
    const name = body.name?.trim() ?? ''
    const phone = body.phone?.trim() ?? ''
    const car = body.car?.trim() ?? ''
    const digits = phone.replace(/\D/g, '')
    if (name.length < 2 || name.length > 80 || !allowedPhoneCharacters.test(phone) || digits.length < 8 || digits.length > 15 || car.length > 120) {
      return NextResponse.json({ ok: false, error: 'Проверьте данные формы.' }, { status: 400 })
    }
    const result = await sendLeadToTelegram({ name, phone, car })
    if (!result.ok) return NextResponse.json({ ok: false, error: 'Не удалось отправить заявку.' }, { status: 502 })
    return NextResponse.json({ ok: true })
  } catch { return NextResponse.json({ ok: false, error: 'Не удалось отправить заявку.' }, { status: 500 }) }
}
