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



module.exports = {
    sendPendingStudentDetail,
    sendPendingStudentSummary,
    sendCurrentStudents
};

