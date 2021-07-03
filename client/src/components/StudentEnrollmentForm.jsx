import Instrument from "./Instrument"
import axios from 'axios'

function StudentEnrollmentForm() {
    const [instruments, setInstruments] = useState([])

    //get all instruments from db
    useEffect(async () => {
        const { data } = await axios.get('/api/instruments')
        console.log('instrument array', data)
        setInstruments(data)
    }, [])

    //onSubmit get values from e.target.elements, create object with these values and
    //send them with the post request.
    async function addNewStudentToDB(e) {
        e.preventDefault();
        const { studentName, status, instrument_1,
            instrument_2, instrument_3 } = e.target.elements
        const formData = {
            studentName: studentName.value,
            status: status.value,
            instrument_1: instrument_1.value,
            instrument_2: instrument_2.value,
            instrument_3: instrument_3.value
        }
        await axios.post('api/students/new-student', formData)
    }

    return (
        <>
            <form onSubmit={addNewStudentToDB}>
                <label htmlFor="name">Student Name</label>
                <input id="name" type="text" name="studentName" />
                <Instrument instrumentNumber={1} instruments={instruments} />
                <Instrument instrumentNumber={2} instruments={instruments} />
                <Instrument instrumentNumber={3} instruments={instruments} />

                <label htmlFor="status" >Status</label>
                <select name="status" id="status" onChange={handleChange}>
                    <option value="lead">Lead</option>
                    <option value="student">Student</option>
                </select>
            </form>
            <button type="submit">Submit</button>
        </>
    )
}

export default StudentEnrollmentForm