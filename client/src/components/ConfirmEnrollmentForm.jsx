import Instrument from "./Instrument"
import LessonLengthSelector from "./LessonLengthSelector"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { lessonLocations } from '../utilities/enums'

function ConfirmEnrollmentForm({ studentToBeEnrolled }) {

    const [instruments, setInstruments] = useState([])
    const [teachers, setTeachers] = useState([])
    const [formData, editFormData] = useState(studentToBeEnrolled)
    const { first, last, age, email, phone, first_lesson, lesson_location, instrument_1, instrument_2, instrument_3, lesson_length } = studentToBeEnrolled
    const studentInstruments = [instrument_1, instrument_2, instrument_3]
    const studentLessons = [lesson_length, lesson_length, lesson_length]
    console.log('studentInstruments length', studentInstruments)

    useEffect(async () => {
        let { data: { teacherNames, instruments } } = await axios.get('/api/teachers/names-and-instruments')
        console.log('instrument array', teacherNames)
        setInstruments(instruments)
        setTeachers(teacherNames)
        // editFormData({
        //     ...formData,
        //     teacher: id,
        //     instrument_1: 1,
        //     instrument_2: 1,
        //     instrument_3: 1,
        //     lesson_location: 1
        // })

    }, [])

    function handleFormChange(e) {
        const { value, name } = e.target
        console.log('name', name, 'value', value)
        editFormData({ ...formData, [name]: value })
    }

    //When form is submitted, send formData object
    async function handleFormSubmit(e) {
        e.preventDefault()
        console.log(formData)
        const { data } = await axios.post('/api/students/enroll-confirm', formData)
        console.log(data)
    }

    //create instrument section.
    function populateInstrumentSection(studentInstruments, studentLessons) {
        console.log('populateInstrumentSection ran')
        console.log('studentInstruments', studentInstruments)

        const instrumentAndLessonLengthArray = [];
        for (let i = 0; i < studentInstruments.length; i++) {
            const thisItem = {}
            thisItem.instrument = <Instrument defaultValue={studentInstruments[i] || 2} instrumentNumber={i + 1} instruments={instruments} handleFormChange={handleFormChange} />;
            thisItem.lessonLength = <LessonLengthSelector default={studentLessons[i] || 1} />
            instrumentAndLessonLengthArray.push(thisItem)
        }

        console.log('instrumentAndLessonLengthArray', instrumentAndLessonLengthArray)
        return instrumentAndLessonLengthArray
    }


    return (

        <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center landing-background">
            <div className="row justify-content-center"  >
                <div className="col-md-6 form-box">
                    <form onSubmit={handleFormSubmit} className="bg-0 p-3 d-flex flex-column" action="" >

                        <h2 className="mt-3 text-black-50">Personal Information</h2>
                        <div className="name-container d-flex">
                            <div className="first-name-container flex-grow-1">
                                <label className="form-label text-black-50" htmlFor="first">First Name</label>
                                <input className="form-control mb-3" type="text" name="first" id="first" value={first} onChange={handleFormChange} />
                            </div>
                            <div className="last-name-container flex-grow-1">
                                <label className="form-label text-black-50" htmlFor="last">Last Name</label>
                                <input className="form-control mb-3" type="text" name="last" id="last" value={last} onChange={handleFormChange} />
                            </div>
                            <div className="last-name-container flex-grow-1">
                                <label className="form-label text-black-50" htmlFor="age">Age</label>
                                <input className="form-control mb-3" type="text" name="age" id="age" value={age} onChange={handleFormChange} />
                            </div>

                        </div>

                        <h2 className="mt-3 text-black-50">Contact Information</h2>
                        <label className={`form-label text-black-50`} htmlFor="email">Email</label>
                        <input className={`form-control mb-3 `} type="text" name="email"
                            id="email"
                            value={email}
                            onChange={handleFormChange}
                        />

                        <label className="form-label text-black-50" htmlFor="phone">Phone</label>
                        <input className="form-control mb-3" type="text" name="phone" id="phone"
                            value={phone} onChange={handleFormChange} />

                        <h2 className="pt-3 text-black-50">Instruments</h2>
                        <div className="d-flex w-100 border flex-wrap" >
                            {populateInstrumentSection(studentInstruments, studentLessons).map((item, idx) =>
                                <div key={idx}>
                                    {item.instrument}
                                    {item.lessonLength}
                                </div>)}
                        </div>
                        <h2 className="pt-3 text-black-50">Recommended Teacher</h2>
                        <div>
                            <select value={formData.teacher} onChange={handleFormChange} name="teacher" id="">
                                {teachers.map((teacher, idx) =>
                                    <option key={idx} value={teacher.id}>{teacher.first} {teacher.last}</option>)
                                }
                            </select>
                        </div>

                        <div className="d-flex flex-column">
                            <label htmlFor="first_lesson">First Lesson</label>
                            <input onChange={handleFormChange} type="date" value={first_lesson || null} id="first_lesson" />
                        </div>

                        <div className="d-flex flex-column">
                            <label htmlFor="lesson_location">Lesson Location</label>
                            <select onChange={handleFormChange} value={lesson_location || 3} id="lesson_location" >
                                {lessonLocations.map((location, idx) => <option value={location.locationCode} key={idx}>{location.locationProper}</option>)}
                            </select>
                        </div>
                        <input onChange={handleFormChange} className="btn btn-primary mt-5 custom-btn text-black-50 border-0 align-self-center" type="submit" value="Enroll Student" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmEnrollmentForm