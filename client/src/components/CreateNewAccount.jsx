import { useState, useEffect } from 'react'
import axios from 'axios'
import Instrument from './Instrument'
import LessonLengthSelector from './LessonLengthSelector'
import { lessonLocations } from '../utilities/enums'
import { InputGroup, FormControl } from 'react-bootstrap'
import StudentEnrollmentCard from './StudentEnrollmentCard'

function CreateNewAccount() {
    const [instruments, setInstruments] = useState([])
    const [teachers, setTeachers] = useState([])
    const [formData, editFormData] = useState({})

    const [numberOfStudents, setNumberOfStudents] = useState(1)

    //get a default location from the enums to be used on the location dropdown
    const [{ locationCode: defaultLocationCode }] = lessonLocations

    function addStudentCard() {
        setNumberOfStudents(numberOfStudents + 1)
    }
    //get teacher names (and ids) and instruments from db
    //set default values of instruments and teacher id. 
    //This is necessary to ensure that fields the admin does not change will not be
    //blank when sent to the backend. 
    useEffect(async () => {
        let { data: { teacherNames, instruments } } = await axios.get('/api/teachers/names-and-instruments')

        setInstruments(instruments)
        setTeachers(teacherNames)

        const [{ id, first, last }] = teacherNames

        editFormData({
            ...formData,
            teacher: id,
            student1_instrument_1: 1,
            lesson_location: 1
        })
    }, [])

    function handleFormChange(e) {
        const { value, name } = e.target
        console.log('name', name, 'value', value)

        editFormData({ ...formData, [name]: value })

        console.log(formData)
    }

    //When form is submitted, send formData object
    async function handleFormSubmit(e) {
        e.preventDefault()
        console.log(formData)
        const { data } = await axios.post('/api/students/enroll', formData)
        console.log(data)
    }

    return (
        <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center landing-background">
            <div className="row justify-content-center"  >
                <div className="col-md-6 form-box">
                    <form onSubmit={handleFormSubmit} className="bg-0 p-3 d-flex flex-column" action="" >
                        {/* Personal Info Section */}
                        <h2 className="mt-3 text-black-50">Personal Information</h2>
                        <div className="name-container d-flex">
                            <div className="first-name-container flex-grow-1">
                                <label className="form-label text-black-50" htmlFor="accountholder_firstname">First Name</label>
                                <input className="form-control mb-3" type="text" name="accountholder_firstname" id="accountholder_firstname" placeholder="Johann" onChange={handleFormChange} />
                            </div>
                            <div className="last-name-container flex-grow-1">
                                <label className="form-label text-black-50" htmlFor="accountholder_lastname">Last Name</label>
                                <input className="form-control mb-3" type="text" name="accountholder_lastname" id="accountholder_lastname" placeholder="Bach" onChange={handleFormChange} />
                            </div>

                            <div className="flex-grow-1 d-flex flex-column justify-content-center align-item-center">
                                <div className="d-flex align-items-center">
                                    <label className="m-auto" htmlFor="parent" >Parent</label>
                                    <input type="radio" name="role" id="parent" value='parent' onChange={handleFormChange} />
                                </div>
                                <div className="d-flex align-items-center">
                                    <label className="m-auto" htmlFor="self">Self</label>
                                    <input type="radio" name="role" id="self" value='self' onChange={handleFormChange} />
                                </div>
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

                        <h2 className="mt-3 text-black-50">Students</h2>
                        <button onClick={addStudentCard}>Add Student</button>
                        {Array.from({ length: numberOfStudents }, (_, i) => i)
                            .map((item, idx) => <StudentEnrollmentCard studentNumber={idx + 1} handleFormChange={handleFormChange} instruments={instruments} />)}

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

export default CreateNewAccount