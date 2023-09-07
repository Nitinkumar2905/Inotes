import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  // const host = "http://localhost:5000";
  const host = "https://inotes-backend-ten.vercel.app";
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const Navigate = useNavigate();
  const token = localStorage.getItem("token")

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":token
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    if (json.success) {
      // save the auth token and redirect to the note page
      localStorage.setItem("token", json.authToken);
      props.showAlert("Logged in Successfully", "success");
      Navigate("/notes");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container my-5" style={{ width: "50%" }}>
        <h3
          className={`d-flex justify-content-center mb-5 text-${
            props.mode === "Dark" ? "white" : "dark"
          }`}
        >
          Login to Continue
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="email"
              className={`form-label text-${
                props.mode === "Dark" ? "white" : "dark"
              }`}
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              aria-describedby="emailHelp"
              onChange={onChange}
            />
            <div
              id="email"
              className={`form-text text-${
                props.mode === "Dark" ? "white" : "dark"
              }`}
            >
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3 d-flex flex-column">
            <label
              htmlFor="password"
              className={`form-label text-${
                props.mode === "Dark" ? "white" : "dark"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <button
            type="submit"
            className={`fs-6 fw-semibold btn btn-${
              props.mode === "Dark" ? "primary" : "dark"
            } bg-${props.mode === "Dark" ? "black" : "primary"}`}
          >
            Login
          </button>
        </form>
        <div
          className={`container my-2 fs-5 d-flex text-${
            props.mode === "Dark" ? "white" : "dark"
          } justify-content-center`}
        >
          <span className="">New User ? &nbsp;</span>
          <Link
            className={` link-underline-primary link-offset-1 text-decoration-${
              props.mode === "Light" && "none"
            } fw-semibold text-${props.mode === "Dark" ? "white" : "dark"}`}
            to="/signUp"
          >
            Click Here
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
