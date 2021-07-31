const { Reports, Teacher } = require('../models');
const { Op } = require("sequelize");

//Function takes teacherNameQuery creates an object
//with teacher.id as keys, and for values a new string consisting of teacher.first and
//teacher.last
function createObjTeacherNamesById(teacherNameQuery) {
    const teacherNamesObject = {}
    teacherNameQuery.forEach(({ dataValues: teacher }) => {
        teacherNamesObject[teacher.id] = `${teacher.first} ${teacher.last}`
    })

    return teacherNamesObject
}

//This is a wooley booger function here. Function ties two objects together by key, values 
//It uses two objects to create one object that will be sent to the front end. The 
//problem it solves is that reportsQuery doesn't include
//teacher name, which needs to be part of the data sent to the front end.
//So function uses item.teacher (an integer) as the key of teacherNamesQuery to get the value
//of teacherNamesQuery (first and last name) that will become the key for the new object 
//'reportLinksGroupedByTeacher' This is the only way to ensure that names become the new keys 
//while still being tied to the ids associated with them.  
function createObjectReportLinksGroupedByName(reportsQuery, teacherNamesQuery) {
    const reportLinksGroupedByTeacher = {}
    reportsQuery.forEach(item => {
        //Turn item.date to a string because apparently no two date objects are the same. 
        //each new date kept getting added to my Set.
        const dateString = item.date.toString()
        const teacherName = teacherNamesQuery[item.teacher]
        if (reportLinksGroupedByTeacher[teacherName]) {
            reportLinksGroupedByTeacher[teacherName].add(dateString)
        } else {
            //use a Set so that you will have only unique values. Reports table has a record for each student
            //not each report. So dates will repeat as many times as there were students reported on that date.
            //the object to be sent to the front end will have a name and under it a list of dates. Each date will
            //serve as a link to get a detail on that date's report.
            reportLinksGroupedByTeacher[teacherName] = new Set()
            reportLinksGroupedByTeacher[teacherName].add(dateString)
        }
    })

    //Loop through the object and make an array of the values of each key
    for (key in reportLinksGroupedByTeacher) {
        reportLinksGroupedByTeacher[key] = Array.from(reportLinksGroupedByTeacher[key])
    }

    return reportLinksGroupedByTeacher
}

const adminReportsByTeacherName = async (req, res) => {

    //query for a full list of report dates and teachers. The only instructions are to 
    //order by teacher (integer)
    const allReports = await Reports.findAll({
        attributes: ['teacher', 'date'],
        order: [
            'teacher'
        ]
    });

    //Get a list of teachers, pulling only id, first, and last names
    const teacherArrayFromQuery = await Teacher.findAll({
        attributes: ['id', 'first', 'last']
    })

    //Use the above query to create object with id as the key and new string 
    //(first and last) as the value.
    const teacherNamesObject = createObjTeacherNamesById(teacherArrayFromQuery)

    //create response object with teacher names as keys and array of report dates as values.
    const reportLinksGroupedByTeacher = createObjectReportLinksGroupedByName(allReports, teacherNamesObject)

    res.json(reportLinksGroupedByTeacher)

}

const adminReportsWithinMonth = async (req, res) => {
    // const date = new Date().toISOString().slice(0, 10)
    const date = new Date('1979-04-01').toISOString().slice(0, 10)
    console.log('date', date)
    //Query db for all reports
    const allReports = await Reports.findAll({
        attributes: ['teacher', 'date'],
        where: {
            date: {
                [Op.between]: `${date}::date - interval '1 MONTH' AND ${date}::date`
            }
        },
        order: [
            'date'
        ]
    });

    //Get a list of teachers, pulling only id, first, and last names
    const teacherArrayFromQuery = await Teacher.findAll({
        attributes: ['id', 'first', 'last']
    })

    const teacherNamesObject = createObjTeacherNamesById(teacherArrayFromQuery)

    const dateArray = allReports.filter(({ dataValues: { date } }) => {
        // return date.getMonth() == thisMonth || date.getMonth() == thisMonth - 1
        return date.getMonth() == 2 || date.getMonth() == 1

    })

    const responseObject = {}
    dateArray.forEach(({ dataValues: { teacher, date } }) => {
        const teacherName = teacherNamesObject[teacher]
        const dateNicelyFormatted = new Date(date).toLocaleDateString()
        const month = new Date(date).toLocaleDateString('default', { month: 'long' })
        responseObject[month] = { teacherName, dateNicelyFormatted }

    })

    console.log('dateArray', dateArray)
    console.log('responseObject', responseObject)
    res.json(allReports)
}

const teacher = async (req, res) => {
    const instruments = await Instruments.findAll();
    res.json(instruments)
}

module.exports = {
    adminReportsByTeacherName,
    teacher,
    adminReportsWithinMonth
}