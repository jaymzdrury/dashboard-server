const express = require('express')
const getKpis = require('../controllers/kpis.controllers')
const router = express.Router()

router.get("/kpis", getKpis)

module.exports = router;