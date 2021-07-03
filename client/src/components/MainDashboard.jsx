import { useState } from 'react'
import AdminMainDashboard from './AdminDashboard'
import NavBar from './NavBar'
import NewReport from './NewReport'
import NewStudents from './NewStudents'
import TeacherDashboard from './TeacherDashboard'
import TeacherReports from './TeacherReports'
function MainDashboard({ permissionLevel }) {
    // const [permissionLevel, setPermissionLevel] = useState(permissionLevel)
    const [displayNewStudentsOrReports, setDisplayToNewStudentsOrReports] = useState('students')
    const [newOrHistoricalReports, toggleNewOrHistoricalReports] = useState('plain')
    const teacherName = 'Susan'


    return (
        <>
            {/* if user is admin (nathan) show admin dashboard, else show teacher dashboard*/}
            {
                permissionLevel === 'admin' ?
                    <AdminMainDashboard />
                    :
                    <TeacherDashboard teacherName={teacherName} />
            }

        </>
    )
}

export default MainDashboard

// <div className="row d-flex justify-content-center">
//     <NavBar setDisplayToNewStudentsOrReports={setDisplayToNewStudentsOrReports}
//         entity={'Admin'} controlsArray={adminControls} />
// </div>
// if permission level not admin, show teacher dashboard
// < div className="container teacher-dashboard" >
{/* Nav section */ }
{/* <NavBar setDisplayToNewStudentsOrReports={setDisplayToNewStudentsOrReports}
                    entity={'Teacher'} controlsArray={teacherControls} /> */}

{/* Show student subdashboard or reports subdashboard */ }

    //             {displayNewStudentsOrReports === 'students' ?
    //                 <div className="row d-flex justify-content-center">
    //                     <div className="col">
    //                         <NewStudents />
    //                     </div>
    //                 </div>
    //                 :
    //                 <div className="row d-flex justify-content-center">
    //                     <div className="col">
    //                         {newOrHistoricalReports === 'plain' ?
    //                             <TeacherReports toggleNewOrHistoricalReports={toggleNewOrHistoricalReports} />
    //                             :
    //                             <NewReport toggleNewOrHistoricalReports={toggleNewOrHistoricalReports} />}
    //                     </div>
    //                 </div>
    //             }

    //         </div >