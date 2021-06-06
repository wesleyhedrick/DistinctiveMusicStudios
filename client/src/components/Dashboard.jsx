import { useState } from 'react'
import NavBar from './NavBar'
import NewReport from './NewReport'
import NewStudents from './NewStudents'
import TeacherReports from './TeacherReports'
function Dashboard() {
    const [permissionLevel, setPermissionLevel] = useState('')
    const [displayNewStudentsOrReports, setDisplayToNewStudentsOrReports] = useState('students')
    const [newOrHistoricalReports, toggleNewOrHistoricalReports] = useState('plain')

    return (
        <>
            {/* if user is admin (nathan) show admin dashboard, else show teacher dashboard*/}
            {
                permissionLevel === 'admin' ?
                    < div className="container w-50 border border-danger" >
                        <div className="row d-flex justify-content-center">
                            <div className="col">
                                <h1>Hello, Nathan!</h1>
                            </div>
                        </div>
                    </div >
                    :
                    // if permission level not admin, show teacher dashboard
                    < div className="container teacher-dashboard" >

                        {/* Nav section */}
                        <NavBar setDisplayToNewStudentsOrReports={setDisplayToNewStudentsOrReports} />

                        {/* Show student subdashboard or reports subdashboard */}
                        {displayNewStudentsOrReports === 'students' ?
                            <div className="row d-flex justify-content-center">
                                <div className="col">
                                    <NewStudents />
                                </div>
                            </div>
                            :
                            <div className="row d-flex justify-content-center">
                                <div className="col">
                                    {newOrHistoricalReports === 'plain' ?
                                        <TeacherReports toggleNewOrHistoricalReports={toggleNewOrHistoricalReports} />
                                        :
                                        <NewReport toggleNewOrHistoricalReports={toggleNewOrHistoricalReports} />}
                                </div>
                            </div>
                        }

                    </div >
            }

        </>
    )
}

export default Dashboard