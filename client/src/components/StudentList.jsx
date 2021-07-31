import axios from 'axios'
import { useState, useEffect } from 'react'
import EnrollStudentModal from './EnrollStudentModal';
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'

function StudentList() {
    const [studentData, setstudentData] = useState([])
    const [leadsData, setLeadsData] = useState([])
    const [show, setShow] = useState(false);
    const [idOfStudentToEnroll, setIdOfStudentToEnroll] = useState(0);
    const [studentToBeEnrolled, setStudentToBeEnrolled] = useState({})
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(async () => {
        const { data } = await axios.get('/api/students/all')

        const enrolledStudents = data.filter(student => student.status == 1)
        const leads = data.filter(student => student.status == 2)

        console.log('data', data)
        console.log('enrolledStudents', enrolledStudents)
        console.log('leads', leads)

        setstudentData(enrolledStudents)
        setLeadsData(leads)
        setStudentToBeEnrolled(leads[0])



    }, [])

    return (
        <div className="border border-danger">
            <div className="leads">
                <h2>Pending Students</h2>
                {leadsData.map((student, idx) =>
                    <div className="d-flex border border-danger" action="">
                        <p key={student.id}>{student.first} {student.last}</p>
                        <button key={idx + 10} onClick={(e) => {
                            handleShow(); setStudentToBeEnrolled(student)
                        }}>Enroll</button>
                    </div>
                )}
            </div>
            <div className="enrolledStudents">
                <h2>Students</h2>
                {studentData.map((student, idx) =>
                    <p key={idx}>{student.first} {student.last}</p>
                )}

            </div>
            <EnrollStudentModal show={show} studentToBeEnrolled={studentToBeEnrolled} handleClose={handleClose} />
            {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{studentToBeEnrolled.first} {studentToBeEnrolled.last}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Enroll
                    </Button>
                </Modal.Footer>
            </Modal> */}

        </div>
    )
}

export default StudentList