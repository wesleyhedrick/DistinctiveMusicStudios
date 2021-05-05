const express = require('express');
const router = express.Router();
const { instrumentController } = require('../controllers')

router.get('/', instrumentController.getInstruments)

module.exports = router