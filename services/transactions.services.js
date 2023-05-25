const Transactions = require('../models/transactions.model') 
const timer = require('../utils/timer')
const logger = require('../utils/logger')
const { NotFoundError } = require('../errors/not-found')
const {start, end, responseTime} = timer

async function getServices(){
    start
    try {
        const transactions = await Transactions.find().lean().setOptions({sanitizeFilter: true})
        end
        logger.info(`GET: ${responseTime}`)
        return transactions
    } catch (error) {
        throw new NotFoundError()
    }
}

module.exports = getServices