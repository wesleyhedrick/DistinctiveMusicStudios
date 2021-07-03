import NavBar from "./NavBar"
import { useState } from 'react'
import HistoricalReportsLinks from "./HistoricalReportsLinks"
import NewStudents from "./NewStudents"
import NewReport from "./NewReport"

function TeacherDashboard({ teacherName }) {
    const teacherControls = ['Students', 'Reports', 'Submit New Report']
    const [dashboardDisplay, setDashboardDisplay] = useState('reports')

    function changeDashboardDisplay(dashboardDisplay) {
        console.log(dashboardDisplay)
        if (dashboardDisplay == 'reports') {
            return <HistoricalReportsLinks />
        } else if (dashboardDisplay == 'students') {
            return <NewStudents />
        } else {
            return <NewReport />
        }
    }

    return (
        <>
            <NavBar
                changeDisplay={setDashboardDisplay}
                entity={teacherName}
                controlsArray={teacherControls} />
            {changeDashboardDisplay(dashboardDisplay)}
        </>
    )
}

export default TeacherDashboard