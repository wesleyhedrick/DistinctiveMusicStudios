function HistoricalReportsLinks() {
    const pastReports = Array.from({ length: 5 }, (_, i) => i)
    return (
        <div className="card bg-warning p-2 my-3 w-50 student-card shadow">
            <div className="card-body bg-light p-0">
                <div className="card-title m-0 fs-4 border-bottom d-flex justify-content-center align-items-center">
                    <span className="">Historical Reports</span>
                </div>
                <div className="card-text mt-3 px-2">
                    {pastReports.map((report, idx) => <p key={idx}>report {idx + 1}</p>)}
                </div>
            </div>
        </div>
    )
}

export default HistoricalReportsLinks