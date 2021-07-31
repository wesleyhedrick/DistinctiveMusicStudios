import { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'
import NewStudentForm from './NewStudentForm'
import ConfirmEnrollmentForm from './ConfirmEnrollmentForm'
function EnrollStudentModal({ show, studentToBeEnrolled, handleClose }) {

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{studentToBeEnrolled.first} {studentToBeEnrolled.last}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ConfirmEnrollmentForm studentToBeEnrolled={studentToBeEnrolled} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Enroll
                    </Button>

                </Modal.Footer>
            </Modal>

        </>
    )
}

export default EnrollStudentModal