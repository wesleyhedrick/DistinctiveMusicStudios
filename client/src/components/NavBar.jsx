function NavBar({ setDisplayToNewStudentsOrReports }) {

    return (
        <nav class="navbar navbar-expand-lg navbar-light primary-navbar">
            <div class="container-fluid">
                <h2>Hello, teacher</h2>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a onClick={() => setDisplayToNewStudentsOrReports('students')}
                            className="nav-link" aria-current="page">Students</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={() => setDisplayToNewStudentsOrReports('reports')}
                            className="nav-link">Reports</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={() => setDisplayToNewStudentsOrReports('reports')}
                            className="nav-link">Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar