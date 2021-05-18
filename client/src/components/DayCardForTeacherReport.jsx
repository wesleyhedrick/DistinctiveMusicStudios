import { useState } from 'react'
import TimeSelect from './TimeSelect'
function DayCardForTeacherReport({ dayOfWeek, studentBlob }) {

    const [todaysStudentBlob, setTodaysStudentBlob] = useState(studentBlob)

    function addStudent() {
        let newBlob = [...todaysStudentBlob, { first: '', last: '', timeFrame: '', timeSlot: '' }]
        setTodaysStudentBlob(newBlob)
    }

    function removeStudent(index) {
        console.log('line 13', index)
        console.log('todaysStudent', todaysStudentBlob)

        let newBlob = [...todaysStudentBlob].filter((item, idx) =>
            idx != index
        )
        console.log('newBlob', newBlob)
        // setTodaysStudentBlob(newBlob)

    }

    function popStudent() {
        let newBlob = [...todaysStudentBlob]
        newBlob.pop()
        setTodaysStudentBlob(newBlob)
    }

    return (
        <div className="container border border-3 border-danger my-3 py-3">
            <div className="row border border-2 border-info">
                <div className="col">
                    <h2>{dayOfWeek}</h2>
                </div>
            </div>
            {
                todaysStudentBlob.map((student, idx) =>
                    <div key={idx} className="row d-flex align-items-center border border-2 border-info">
                        <div className="col-sm-4">
                            <input className="w-100" type="text" name="name" id="" defaultValue={`${student.first} ${student.last}`} />
                        </div>
                        <div className="col-sm-2">
                            <input type="text" className="time-frame w-100" name="time-frame" id="" defaultValue={student.lesson_length} />
                        </div>
                        <div className="col-sm-1">
                            <p className="w-100">min</p>
                        </div>
                        <div className="col-sm-2">
                            <TimeSelect time={student.lesson_time} />
                        </div>
                        <div className="col-sm-3 d-flex justify-content-end">
                            <input onClick={() => { removeStudent(idx); console.log('removing student') }} type="button" defaultValue="Remove" />
                        </div>
                    </div>
                )
            }

            {/* buttons for adding and removing students */}
            <div className="row d-flex justify-content-start border border-2 border-info">
                <div className="col-sm-auto border ">
                    <input onClick={addStudent} type="button" value="Add Student" />
                </div>
                <div className="col-sm-auto border">
                    <input onClick={popStudent} type="button" value="Remove Student" />
                </div>
            </div>
        </div >
    )
}

export default DayCardForTeacherReport