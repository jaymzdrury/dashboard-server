const Products = require('../models/products.model') 
const timer = require('../utils/timer')
const logger = require('../utils/logger')
const { NotFoundError } = require('../errors/not-found')
const {start, end, responseTime} = timer

async function getProducts(){
    start
    try {
        const products = await Products.find().lean().setOptions({sanitizeFilter: true})
        end
        logger.info(`GET: ${responseTime}`)
        return products
    } catch (error) {
        throw new NotFoundError()
    }
}

module.exports = getProducts