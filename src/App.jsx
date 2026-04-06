import { useState, useEffect } from "react";
import "./App.css";
import TaskInput from "./components/TaskInput";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";

function App() {

  // Initialize tasks from localStorage so data persists across page refreshes.
  // The lazy initializer prevents reading localStorage on every render.
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Controlled input state for creating a new task.
  const [input, setInput] = useState("");

  // Controls which subset of tasks is displayed in the UI.
  const [filter, setFilter] = useState("all");

  // Track the task currently being edited.
  // null means no task is in edit mode.
  const [editTaskId, setEditTaskId] = useState(null);

  // Controlled input state for the edit field.
  const [editText, setEditText] = useState("");

  // Adds a new task to the list if the input is not empty.
  const handleAddTask = () => {
    if (input.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  // Toggles a task's completed state without mutating the original array.
  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);
  };

  // Removes a single task by id.
  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Removes all tasks that have been marked as completed.
  const handleClearCompleted = () => {
    const activeTasks = tasks.filter((task) => !task.completed);
    setTasks(activeTasks);
  };

  // Enters edit mode for the selected task and pre-fills the edit input.
  const handleStartEdit = (task) => {
    setEditTaskId(task.id);
    setEditText(task.text);
  };

  // Saves the edited task text if the input is not empty,
  // then exits edit mode and clears the temporary edit state.
  const handleSaveEdit = (id) => {
    if (editText.trim() === "") return;

    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: editText.trim() } : task
    );

    setTasks(updatedTasks);
    setEditTaskId(null);
    setEditText("");
  };

  // Derives the visible task list from the selected filter.
  // The source of ttrusth remains the full 'tasks' array.
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // Persist tasks to localStorage whenever the task list changes.
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="app">
      <h1>Task Tracker</h1>

      <TaskInput
        input={input}
        setInput={setInput}
        handleAddTask={handleAddTask}
      />

      <TaskFilter filter={filter} setFilter={setFilter} />

      {/* Only show the bulk action button when there are completed tasks to clear. */}
      {tasks.some((task) => task.completed) && (
        <button className="clear-btn" onClick={handleClearCompleted}>
          Clear Completed
        </button>
      )}


      <TaskList
        filteredTasks={filteredTasks}
        handleToggleTask={handleToggleTask}
        handleDeleteTask={handleDeleteTask}
        handleStartEdit={handleStartEdit}
        handleSaveEdit={handleSaveEdit}
        editTaskId={editTaskId}
        editText={editText}
        setEditText={setEditText}
      />
    </div>
  );
}

export default App;