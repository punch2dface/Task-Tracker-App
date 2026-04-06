import TaskItem from "./TaskItem";

function TaskList({
    filteredTasks,
    handleToggleTask,
    handleDeleteTask,
    handleStartEdit,
    handleSaveEdit,
    editTaskId,
    editText,
    setEditText
}) {

    // Show a friendly empty state when no tasks match the current filter.
    if (filteredTasks.length === 0){
        return <p className="empty-message">No tasks found.</p>
    }

    return (
        <ul className="task-list">
            {filteredTasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    handleToggleTask={handleToggleTask}
                    handleDeleteTask={handleDeleteTask}
                    handleStartEdit={handleStartEdit}
                    handleSaveEdit={handleSaveEdit}
                    editTaskId={editTaskId}
                    editText={editText}
                    setEditText={setEditText}
                />
            ))}
        </ul>
    );
}

export default TaskList;