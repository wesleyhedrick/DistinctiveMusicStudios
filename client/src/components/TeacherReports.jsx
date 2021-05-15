function TeacherReports({ toggleNewReportOrPlainLandingPage }) {
    const pastReports = Array.from({ length: 5 }, (_, i) => i)
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">{pastReports.map((report, idx) => <p key={idx}>report {idx + 1}</p>)}</div>
                    <div className="col">
                        <button className="cursor-pointer" onClick={() => toggleNewReportOrPlainLandingPage('new-report')}>Submit New Report</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeacherReports