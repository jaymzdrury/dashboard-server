const getTransactions = require('../services/transactions.services')
const getTransaction = async(req, res) => {
    try {
        const transactions = await getTransactions()
        res.status(200).json(transactions)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

module.exports = getTransaction