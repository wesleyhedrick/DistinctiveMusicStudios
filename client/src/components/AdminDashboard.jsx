import NavBar from "./NavBar"
import { useState } from 'react'
function AdminMainDashboard() {
    const nathan = 'Nathan'
    const adminControls = ['Students', 'Reports', 'Create New Student']
    const [dashboardDisplay, setDashboardDisplay] = useState('reports')

    function changeDashboardDisplay(dashboardDisplay) {

        if (dashboardDisplay == 'reports') {
            return <p>Reports</p>
        } else if (dashboardDisplay == 'students') {
            return <p>Students</p>
        } else {
            return <p>New Student Form</p>
        }
    }

    return (
        <>
            <NavBar
                changeDisplay={setDashboardDisplay}
                entity={nathan}
                controlsArray={adminControls} />
            {changeDashboardDisplay(dashboardDisplay)}
        </>
    )
}

export default AdminMainDashboard