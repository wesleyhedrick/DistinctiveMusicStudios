import axios from 'axios'
import { useEffect, useState } from 'react'
import Instrument from './Instrument';

function SignUp({ setSignUpOrIn }) {
    const [instruments, setInstruments] = useState([])
    const [warningPlaceHolder, setWarningPlaceHolder] = useState('jbach@gmail.com')

    //get all instruments from db
    useEffect(async () => {
        const { data } = await axios.get('/api/instruments')
        console.log('instrument array', data)
        setInstruments(data)
    }, [])

    //when form is submitted, send teacher data to db
    async function signUpTeacher(e) {
        e.preventDefault();
        const { first, last, email, password, phone, instrument_1,
            instrument_2,
            instrument_3,
            instrument_4,
            instrument_5
        } = e.target.elements

        const formData = {
            first: first.value,
            last: last.value,
            email: email.value,
            password: password.value,
            phone: phone.value,
            instrument_1: instrument_1.value,
            instrument_2: instrument_2.value,
            instrument_3: instrument_3.value,
            instrument_4: instrument_4.value,
            instrument_5: instrument_5.value,

        }

        const { data } = await axios.post('api/sign-up', formData)

        if (data == 'user exists') {

            setWarningPlaceHolder('This user already exists. Please pick another email.')
        }
        return
    }

    return (
        <>
            <div className="container d-flex flex-column justify-content-center border">
                <div className="row">
                    <div className="col">
                        <form className="bg-light pb-5" action="" onSubmit={signUpTeacher}>

                            <h2 className="p-3 mt-3">Personal Information</h2>
                            <div className="container">
                                <label className="form-label" htmlFor="first">First Name</label>
                                <input className="form-control mb-3" type="text" name="first" id="first" placeholder="Johann" />

                                <label className="form-label" htmlFor="last">Last Name</label>
                                <input className="form-control mb-3" type="text" name="last" id="last" placeholder="Bach" />

                                <label className={`form-label`} htmlFor="email">Email</label>
                                <input className={`form-control mb-3 `} type="text" name="email" id="email" value={`${warningPlaceHolder}`} placeholder="jbach@gmail.com" />

                                <label className="form-label" htmlFor="password">Password</label>
                                <input className="form-control mb-3" type="text" name="password" id="password" placeholder="something tricky" />

                                <label className="form-label" htmlFor="phone">Phone</label>
                                <input className="form-control mb-3" type="text" name="phone" id="phone" placeholder="555-555-5555" />

                            </div>
                            <h2 className="p-3">Instruments</h2>

                            <Instrument selectNumber={1} instruments={instruments} />
                            <Instrument selectNumber={2} instruments={instruments} />
                            <Instrument selectNumber={3} instruments={instruments} />
                            <Instrument selectNumber={4} instruments={instruments} />
                            <Instrument selectNumber={5} instruments={instruments} />

                            <div className="container">
                                <input className="btn btn-primary mt-5" type="submit" value="Create Account" />

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp