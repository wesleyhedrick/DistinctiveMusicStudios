function Card() {
    const studentArray = ['Sally Jane', 'Wanda Maximoff', 'Steve Rogers', 'Vis Ion', 'Anthony Stark']
    return (
        <div className="card bg-warning p-2 my-3 w-50 student-card shadow">
            <div className="card-body bg-light p-0">
                <div className="card-title m-0 fs-4 border-bottom d-flex justify-content-center align-items-center">
                    <span className="">{studentArray.length > 1 ? `${studentArray.length} Students` : `1 Student`} Needing First Lesson</span>
                </div>
                <div className="card-text mt-3 px-2">
                    {studentArray.map((student, idx) => <p key={idx}>{student}</p>)}
                </div>
            </div>
        </div>
    )
}

export default Card