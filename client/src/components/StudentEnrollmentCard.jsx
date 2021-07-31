import Instrument from './Instrument'
import LessonLengthSelector from './LessonLengthSelector'
import { useState } from 'react';
function StudentEnrollmentCard({ handleFormChange, instruments }) {
    const [studentLabelNextToInstrumentHeading, setStudentLabelNextToInstrumentHeading] = useState('')
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

    function updateStudentLabelNextToInstrumentHeading(e) {
        const studentName = e.target.value;
        setStudentLabelNextToInstrumentHeading(studentName)
    }

    return (
        <>
            <div className="name-container d-flex">
                <div className="first-name-container flex-grow-1">
                    <label className="form-label text-black-50" htmlFor="first">First Name</label>
                    <input className="form-control mb-3" type="text" name="first" id="first" placeholder="Johann" onBlur={updateStudentLabelNextToInstrumentHeading} onChange={handleFormChange} />
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

            <h3 className="pt-3 text-black-50">{studentLabelNextToInstrumentHeading}'s Instruments</h3>
            <div className="d-flex w-100 border flex-wrap" >
                {populateInstrumentSection(3).map((item, idx) =>
                    <div key={idx}>
                        {item.instrument}
                        {item.lessonLength}
                    </div>)}
            </div>
        </>
    )
}

export default StudentEnrollmentCard