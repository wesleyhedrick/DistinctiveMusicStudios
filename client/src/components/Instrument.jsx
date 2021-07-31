function Instrument({ instruments, instrumentNumber, handleFormChange, studentNumber }) {
    // console.log('instruments', instruments)
    const mb = 'mb-3'
    return (
        <div className="d-flex flex-column align-items-start m-1">
            <label className="form-label w-75 text-black-50" htmlFor="first">{`Instrument ${instrumentNumber}`}</label>
            <select onChange={handleFormChange} className={`form-select w-100 border`}
                name={`student${studentNumber}_instrument_${instrumentNumber}`}
                id={`instrument_${instruments.id}`}>
                {instruments.map((instrument, idx) => <option key={idx} value={instrument.id}>{instrument.name}</option>)}
            </select>
        </div>
    )
}

export default Instrument