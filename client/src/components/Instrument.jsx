
function Instrument({ instruments, selectNumber }) {
    // console.log('instruments', instruments)
    const mb = 'mb-3'
    return (
        <div className="container d-flex flex-column align-items-start w-100">
            <label className="form-label w-75 h-" htmlFor="first">Instrument</label>
            <select className={`form-select w-25 border ${mb}`} name={`instrument_${selectNumber}`}
                id={`instrument_${instruments.id}`}>
                {instruments.map(instrument => <option value={instrument.id}>{instrument.name}</option>)}
            </select>
        </div>

    )
}


export default Instrument