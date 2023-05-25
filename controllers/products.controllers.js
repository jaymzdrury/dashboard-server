const getProducts = require('../services/products.services')
const getProduct = async(req, res) => {
    try {
        const products = await getProducts()
        res.status(200).json(products)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

module.exports = getProduct