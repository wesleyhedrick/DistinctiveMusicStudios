import axios from 'axios'
import { useEffect, useState } from 'react'
import Instrument from './Instrument';

function SignUp({ setSignUpOrIn }) {
    const [instruments, setInstruments] = useState([])
    const [emailPlaceHolder, setEmailPlaceholder] = useState('')

    //get all instruments from db
    useEffect(async () => {
        const { data } = await axios.get('/api/instruments')
        console.log('instrument array', data)
        setInstruments(data)
    }, [])

    function handleChangeOnEmailField(e) {
        setEmailPlaceholder(e.target.value)
    }
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
            setEmailPlaceholder('This user already exists. Please pick another email.')
        }
        setSignUpOrIn('in')

        return 'success'
    }

    return (
        <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center landing-background">
            <div className="row justify-content-center"  >
                <div className="col-md-6 form-box">
                    <form className="bg-0 p-3 d-flex flex-column" action="" onSubmit={signUpTeacher}>

                        <h2 className="mt-3 text-black-50">Personal Information</h2>
                        <div className="name-container d-flex">
                            <div className="first-name-container flex-grow-1">
                                <label className="form-label text-black-50" htmlFor="first">First Name</label>
                                <input className="form-control mb-3" type="text" name="first" id="first" placeholder="Johann" />
                            </div>
                            <div className="last-name-container flex-grow-1">
                                <label className="form-label text-black-50" htmlFor="last">Last Name</label>
                                <input className="form-control mb-3" type="text" name="last" id="last" placeholder="Bach" />
                            </div>

                        </div>

                        <label className={`form-label text-black-50`} htmlFor="email">Email</label>
                        <input className={`form-control mb-3 `} type="text" name="email"
                            id="email" value={`${emailPlaceHolder}`}
                            placeholder="jbach@gmail.com"
                            onChange={handleChangeOnEmailField}
                        />

                        <label className="form-label text-black-50" htmlFor="password">Password</label>
                        <input className="form-control mb-3" type="text" name="password" id="password" placeholder="something tricky" />

                        <label className="form-label text-black-50" htmlFor="phone">Phone</label>
                        <input className="form-control mb-3" type="text" name="phone" id="phone" placeholder="555-555-5555" />


                        <h2 className="pt-3 text-black-50">Instruments</h2>
                        <div className="d-flex w-100 border flex-wrap" >
                            <Instrument instrumentNumber={1} instruments={instruments} />
                            <Instrument instrumentNumber={2} instruments={instruments} />
                            <Instrument instrumentNumber={3} instruments={instruments} />
                            <Instrument instrumentNumber={4} instruments={instruments} />
                            <Instrument instrumentNumber={5} instruments={instruments} />

                        </div>

                        <input className="btn btn-primary mt-5 custom-btn text-black-50 border-0 align-self-center" type="submit" value="Create Account" />



                    </form>
                </div>
            </div>
        </div>

    )
}

export default SignUp