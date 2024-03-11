import React, { useState, useEffect } from "react";
import ProjectList from "./ProjectList";

const CreateProject = () => {
  const [projectList, setProjectList] = useState([]);
  const [newProject, setNewProject] = useState("");

  useEffect(() => {
    // Fetch projects from localStorage when the component mounts
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjectList(storedProjects);
  }, []);

  const handleChange = (event) => {
    setNewProject(event.target.value);
  };

  const addProject = () => {
    if (newProject.trim() === "") {
      return;
    }

    const project = {
      id:
        projectList.length === 0
          ? 1
          : projectList[projectList.length - 1].id + 1,
      ProjectName: newProject,
    };

    const existingProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const updatedProjects = [...existingProjects, project];

    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    setProjectList([...projectList, project]);
    setNewProject("");
  };

  return (
    <div>
      <div className="addProject">
        <input name="project" onChange={handleChange} value={newProject} />
        <button onClick={addProject}> Add Project</button>
      </div>
      <div className="list">
        {projectList.map((project) => (
          <ProjectList
            key={project.id}
            ProjectName={project.ProjectName}
            id={project.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CreateProject;
