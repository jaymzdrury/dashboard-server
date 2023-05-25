const mongoose = require('mongoose')
const logger = require('../utils/logger')
const dotenv = require('dotenv')

const { BadRequestError } = require('../errors/bad-request')
const { NotFoundError } = require('../errors/not-found')
const { DatabaseConnectionError } = require('../errors/db-connection')

dotenv.config()
const db = process.env.MONGO_URI

const connectDB = () => {
    if (!db) throw new NotFoundError()
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const connection = mongoose.connection
        connection.on('connected', () => logger.info(`Mongo connected on ${connection.host}`))
        connection.on('error', () => {
            throw new DatabaseConnectionError()
        })
    } catch (error) {
        throw new BadRequestError(`MongoDB Failed: ${error}`)
    }
}

module.exports = connectDB