import { useState } from 'react'
import TimeSelect from './TimeSelect'
function DayCardForTeacherReport({ dayOfWeek, studentBlob, reportBlob, setReportBlob }) {

    const [todaysStudentBlob, setTodaysStudentBlob] = useState(studentBlob)

    function updateObject(e) {
        console.log('updateReport ran')
        //Grab the index from the target
        const index = e.target.dataset.index

        //if target contains students name, handle this different since first and 
        //last name are in the same field.
        //-------------------------------------------//
        //does the dataset include first? If so, the event is happening on the name field.
        if (e.target.dataset.first) {
            //Extract first and last name from the Name input
            const firstAndLastNameArray = e.target.value.split(' ')
            const firstName = firstAndLastNameArray[0];
            const lastName = firstAndLastNameArray[1];


            reportBlob[dayOfWeek][index].first = firstName
            reportBlob[dayOfWeek][index].last = lastName
        }

        //If not a name input, get the target.name and target.value
        const name = e.target.name;
        const value = e.target.value;
        reportBlob[dayOfWeek][index][name] = value
        setReportBlob(reportBlob)

    }

    console.log('todaysStudentBlob', todaysStudentBlob)
    function addStudent() {
        let newBlob = [...todaysStudentBlob, { first: '', last: '', timeFrame: '', timeSlot: '' }]
        setTodaysStudentBlob(newBlob)
    }

    function removeSpecificStudent(index) {
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
                            <input onChange={(e) => updateObject(e)} className="w-100"
                                type="text" name={`name__${student.id}`}
                                defaultValue={`${student.first} ${student.last}`}
                                data-index={idx}
                                data-first='first'
                                data-last='last' />
                        </div>
                        <div className="col-sm-2">
                            <input onChange={(e) => updateObject(e)}
                                type="text" className="time-frame w-100"
                                name={`lesson_length`}
                                defaultValue={student.lesson_length}
                                data-index={idx}
                            />
                        </div>
                        <div className="col-sm-1">
                            <p className="w-100">min</p>
                        </div>
                        <div className="col-sm-2">
                            <TimeSelect updateObject={updateObject}
                                time={student.lesson_time}
                                idx={idx} />
                        </div>
                        <div className="col-sm-3 d-flex justify-content-end">
                            <input onClick={() => { removeSpecificStudent(idx); console.log('removing student') }}
                                type="button" defaultValue="Remove" />
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