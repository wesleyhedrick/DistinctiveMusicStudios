function LessonLengthSelector({ defaultValue }) {
    const lengthArray = [30, 45, 60]

    return (
        <div>
            <label className="form-label text-black-50" htmlFor="lessonLength">Lesson Length</label>
            <select value={defaultValue || 1} name="lessonLength" id="lessonLength">
                {lengthArray.map((length, idx) => <option key={idx} value={length}>{length}</option>)}
            </select>
        </div>
    )
}

export default LessonLengthSelector