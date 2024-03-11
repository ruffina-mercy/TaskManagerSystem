import React, { useState } from "react";

const Tasks = () => {
  const storedTasks = localStorage.getItem("tasks");
  const initialTasks = JSON.parse(storedTasks) || [];
  const [tasks, setTasks] = useState(initialTasks);

  const handleStatus = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div>
      {tasks.length > 0 ? (
        <table className="task-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Task Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.taskName}</td>
                <td
                  onClick={() => handleStatus(item.id)}
                  className="tablecursor"
                  style={{
                    backgroundColor: item.completed ? "green" : "white",
                    color: item.completed ? "white" : "black",
                  }}
                >
                  {item.completed ? "Completed" : "Incomplete"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
};

export default Tasks;
