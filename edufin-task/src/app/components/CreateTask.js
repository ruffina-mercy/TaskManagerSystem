import React, { useState, useEffect } from "react";
import TaskLists from "./TaskLists";

const CreateTask = () => {
  // State to manage the todo list and the new task input
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [developers, setDevelopers] = useState([]);
  const [selectedDeveloper, setSelectedDeveloper] = useState("");

  //   create the new task input
  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
    // setNewTask({ ...newTask, projectId: event.target.value });
  };

  const handleDeveloperChange = (event) => {
    setSelectedDeveloper(event.target.value);
  };

  //   Function to add a new task
  const addTask = () => {
    if (
      newTask.trim() === "" ||
      selectedProject === "" ||
      selectedDeveloper === ""
    ) {
      return;
    }
    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      taskName: newTask,
      projectId: selectedProject,
      developerId: selectedDeveloper,
      completed: false,
    };

    const existingTasks = Array.isArray(
      JSON.parse(localStorage.getItem("tasks"))
    )
      ? JSON.parse(localStorage.getItem("tasks"))
      : [];
    // Add the new project to the array
    const updatedTasks = [...existingTasks, task];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTodoList(task.taskName !== "" ? [...todoList, task] : todoList);
    setNewTask("");
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTodoList(todoList.filter((task) => task.id !== id));
  };

  // Function to mark a task as completed
  const completeTask = (id) => {
    setTodoList(
      todoList.map((task) => {
        if (task.id === id) {
          return { ...task, completed: true };
        } else {
          return task;
        }
      })
    );
  };

  useEffect(() => {
    // Fetch projects from localStorage
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(storedProjects);

    // Fetch developers from userDetails
    const storedUserDetails =
      JSON.parse(localStorage.getItem("userDetails")) || [];
    const developerUsers = storedUserDetails.filter(
      (user) => user.role === "developer"
    );
    setDevelopers(developerUsers);

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTodoList(storedTasks);
  }, []);

  // Render the component
  return (
    <>
      <div className="addTask">
        <input
          name="task"
          onChange={handleChange}
          value={newTask}
          placeholder="Enter task name"
        />
        <select value={selectedProject} onChange={handleProjectChange}>
          <option value="" disabled>
            Select Project
          </option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.ProjectName}
            </option>
          ))}
        </select>
        <select value={selectedDeveloper} onChange={handleDeveloperChange}>
          <option value="" disabled>
            Select Developer
          </option>
          {developers.map((developer) => (
            <option key={developer.id} value={developer.id}>
              {developer.userId}
            </option>
          ))}
        </select>
        <button onClick={addTask}> Add Task</button>
      </div>
      <div className="list">
        {todoList.map((task) => {
          return (
            <>
              <TaskLists
                taskName={task.taskName}
                id={task.id}
                completed={task.completed}
                deleteTask={deleteTask}
                completeTask={completeTask}
              />
            </>
          );
        })}
      </div>
    </>
  );
};

export default CreateTask;
