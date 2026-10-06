/**
 * Отзывы с Google Maps.
 *
 * КАК ЗАПОЛНИТЬ:
 * 1. placeId: найдите Place ID компании на
 *    https://developers.google.com/maps/documentation/places/web-service/place-id (поиск по названию).
 *    Он нужен для кнопки «Оставить отзыв».
 * 2. rating и count: впишите реальные значения со страницы компании в Google Maps
 *    (не придумывайте! Если не заполнено, блок с рейтингом не показывается).
 * 3. reviews: вручную копируйте НАСТОЯЩИЕ отзывы (имя, текст, дата) с карточки Google Maps.
 *    Желательно с разрешения авторов. Не меняйте смысл, можно сокращать длинные.
 *
 * Пока массив reviews пуст, на сайте показывается только блок с кнопками «Смотреть отзывы»
 * и «Оставить отзыв» (без выдуманных отзывов).
 */
export type Review = { name: string; text: string; date?: string; rating?: 1 | 2 | 3 | 4 | 5 }

export const googleReviews = {
  mapsUrl: 'https://maps.app.goo.gl/z9HFczGHMEZkCpf79',
  placeId: '' as string, // например 'ChIJ...'
  rating: undefined as number | undefined, // например 4.9
  count: undefined as number | undefined, // например 37
}

export const reviews: Review[] = [
  // { name: 'Имя клиента', text: 'Текст настоящего отзыва…', date: 'Август 2026', rating: 5 },
]

/** Только для предпросмотра дизайна: NEXT_PUBLIC_REVIEWS_PREVIEW=1 в .env.local. Не включать на боевом сайте. */
export const previewReviews: Review[] = [
  { name: 'Имя клиента', text: 'Пример отзыва: здесь будет настоящий текст клиента с Google Maps.', date: 'Дата', rating: 5 },
  { name: 'Имя клиента', text: 'Пример отзыва: здесь будет настоящий текст клиента с Google Maps.', date: 'Дата', rating: 5 },
  { name: 'Имя клиента', text: 'Пример отзыва: здесь будет настоящий текст клиента с Google Maps.', date: 'Дата', rating: 5 },
]

export function getReviewLinks() {
  const write = googleReviews.placeId
    ? `https://search.google.com/local/writereview?placeid=${googleReviews.placeId}`
    : googleReviews.mapsUrl
  return { read: googleReviews.mapsUrl, write }
}
