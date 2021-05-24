const express = require('express');
const router = express.Router();
const { studentController } = require('../controllers')

// router.get('/pending-data', studentController.sendPendingStudentData)
router.get('/current-report', studentController.sendCurrentReportData)
router.post('/current-report', studentController.processCurrentReportData)


module.exports = router