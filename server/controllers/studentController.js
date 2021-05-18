const { Student } = require('../models');


const sendPendingStudentDetail = async (req, res) => {
    const data = await Student.findOne({
        attributes: ['first', 'last', 'phone'],
        where: {
            id: 1
        }
    })
    res.json(data)
}

const sendPendingStudentSummary = async (req, res) => {

    const data = await Student.findAll({
        attributes: ['first', 'last'],
        where: {
            status: 1
        }
    })

    res.json(data)
}

const sendCurrentStudents = async (req, res) => {

    const data = await Student.findAll({
        attributes: ['first', 'last'],
        where: {
            status: 2,
            teacher: req.session.teacher
        }
    })

    res.json(data)
}

const sendCurrentReportData = async (req, res) => {
    // const teacherId = req.session.id
    const data = await Student.findAll({
        attributes: ['first', 'last', 'lesson_day', 'lesson_time', 'lesson_length'],
        // where: {
        //     lesson_day: 3
        // },
        order: [['lesson_day', 'DESC']]
    })
    const reportData = { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] };

    data.forEach(item => {
        if (item.lesson_day == 1) {
            reportData.Monday.push(item)
        }
        if (item.lesson_day == 2) {
            reportData.Tuesday.push(item)
        }
        if (item.lesson_day == 3) {
            reportData.Wednesday.push(item)
        }
        if (item.lesson_day == 4) {
            reportData.Thursday.push(item)
        }
        if (item.lesson_day == 5) {
            reportData.Friday.push(item)
        }

    })

    for (k in reportData) {
        if (reportData[k] == false) {
            delete reportData[k]
        }
    }

    res.json(reportData)

}

module.exports = {
    sendPendingStudentDetail,
    sendPendingStudentSummary,
    sendCurrentStudents,
    sendCurrentReportData
};

