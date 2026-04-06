function TaskItem({
    task,
    handleToggleTask,
    handleDeleteTask,
    handleStartEdit,
    handleSaveEdit,
    editTaskId,
    editText,
    setEditText
}) {

    // Determines whether the current task row should render in edit mode.
    const isEditing = editTaskId === task.id;

    return (
        <li className="task-item">
            {isEditing ? (
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="edit-input"
                />
            ) : (
                <span
                    onClick={() => handleToggleTask(task.id)}
                    className={task.completed ? "completed" : ""}
                >
                    {task.text}
                </span>
            )}

            <div className="task-actions">
                {isEditing ? (
                    <button onClick={() => handleSaveEdit(task.id)}>Save</button>
                ) : (
                    <button onClick={() => handleStartEdit(task)}>Edit</button>
                )}
                
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
        </li>
    );
}

export default TaskItem;