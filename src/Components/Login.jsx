import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(credentials.email);
    if (json.success) {
      // save the auth token and redirect to the note page
      localStorage.setItem("token", json.authToken);
      props.showAlert("Logged in Successfully", "success");
      Navigate("/home");
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
        <h3 className="d-flex justify-content-center mb-5">
          Login to Continue
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
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
            <div id="email" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
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
          <button type="submit" className="fs-6 fw-semibold btn btn-primary">
            Login
          </button>
        </form>
        <div className="container my-2 fs-5 d-flex justify-content-center ">
          <span className="">New User ? &nbsp;</span>
          <Link
            className="text-decoration-none fw-semibold text-primary"
            to="/signUp"
          >
            SignUp
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
