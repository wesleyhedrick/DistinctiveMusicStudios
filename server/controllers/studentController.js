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
const processCurrentReportData = async (req, res) => {
    console.log(`processCurrentReportData is running`)
    console.log(req.body)
    const lessonDays = Object.keys(req.body)

    //Nested loop below! :( I know! The arrays aren't that big.
    //loop through all days in the req.body
    //for each day's data, update the database
    //If the id is 1000, this student was added on the teacher form only and is not yet
    //fully in the student db. 
    //ELSE update first, last, lesson_time, lesson_day based on student.id
    lessonDays.forEach(day => {
        req.body[day].forEach(async (student) => {
            if (student.id == 1000) {
                //If student was added, they will be added to db
                console.log('student was added. Not doing anything with him yet')
            } else if (student.id) {
                await Student.update({
                    first: student.first,
                    last: student.last,
                    lesson_time: student.lesson_time,
                    lesson_day: student.lesson_day
                },
                    {
                        where: {
                            id: student.id
                        }
                    }
                )
            }
        })
    })

}


const sendCurrentReportData = async (req, res) => {
    // const teacherId = req.session.id
    const data = await Student.findAll({
        attributes: ['id', 'first', 'last', 'lesson_day', 'lesson_time', 'lesson_length'],
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
    sendCurrentReportData,
    processCurrentReportData
};

