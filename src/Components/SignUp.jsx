import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    const { name, email, password } = credentials;
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const json = await response.json();

    // save the auth token and redirect to the note page
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      Navigate("/home");
      props.showAlert("SignUp Successfully", "success");
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
        <h3 className={`d-flex justify-content-center mb-5 text-${props.mode==="Dark"?"white":"dark"}`}>
          New to INotes ? Join Now
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className={`form-label text-${props.mode==="Dark"?"white":"dark"}`}>
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={onChange}
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className={`form-label text-${props.mode==="Dark"?"white":"dark"}`}>
              Email address:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={onChange}
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className={`form-label text-${props.mode==="Dark"?"white":"dark"}`}>
              Set password:
            </label>
            <input
              type="password"
              name="password"
              onChange={onChange}
              className="form-control"
              id="password"
              required
            />
          </div>
          <div id="emailHelp" className={`form-text my-3 text-${props.mode==="Dark"?"white":"dark"}`}>
            We'll never share your credentials with anyone else.
          </div>
          <button type="submit" className={`fs-6 fw-semibold btn btn-${
              props.mode === "Dark" ? "primary" : "dark"
            } bg-${props.mode === "Dark" ? "black" : "primary"}`}>
            SignUp
          </button>
        </form>
        <div className={`container my-2 fs-5 d-flex text-${
            props.mode === "Dark" ? "white" : "dark"
          } justify-content-center`}>
          <span>Already a User ?</span> &nbsp;
          <Link  className={` link-underline-primary link-offset-1 text-decoration-${props.mode==="Light" && "none"} fw-semibold text-${
              props.mode === "Dark" ? "white" : "dark"
            }`} to="/login">
            Login Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
