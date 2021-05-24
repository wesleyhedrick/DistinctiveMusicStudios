import DayCardForTeacherReport from "./DayCardForTeacherReport"
import axios from 'axios'
import { useState, useEffect } from 'react'

function NewReport({ toggleNewReportOrPlainLandingPage }) {
    const [reportBlob, setReportBlob] = useState({})

    //get data. Query will select first, last, lesson_day, lesson_time, lesson_length from "Students" where teacher == session id. 
    //Make an array of all the lesson_day in the object.
    // const daysSet = new Set()
    // data.forEach(itemd => daysSet.add(item.lesson_day))
    //const daysArray = Array.from(mySet)


    useEffect(async (myData) => {
        const { data } = await axios.get('/api/students/current-report');
        setReportBlob(data)
    }, [])

    console.log('reportBlob', reportBlob)

    async function handleFormSubmit(e) {
        console.log('handleFormSubmit ran')
        e.preventDefault();
        // console.log('elements', e.target.elements)
        const elements = e.target.elements
        const { name__1 } = e.target.elements
        console.log('name', name__1.value)

        const formKeys = Object.keys(elements)


        const blahBlah = formKeys.filter(item => !parseInt(item) && item != 0)
        console.log('blahBlah', blahBlah)
        console.log(e.target.elements[blahBlah[0]].value)



        // await axios.post('api/students/current-report', lesson_time__1.value)
    }


    const daysOfWeek = Object.keys(reportBlob)
    console.log('object keys', daysOfWeek)

    return (
        <>
            <button onClick={() => toggleNewReportOrPlainLandingPage('plain')}>View Report History</button>
            <form action="POST" onSubmit={handleFormSubmit}>
                {daysOfWeek.map((dayOfWeek, idx) => <DayCardForTeacherReport key={idx} dayOfWeek={dayOfWeek}
                    studentBlob={reportBlob[dayOfWeek]}
                    reportBlob={reportBlob}
                    setReportBlob={setReportBlob} />)}
                <input type="submit" value="Submit Report" />
            </form>
        </>
    )
}

export default NewReport