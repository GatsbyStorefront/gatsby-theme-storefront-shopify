export default function formatPrice(price, locales, currency) {
  return new Intl.NumberFormat(locales, {
    style: 'currency',
    currency,
  }).format(price);
}
