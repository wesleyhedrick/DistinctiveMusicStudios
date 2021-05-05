import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useState } from 'react'

function Credentials() {

    const [signUpOrIn, setSignUpOrIn] = useState('in')
    const [fontWeight, setFontWeight] = useState('')
    const [warningBorderEmail, setWarningBorderEmail] = useState('')
    const [warningBorderPassword, setWarningBorderPassword] = useState('')

    return (
        <>
            {/* Either Sign-In or Sign-Up appears depening on the state of signUporIn */}
            {
                signUpOrIn === 'in' ?

                    <SignIn
                        fontWeight={fontWeight}
                        setFontWeight={setFontWeight}
                        setSignUpOrIn={setSignUpOrIn}
                        warningBorderEmail={warningBorderEmail}
                        warningBorderPassword={warningBorderPassword}
                        setWarningBorderEmail={setWarningBorderEmail}
                        setWarningBorderPassword={setWarningBorderPassword} />
                    :
                    <SignUp
                        fontWeight={fontWeight}
                        setFontWeight={setFontWeight}
                        setSignUpOrIn={setSignUpOrIn}
                        warningBorderEmail={warningBorderEmail}
                        warningBorderPassword={warningBorderPassword}
                        setWarningBorderEmail={setWarningBorderEmail}
                        setWarningBorderPassword={setWarningBorderPassword} />
            }
        </>
    );

}

export default Credentials