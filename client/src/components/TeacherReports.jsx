import HistoricalReportsLinks from './HistoricalReportsLinks'
import SecondaryNavBar from './SecondaryNavBar'
function TeacherReports({ toggleNewOrHistoricalReports }) {
    const pastReports = Array.from({ length: 5 }, (_, i) => i)
    return (
        <>
            <div className="container">
                <div className="row">
                    <SecondaryNavBar toggleNewOrHistoricalReports={toggleNewOrHistoricalReports} />
                </div>
                <div className="row justify-content-center">
                    <HistoricalReportsLinks />
                </div>
            </div>
        </>
    )
}

export default TeacherReports