function NavBar({ changeDisplay, entity, controlsArray }) {

    return (
        <nav className="navbar navbar-expand-lg navbar-light primary-navbar">
            <div className="container-fluid ">
                <h2>Hello, {entity} </h2>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <ul className="navbar-nav">
                    {/* Build navbar with either admin or teacher controls */}
                    {controlsArray.map((item, idx) =>
                        <li key={idx} className="nav-item">
                            <a onClick={() => changeDisplay(item.controlKey)}
                                className="nav-link" aria-current="page">{item.controlLabel}</a>
                        </li>
                    )}
                </ul>
            </div>


        </nav>
    )
}

export default NavBar