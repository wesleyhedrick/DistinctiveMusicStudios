const { Student, Teacher, Instruments } = require('../models');

const populateMonthlyReport = async (req, res) => {
    const students = await Student.findAll({
        attributes: ['first', 'last', 'lesson_length', 'lesson_day'],
        where: {
            teacher: 'x',
            status: 'y',

        }
    })

    res.json(students)
}

const getTeacherNamesAndInstruments = async (req, res) => {
    const teacherNames = await Teacher.findAll({
        attributes: ['id', 'first', 'last']
    })

    const instruments = await Instruments.findAll()
    const teacherNamesAndInstruments = { teacherNames, instruments }

    res.json(teacherNamesAndInstruments)
}

module.exports = {
    populateMonthlyReport,
    getTeacherNamesAndInstruments
}