import DayCardForTeacherReport from "./DayCardForTeacherReport"

function NewReport({ setSubmitNewReportOrPlainLandingPage }) {
    const daysArray = ['Monday', 'Tuesay', 'Wednesday', 'Thursday', 'Friday']
    //get data. Query will be select first, last, lesson_day, lesson_time, lesson_length from "Students" where teacher == session id. 
    //Make an array of all the lesson_day in the object.
    // const daysSet = new Set()
    // data.forEach(itemd => daysSet.add(item.lesson_day))
    //const daysArray = Array.from(mySet)

    return (
        <>
            <button onClick={() => setSubmitNewReportOrPlainLandingPage('plain')}>View Report History</button>
            <form action="">
                {daysArray.map((dayOfWeek, idx) => <DayCardForTeacherReport key={idx} dayOfWeek={dayOfWeek} />)}
                <input type="submit" value="Submit Report" />
            </form>
        </>
    )
}

export default NewReport