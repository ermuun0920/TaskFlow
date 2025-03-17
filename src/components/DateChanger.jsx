const DateChanger = ({ task, updateTaskDate, newDate, setNewDate }) => {
    return (
        <div className="">
            <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="border px-2 py-1 rounded-md text-sm"
            />
            <button onClick={updateTaskDate} className="bg-blue-500 text-white px-3 py-1 rounded-md">
                Save Date
            </button>
        </div>
    );
}

export default DateChanger