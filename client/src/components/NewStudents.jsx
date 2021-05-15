function NewStudents() {
    const studentArray = ['Sally Jane', 'Wanda Maximoff', 'Steve Rogers', 'Vis Ion', 'Anthony Stark']
    return (
        <>
            {studentArray.map((student, idx) => <p key={idx}>{student}</p>)}
        </>
    )
}

export default NewStudents