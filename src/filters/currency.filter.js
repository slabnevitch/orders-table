export default function currencyFilter(value, currency = 'USD') {
	return Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency
	}).format(value)
}