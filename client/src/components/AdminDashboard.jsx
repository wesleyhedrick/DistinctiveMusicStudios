import NavBar from "./NavBar"
import { useState } from 'react'
import HistoricalReportsLinks from "./HistoricalReportsLinks"
import StudentList from "./StudentList"
import NewStudentForm from "./NewStudentForm"
import CreateNewAccount from "./CreateNewAccount"
import { adminControls } from '../utilities/enums'

function AdminMainDashboard() {
    const nathan = 'Nathan'
    const displayObject = {
        'reports': <HistoricalReportsLinks />,
        'students': <StudentList />,
        'newAccount': <CreateNewAccount />
    }

    const [dashboardDisplay, setDashboardDisplay] = useState('')

    function changeDashboardDisplay(dashboardDisplay) {
        console.log(displayObject[dashboardDisplay])
        return displayObject[dashboardDisplay]
    }

    return (
        <>
            <NavBar
                changeDisplay={setDashboardDisplay}
                entity={nathan}
                controlsArray={adminControls} />
            <div >
                {changeDashboardDisplay(dashboardDisplay)}
            </div>
        </>
    )
}

export default AdminMainDashboard