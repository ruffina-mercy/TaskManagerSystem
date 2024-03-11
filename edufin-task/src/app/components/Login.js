import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";

const Login = () => {
  const initialValues = {
    username: "",
    password: "",
  };
  const history = useNavigate();
  const userDetails = [
    {
      id: 1,
      userId: "admin@gmail.com",
      password: "admin@123",
      role: "admin",
    },
    {
      id: 2,
      userId: "manager@gmail.com",
      password: "manager@123",
      role: "manager",
    },
    {
      id: 3,
      userId: "developer1@gmail.com",
      password: "developer1@123",
      role: "developer",
    },
    {
      id: 4,
      userId: "developer2@gmail.com",
      password: "developer2@123",
      role: "developer",
    },
    {
      id: 5,
      userId: "developer3@gmail.com",
      password: "developer3@123",
      role: "developer",
    },
  ];

  const submitLogin = (values) => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    if (values.username === "admin@gmail.com") {
      history("/project");
    } else if (values.username === "manager@gmail.com") {
      history("/create");
    } else {
      history("/task");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => submitLogin(values)}
        enableReinitialize={true}
      >
        {({ handleChange, handleSubmit, values }) => (
          <div className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={values.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" onClick={handleSubmit}>
                Login
              </button>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Login;
