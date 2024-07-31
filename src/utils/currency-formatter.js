const formatter = new Intl.NumberFormat('ru-RU', {currency: 'RUB', style: 'currency'})

export function formatCurrency(value) {
  return formatter.format(value)
}