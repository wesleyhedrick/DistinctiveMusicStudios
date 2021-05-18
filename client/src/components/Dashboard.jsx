import { useState } from 'react'
import NewReport from './NewReport'
import NewStudents from './NewStudents'
import TeacherReports from './TeacherReports'
function Dashboard() {
    const [permissionLevel, setPermissionLevel] = useState('')
    const [displayStudentsOrReports, setDisplayToStudentsOrReports] = useState('students')
    const [newReportOrPlainLandingPage, toggleNewReportOrPlainLandingPage] = useState('plain')

    return (
        <>
            {/* if user is admin (nathan) show admin dashboard */}
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
                    < div className="container  border border-danger teacher-dashboard" >
                        <div className="row d-flex justify-content-center">
                            <div className="col">
                                <h1>Hello, teacher</h1>
                            </div>
                        </div>
                        {/* Nav section */}
                        <div className="row d-flex justify-content-center">
                            <div className="col">
                                <ul className="nav nav-tabs">

                                    {/* Students and Reports Tabs */}
                                    <li className="nav-item">
                                        <a onClick={() => setDisplayToStudentsOrReports('students')}
                                            className="nav-link" aria-current="page">Students</a>
                                    </li>
                                    <li className="nav-item">
                                        <a onClick={() => setDisplayToStudentsOrReports('reports')}
                                            className="nav-link">Reports</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Show student subdashboard or reports subdashboard */}
                        {displayStudentsOrReports === 'students' ?
                            <div className="row d-flex justify-content-center">
                                <div className="col">
                                    <NewStudents />
                                </div>
                            </div>
                            :
                            <div className="row d-flex justify-content-center">
                                <div className="col">
                                    {newReportOrPlainLandingPage === 'plain' ?
                                        <TeacherReports toggleNewReportOrPlainLandingPage={toggleNewReportOrPlainLandingPage} />
                                        :
                                        <NewReport toggleNewReportOrPlainLandingPage={toggleNewReportOrPlainLandingPage} />}
                                </div>
                            </div>
                        }
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <button>Log out</button>
                                </div>
                            </div>
                        </div>
                    </div >
            }

        </>
    )
}

export default Dashboard