const getKpis = require('../services/kpis.services')

const getKpi = async(req, res) => {
    try {
        const kpis = await getKpis()
        res.status(200).json(kpis)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

module.exports = getKpi