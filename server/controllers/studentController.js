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
    const data = await Student.findAll({
        attributes: ['first', 'last', 'lesson_day', 'lesson_time', 'lesson_length'],
        // where: {
        //     lesson_day: 3
        // },
        order: [['lesson_day', 'DESC']]
    })
    const days = { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] };

    data.forEach(item => {
        if (item.lesson_day == 1) {
            days.Monday.push(item)
        }
        if (item.lesson_day == 2) {
            days.Tuesday.push(item)
        }
        if (item.lesson_day == 3) {
            days.Wednesday.push(item)
        }
        if (item.lesson_day == 4) {
            days.Thursday.push(item)
        }
        if (item.lesson_day == 5) {
            days.Friday.push(item)
        }


    })

    for (k in days) {
        if (days[k] == false) {
            delete days[k]
        }
    }

    const setOfDays = new Set();
    data.forEach(item => setOfDays.add(item.lesson_day))

    res.json(days)

}

module.exports = {
    sendPendingStudentDetail,
    sendPendingStudentSummary,
    sendCurrentStudents,
    sendCurrentReportData
};

