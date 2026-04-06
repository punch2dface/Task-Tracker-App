function TaskFilter({ filter, setFilter}){
    return (
        <div className="filters">
            <button 
                className={`filter-btn ${filter === "all" ? "active-filter" : ""}`}
                onClick={() => setFilter("all")}
            >
                 All
            </button>
            <button 
                className={`filter-btn ${filter === "active" ? "active-filter" : ""}`}
                onClick={() => setFilter("active")}
            >
                Active
            </button>
            <button 
                className={`filter-btn ${filter === "completed" ? "active-filter" : ""}`}
                onClick={() => setFilter("completed")}
            >
                Completed
            </button>
        </div>
    );  
}

export default TaskFilter;