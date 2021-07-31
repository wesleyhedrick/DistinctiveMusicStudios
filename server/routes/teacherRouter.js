const express = require('express');
const router = express.Router();
const { teacherController } = require('../controllers')

router.get('/names-and-instruments', teacherController.getTeacherNamesAndInstruments)

module.exports = router