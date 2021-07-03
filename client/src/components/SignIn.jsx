import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

function SignIn({ setSignUpOrIn, warningBorderEmail, warningBorderPassword,
    setWarningBorderEmail, setWarningBorderPassword }) {
    const history = useHistory();

    useEffect(() => {
    }, [])


    const [emailVerified, setEmailVerified] = useState(true)
    const [passwordVerified, setPasswordVerified] = useState(true)


    async function sendSignInCreds(e) {

        e.preventDefault()
        const { email, password } = e.target.elements
        const emailAndPasswordCreds = {
            email: email.value,
            password: password.value
        }
        const { data } = await axios.post('api/sign-in', emailAndPasswordCreds)

        //handle the validating responses from the server 
        //If no email...
        if (data.status === 'no teacheremail') {
            setEmailVerified(false)
            setWarningBorderEmail('border border-3 border-danger')
        }
        //If no password...
        if (data.status === 'no password') {
            setWarningBorderPassword('border border-3 border-danger')
            setPasswordVerified(false)
        }
        //If the first two ifs above fail, the user exists in the db and a 
        //permissionLevel key will come back. It's value will be admin or teacher
        //route the user to the appropriate page: admin for admin, teacher for teacher
        if (data.permissionLevel) {
            history.push(`/dashboard/${data.permissionLevel}`)
        }

    }

    return (
        <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center landing-background ">
            <div className="row d-flex justify-content-center">
                <div className="form-box col-sm-6 p-5 shadow">
                    <form className={`d-flex flex-column`} onSubmit={sendSignInCreds} action="">
                        {/* Show 'Email' label. If email verification fails, show alternate label. */}
                        {emailVerified ? <label className={`form-label text-black-50`} htmlFor="email">Email</label>
                            :
                            <label className={`form-label fw-bold text-danger`} htmlFor="email">We can't find that email. Try again.</label>
                        }

                        {/* Notice warning border shows up on failed password verification */}
                        <input
                            className={`form-control mb-3 ${warningBorderEmail} `}
                            type="text" name="email" id="email"
                            placeholder={`wmozart@gmail.com`} />

                        {/* Show 'Password' label. If password verification fails, show alternate label. */}
                        {passwordVerified ? <label className="form-label text-black-50" htmlFor="password">Password</label>
                            :
                            <label className="form-label fw-bold text-danger" htmlFor="password">Password doesn't match our records</label>
                        }

                        {/* Notice warning border shows up on failed password verification */}
                        <input
                            className={`form-control mb-3 ${warningBorderPassword}`}
                            type="password"
                            name="password"
                            id="password"
                            placeholder={`Keep it secret. Keep it safe.`} />



                        <input className={`w-75 align-self-center custom-btn border-0`} type="submit" value="Sign In" />

                    </form>
                    <form className={`d-flex flex-column`} onSubmit={() => setSignUpOrIn('up')} action="">
                        <h3 className={`fs-3 text-black-50 m-3 align-self-center text-center`}>Don't have an account?</h3>
                        <input className={`w-75 align-self-center custom-btn border-0`} type="submit" value="Sign up" />
                    </form>
                </div>
            </div>

        </div>
    )
}

export default SignIn