const express = require('express')
const getTransactions = require('../controllers/transactions.controllers')
const router = express.Router(getTransactions)

router.get("/transactions")

module.exports = router;