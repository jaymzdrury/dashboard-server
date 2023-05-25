const kpiRoutes = require('./routes/kpis.routes')
const productRoutes = require('./routes/products.routes')
const transactionRoutes = require('./routes/transactions.routes')

const routeHandler = (app) => {
    app.use('/', kpiRoutes)
    app.use('/', productRoutes)
    app.use('/', transactionRoutes)
}

module.exports = routeHandler