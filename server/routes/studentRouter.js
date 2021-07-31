const express = require('express');
const router = express.Router();
const { studentController } = require('../controllers')

// router.get('/pending-data', studentController.sendPendingStudentData)
router.get('/current-report', studentController.sendCurrentReportData)
router.post('/current-report', studentController.processCurrentReportData)
router.get('/all', studentController.sendGlobalListOfStudents)
router.post('/enroll', studentController.enrollStudent)

module.exports = router