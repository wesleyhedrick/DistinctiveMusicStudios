const express = require('express');
const router = express.Router();
const { reportsController } = require('../controllers')

router.get('/admin', reportsController.adminReportsByTeacherName)
router.get('/admin/thismonth', reportsController.adminReportsWithinMonth)
router.get('/teacher/:teacherId', reportsController.teacher)

module.exports = router