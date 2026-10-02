import 'server-only'

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character] ?? character))
}

type Lead = { name: string; phone: string; car?: string }

export async function sendLeadToTelegram(lead: Lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  // Можно указать несколько получателей через запятую: "123456789,-1001234567890"
  const chatIds = (process.env.TELEGRAM_CHAT_ID ?? '').split(',').map(id => id.trim()).filter(Boolean)

  if (!token || chatIds.length === 0) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[lead] Telegram не настроен (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID). Заявка НЕ отправлена:', lead)
      return { ok: true }
    }
    console.error('[lead] Telegram не настроен: проверьте переменные окружения')
    return { ok: false }
  }

  const time = new Intl.DateTimeFormat('ru-RU', { timeZone: 'Europe/Chisinau', dateStyle: 'short', timeStyle: 'short' }).format(new Date())
  const lines = [
    '🚗 <b>Новая заявка с сайта HonestAuto</b>',
    '',
    `👤 Имя: ${escapeHtml(lead.name)}`,
    `📞 Телефон: ${escapeHtml(lead.phone)}`,
  ]
  if (lead.car) lines.push(`🚘 Автомобиль: ${escapeHtml(lead.car)}`)
  lines.push('', `🕒 ${time} (Кишинёв)`)
  const text = lines.join('\n')

  const results = await Promise.all(chatIds.map(async chatId => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    try {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true }),
        signal: controller.signal,
      })
      if (!response.ok) console.error('[lead] Telegram ответил', response.status, await response.text().catch(() => ''))
      return response.ok
    } catch (error) {
      console.error('[lead] Ошибка отправки в Telegram', error)
      return false
    } finally {
      clearTimeout(timeout)
    }
  }))

  // успех, если дошло хотя бы одному получателю
  return { ok: results.some(Boolean) }
}
