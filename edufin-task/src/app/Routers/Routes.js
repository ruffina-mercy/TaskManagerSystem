import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTask from "../components/CreateTask";
import CreateProject from "../components/CreateProject";
import Login from "../components/Login";
import Tasks from "../components/Tasks";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create" element={<CreateTask />} />
        <Route path="/project" element={<CreateProject />} />
        <Route path="/task" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
