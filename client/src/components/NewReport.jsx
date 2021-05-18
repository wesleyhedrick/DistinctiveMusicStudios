import DayCardForTeacherReport from "./DayCardForTeacherReport"
import axios from 'axios'
import { useState, useEffect } from 'react'

function NewReport({ toggleNewReportOrPlainLandingPage }) {
    const [reportBlob, setreportBlob] = useState({})

    //get data. Query will select first, last, lesson_day, lesson_time, lesson_length from "Students" where teacher == session id. 
    //Make an array of all the lesson_day in the object.
    // const daysSet = new Set()
    // data.forEach(itemd => daysSet.add(item.lesson_day))
    //const daysArray = Array.from(mySet)


    useEffect(async (myData) => {
        const { data } = await axios.get('/api/students/current-report');
        setreportBlob(data)
    }, [])

    const daysOfWeek = Object.keys(reportBlob)
    console.log('object keys', daysOfWeek)

    return (
        <>

            <button onClick={() => toggleNewReportOrPlainLandingPage('plain')}>View Report History</button>
            <form action="">
                {daysOfWeek.map((dayOfWeek, idx) => <DayCardForTeacherReport key={idx} dayOfWeek={dayOfWeek} studentBlob={reportBlob[dayOfWeek]} />)}
                <input type="submit" value="Submit Report" />
            </form>
        </>
    )
}

export default NewReport