const PORT = process.env.PORT ?? 9000
const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const cors = require('cors')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const responseTime = require('response-time')
const logger = require('./utils/logger')
const { restResponseTimeHistogram, startMetricsServer } = require('./utils/metrics')
const routes = require('./routeHandler')
const { NotFoundError } = require('./errors/not-found')

dotenv.config()
const app = express()

const options = {origin: process.env.ORIGIN}
app.use(cors(options))
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}))
app.use(
    responseTime((req, res, time) => {
        if(req.url){
            restResponseTimeHistogram.observe(
                {
                    method: req.method,
                    route: req.url,
                    status_code: req.statusCode
                },
                time * 1000
            )
        }
    })
)

connectDB()
routes(app)

app.all('*', async (req, res) => {
    throw new NotFoundError()
})

startMetricsServer()

const server = app.listen(PORT, () => logger.info(`Server running on port: ${PORT}`))

process.on('unhandledRejection', (err) => {
    logger.error(`Error: ${err}`)
    server.close(() => process.exit(1))
})

