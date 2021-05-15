import { useState } from 'react'
import TimeSelect from './TimeSelect'
function DayCardForTeacherReport({ dayOfWeek, students }) {

    const [studentObjectArrayState, setStudentObjectArrayState] = useState([
        {
            name: 'Sally Jane',
            timeFrame: '45',
            timeSlot: '2:00 pm'
        },
        {
            name: 'Wanda Maximoff',
            timeFrame: '45',
            timeSlot: '3:00 pm'
        },
        {
            name: 'Steve Rogers',
            timeFrame: '45',
            timeSlot: '10:00 am'
        },
        {
            name: 'Anthony Stark',
            timeFrame: '45',
            timeSlot: '11:00 am'
        }
    ])

    function addStudent() {
        let newArray = [...studentObjectArrayState, { name: '', timeFrame: '', timeSlot: '' }]
        console.log('adding a student')
        setStudentObjectArrayState(newArray)
    }

    function removeStudent() {
        console.log('removing a student')
        let newArray = [...studentObjectArrayState]
        newArray.pop()
        setStudentObjectArrayState(newArray)
    }


    // const studentObjectArray = [
    //     {
    //         name: 'Sally Jane',
    //         timeFrame: '45',
    //         timeSlot: '2:00 pm'
    //     },
    //     {
    //         name: 'Wanda Maximoff',
    //         timeFrame: '45',
    //         timeSlot: '3:00 pm'
    //     },
    //     {
    //         name: 'Steve Rogers',
    //         timeFrame: '45',
    //         timeSlot: '10:00 am'
    //     },
    //     {
    //         name: 'Anthony Stark',
    //         timeFrame: '45',
    //         timeSlot: '11:00 am'
    //     },
    // ]


    return (
        <div className="container border border-3 border-danger my-3 py-3">
            <div className="row border border-2 border-info">
                <div className="col">
                    <h2>{dayOfWeek}</h2>
                </div>
            </div>
            {
                studentObjectArrayState.map((student, idx) =>
                    <div key={idx} className="row d-flex border border-2 border-info">
                        <div className="col border border-warning">
                            <input type="text" name="name" id="" defaultValue={student.name} />
                        </div>
                        <div className="col border border-warning">
                            <input type="text" className="time-frame" name="time-frame" id="" defaultValue={`${student.timeFrame}`} />
                        </div>
                        <div className="col border border-warning">
                            <p>min</p>
                        </div>
                        <div className="col border border-warning">
                            <TimeSelect />
                        </div>
                        <div className="col border border-warning">
                            <input onClick={() => console.log('You want to remove a student?')} type="button" defaultValue="Remove" />
                        </div>
                    </div>
                )
            }
            <div className="row d-flex justify-content-start border border-2 border-info">
                <div className="col-sm-auto border ">
                    <input onClick={addStudent} type="button" value="Add Student" />
                </div>
                <div className="col-sm-auto border">
                    <input onClick={removeStudent} type="button" value="Remove Student" />
                </div>
            </div>
        </div >
    )
}

export default DayCardForTeacherReport