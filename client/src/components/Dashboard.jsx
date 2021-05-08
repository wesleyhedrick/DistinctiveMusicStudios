import { useState } from 'react'
function Dashboard() {
    const [permissionLevel, setPermissionLevel] = useState('')
    const [displayStudentsOrReports, setDisplayToStudentsOrReports] = useState('students')

    return (
        <>
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
                    < div className="container w-50 border border-danger" >
                        <div className="row d-flex justify-content-center">
                            <div className="col">
                                <h1>Hello, teacher</h1>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <div className="col">
                                <ul class="nav nav-tabs">
                                    <li class="nav-item">
                                        <a onClick={() => setDisplayToStudentsOrReports('students')}
                                            class="nav-link" aria-current="page">Students</a>
                                    </li>
                                    <li class="nav-item">
                                        <a onClick={() => setDisplayToStudentsOrReports('reports')}
                                            class="nav-link">Reports</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {displayStudentsOrReports === 'students' ?
                            <div className="row d-flex justify-content-center">
                                <div className="col">
                                    <p>Student Info</p>
                                </div>
                            </div>
                            :
                            <div className="row d-flex justify-content-center">
                                <div className="col">
                                    <p>Reports</p>
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