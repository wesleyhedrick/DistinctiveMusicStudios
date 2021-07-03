import DayCardForTeacherReport from "./DayCardForTeacherReport"
import axios from 'axios'
import { useState, useEffect } from 'react'
import SecondaryNavBar from "./SecondaryNavBar"

function NewReport({ toggleNewOrHistoricalReports }) {
    const [formDataFromDb, setFormDataFromDB] = useState({})
    const [formDataToDB, setFormDataToDB] = useState({})

    //get data. Query will select first, last, lesson_day, lesson_time, lesson_length from "Students" where teacher == session id. 
    //Make an array of all the lesson_day in the object.
    // const daysSet = new Set()
    // data.forEach(itemd => daysSet.add(item.lesson_day))
    //const daysArray = Array.from(mySet)


    useEffect(async () => {
        const { data } = await axios.get('/api/students/current-report');
        setFormDataFromDB(data)
        console.log('formDataFromDb', formDataFromDb)
    }, [])


    async function handleFormSubmit(e) {
        e.preventDefault();
        await axios.post('api/students/current-report', formDataToDB)
    }

    const daysOfWeek = Object.keys(formDataFromDb)
    console.log('object keys', daysOfWeek)

    return (
        <>
            <form action="POST" onSubmit={handleFormSubmit}>
                {daysOfWeek.map((dayOfWeek, idx) =>

                    <DayCardForTeacherReport key={idx} dayOfWeek={dayOfWeek}
                        formDataPerCard={formDataFromDb[dayOfWeek]}
                        formDataToDB={formDataToDB}
                        setFormDataToDB={setFormDataToDB} />)}
                <div className="container">
                    <div className="row justify-content-center">
                        <input className="report-submit-btn w-50" type="submit" value="Submit Report" />
                    </div>
                </div>
            </form>
        </>
    )
}

export default NewReport