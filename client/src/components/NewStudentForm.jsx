import axios from 'axios'
import { useState, useEffect } from 'react'
import Instrument from './Instrument'
import LessonLengthSelector from './LessonLengthSelector'
import { lessonLocations } from '../utilities/enums'

//Form the admin will use to enroll a new student
function NewStudentForm() {
    const [instruments, setInstruments] = useState([])
    const [teachers, setTeachers] = useState([])
    const [formData, editFormData] = useState({
        first: '', last: '', age: '', email: '', phone: '',
        instrument_1: '', instrument_2: '', instrument_3: '',
        teacher: '', first_lesson: '', lesson_location: ''
    })

    //
    //get a default location from the enums to be used on the location dropdown
    const [{ locationCode: defaultLocationCode }] = lessonLocations

    //get teacher names (and ids) and instruments from db
    //set default values of instruments and teacher id. 
    //This is necessary to ensure that fields the admin does not change will not be
    //blank when sent to the backend. 
    useEffect(async () => {
        let { data: { teacherNames, instruments } } = await axios.get('/api/teachers/names-and-instruments')
        console.log('instrument array', teacherNames)
        setInstruments(instruments)
        setTeachers(teacherNames)
        const [{ id, first, last }] = teacherNames
        console.log('teacherNames', teacherNames)
        editFormData({
            ...formData,
            teacher: id,
            instrument_1: 1,
            instrument_2: 1,
            instrument_3: 1,
            lesson_location: 1
        })

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
        const { data } = await axios.post('/api/students/enroll', formData)
        console.log(data)
    }

    //create instrument section.
    function populateInstrumentSection(numberOfInstruments) {
        const instrumentAndLessonLengthArray = [];
        for (let i = 0; i < numberOfInstruments; i++) {
            const thisItem = {}
            thisItem.instrument = <Instrument instrumentNumber={i + 1} instruments={instruments} handleFormChange={handleFormChange} />;
            thisItem.lessonLength = <LessonLengthSelector />
            instrumentAndLessonLengthArray.push(thisItem)
        }
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
                                <input className="form-control mb-3" type="text" name="first" id="first" placeholder="Johann" onChange={handleFormChange} />
                            </div>
                            <div className="last-name-container flex-grow-1">
                                <label className="form-label text-black-50" htmlFor="last">Last Name</label>
                                <input className="form-control mb-3" type="text" name="last" id="last" placeholder="Bach" onChange={handleFormChange} />
                            </div>
                            <div className="last-name-container flex-grow-1">
                                <label className="form-label text-black-50" htmlFor="age">Age</label>
                                <input className="form-control mb-3" type="text" name="age" id="age" onChange={handleFormChange} />
                            </div>


                        </div>

                        <h2 className="mt-3 text-black-50">Contact Information</h2>
                        <label className={`form-label text-black-50`} htmlFor="email">Email</label>
                        <input className={`form-control mb-3 `} type="text" name="email"
                            id="email"
                            placeholder="jbach@gmail.com"
                            onChange={handleFormChange}
                        />

                        <label className="form-label text-black-50" htmlFor="phone">Phone</label>
                        <input className="form-control mb-3" type="text" name="phone" id="phone"
                            placeholder="555-555-5555" onChange={handleFormChange} />

                        <h2 className="pt-3 text-black-50">Instruments</h2>
                        <div className="d-flex w-100 border flex-wrap" >
                            {populateInstrumentSection(3).map((item, idx) =>
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
                            <input onChange={handleFormChange} type="date" name="first_lesson" id="first_lesson" />
                        </div>

                        <div className="d-flex flex-column">
                            <label htmlFor="lesson_location">Lesson Location</label>
                            <select onChange={handleFormChange} name="lesson_location" id="lesson_location" value={defaultLocationCode}>
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

export default NewStudentForm