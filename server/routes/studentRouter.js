const express = require('express');
const router = express.Router();
const { studentController } = require('../controllers')

// router.get('/pending-data', studentController.sendPendingStudentData)
router.get('/current-report', studentController.sendCurrentReportData)


module.exports = router