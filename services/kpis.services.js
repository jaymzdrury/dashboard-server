const KPI = require('../models/kpis.model')
const timer = require('../utils/timer')
const logger = require('../utils/logger')
const { NotFoundError } = require('../errors/not-found')
const {start, end, responseTime} = timer

async function getKpis(){
    start
    try {
        const kpis = await KPI.find().lean().setOptions({sanitizeFilter: true})
        end
        logger.info(`GET: ${responseTime}`)
        return kpis
    } catch (error) {
        throw new NotFoundError()
    }
}

module.exports = getKpis