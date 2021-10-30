module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
    ? '/orders-table/' //имя проекта на gh-pages
    : '/', //путь для development mode
}