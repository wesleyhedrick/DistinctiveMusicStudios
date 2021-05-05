const { Student, Teacher } = require('../models');

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

module.exports = {
    populateMonthlyReport
}