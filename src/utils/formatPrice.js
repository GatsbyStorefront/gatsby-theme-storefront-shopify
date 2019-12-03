import config from '../../gatsbystorefront-config';
const { locales, currency } = config;

export default function formatPrice(price) {
  return new Intl.NumberFormat(locales, {
    style: 'currency',
    currency,
  }).format(price);
}
