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
        <h3 className="d-flex justify-content-center mb-5">
          New to INotes ? Join Now
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
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
            <label htmlFor="email" className="form-label">
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
            <label htmlFor="password" className="form-label">
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
          <div id="emailHelp" className="form-text my-3">
            We'll never share your credentials with anyone else.
          </div>
          <button type="submit" className="btn btn-primary fw-semibold">
            SignUp
          </button>
        </form>
        <div className="d-flex justify-content-center mt-3 fs-5">
          <span>Already a User ?</span> &nbsp;
          <Link className="text-decoration-none fw-semibold" to="/login">
            Login Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
