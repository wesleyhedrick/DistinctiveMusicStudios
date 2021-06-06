function SecondaryNavBar({ toggleNewOrHistoricalReports }) {
    return (
        <nav class="navbar navbar-expand-lg secondary-navbar">
            <div class="container-fluid">
                <h2>Teacher Reports</h2>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button className="cursor-pointer new-report-btn m-1" onClick={() => toggleNewOrHistoricalReports('plain')}>Historical Reports</button>
                    </li>
                    <li className="nav-item">
                        <button className="cursor-pointer new-report-btn m-1" onClick={() => toggleNewOrHistoricalReports('new-report')}>Submit New Report</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default SecondaryNavBar