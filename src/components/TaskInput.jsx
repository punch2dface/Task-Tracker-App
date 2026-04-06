function TaskInput({ input, setInput, handleAddTask}){

    // Allows users to submit a new task by pressing Enter.
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleAddTask();
        }
    };

    return (
        <div className="task-input">
            <input
                type="text"
                placeholder="Enter a task"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button className="add-btn" onClick={handleAddTask}>Add</button>
        </div>
    );
}

export default TaskInput;