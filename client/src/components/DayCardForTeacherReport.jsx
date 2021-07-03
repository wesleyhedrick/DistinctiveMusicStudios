import { useState, useEffect } from 'react'
import TimeSelect from './TimeSelect'
function DayCardForTeacherReport({ dayOfWeek, formDataPerCard, formDataToDB }) {

    const [formDataForThisCard, setFormDataForThisCard] = useState(formDataPerCard)
    const lessonDayMap = {
        'Monday': 1,
        'Tuesday': 2,
        'Wednesday': 3,
        'Thursday': 4,
        'Friday': 5,
        'Saturday': 6,
        'Sunday': 7
    }
    console.log('formDataForThisCard', formDataForThisCard)

    //To keep http traffic as light as possible, I am sending back only data that changed stored
    //in the state variable formDataToDB
    //useEffect builds the formDataToDB object. 
    //It creates keys for each day of the week and sets the value of each day to an empty array.
    //Then it loops through formDataForThisCard.length and pushes an empty object to the array per iteration.

    useEffect(() => {
        formDataToDB[dayOfWeek] = []
        //push empty object to the formDataToDB per length of formDataPerThisCard
        for (let i = 0; i < formDataForThisCard.length; i++) {
            formDataToDB[dayOfWeek].push({})
        }
    }, [])

    function updateResponseObj(e) {
        console.log('formDataToDB[dayOfWeek]', formDataToDB[dayOfWeek])
        //Grab the data-index from the target
        const index = e.target.dataset.index
        const id = e.target.dataset.id

        //if target contains students name, handle this differently since first and 
        //last name are in the same field.
        //-------------------------------------------//
        //does the dataset include 'first'? If so, the event is happening on the name field.
        if (e.target.dataset.first) {
            //Extract first and last name from the Name input
            console.log('full name split on space', e.target.value.split(' '))
            const firstAndLastNameArray = e.target.value.split(' ')
            const firstName = firstAndLastNameArray[0];
            const lastName = firstAndLastNameArray[1];
            console.log('firstName', firstName, 'lastName', lastName)
            formDataToDB[dayOfWeek][index].id = parseInt(id)
            formDataToDB[dayOfWeek][index].first = firstName;
            formDataToDB[dayOfWeek][index].last = lastName;

            console.log('line 33', formDataToDB)
        } else {
            //If not a name input, get the target.name and target.value
            const name = e.target.name;
            const value = e.target.value;
            console.log('name', name, 'value', value)
            formDataToDB[dayOfWeek][index].id = parseInt(id);
            formDataToDB[dayOfWeek][index][name] = value;
        }
    }

    // console.log('formDataForThisCard', formDataForThisCard)
    function addStudent() {
        setFormDataForThisCard([...formDataForThisCard,
        {
            first: '',
            last: '',
            id: 1000,
            lesson_day: lessonDayMap[dayOfWeek],
            lesson_length: '',
            lesson_time: ''
        }])
        formDataToDB[dayOfWeek].push({})

    }

    function removeSpecificStudent(index) {
        console.log('line 13', index)
        // console.log('todaysStudent', formDataForThisCard)

        let newBlob = [...formDataForThisCard].filter((item, idx) =>
            idx != index
        )
        // console.log('newBlob', newBlob)
        setFormDataForThisCard(newBlob)

    }

    return (


        <div className="container border border-3 border-info my-3 py-3">
            <div className="row">
                <div className="col">
                    <h2>{dayOfWeek}</h2>
                </div>
            </div>
            {
                formDataForThisCard.map((student, idx) =>
                    <div key={idx} className="row d-flex align-items-center ">
                        <div className="col-sm-3">
                            {student.first == '' ?
                                <input onBlur={(e) => updateResponseObj(e)} className="w-100"
                                    type="text" name={`name__${student.id}`}
                                    placeholder={`new student`}
                                    data-index={idx}
                                    data-first='first'
                                    data-last='last'
                                    data-id={student.id} />
                                :
                                <input onBlur={(e) => updateResponseObj(e)} className="w-100"
                                    type="text" name={`name__${student.id}`}
                                    defaultValue={`${student.first} ${student.last}`}
                                    data-index={idx}
                                    data-first='first'
                                    data-last='last'
                                    data-id={student.id} />
                            }
                        </div>
                        <div className="col-sm-1">
                            <input onChange={(e) => updateResponseObj(e)}
                                type="text" className="time-frame w-100"
                                name={`lesson_length`}
                                defaultValue={student.lesson_length}
                                data-index={idx}
                                data-id={student.id}
                            />
                        </div>
                        <div className="col-sm-1">
                            <p className="w-100">min</p>
                        </div>
                        <div className="col-sm-2">
                            <TimeSelect updateResponseObj={updateResponseObj}
                                time={student.lesson_time}
                                idx={idx}
                                studentId={student.id} />
                        </div>
                        <div className="col-sm-2">
                            <select name="" id="">
                                <option value="">Full Month</option>
                                <option value="">4 Lessons</option>
                                <option value="">3 Lessons</option>
                                <option value="">2 Lessons</option>
                                <option value="">1 Lesson</option>
                            </select>
                        </div>
                        <div className="col-sm-3 d-flex justify-content-end">
                            <input onClick={() => { removeSpecificStudent(idx); console.log(`removing ${student.first}`) }}
                                type="button" defaultValue="Remove" />
                        </div>
                    </div>
                )
            }

            {/* buttons for adding and removing students */}
            <div className="row d-flex justify-content-start ">
                <div className="col-sm-auto  ">
                    <input onClick={() => addStudent()} type="button" value="Add Student" />
                </div>
            </div>
        </div >
    )
}

export default DayCardForTeacherReport