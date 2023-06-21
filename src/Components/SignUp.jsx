import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    // cpassword: "",
  });
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    const { name, email, password } = credentials;
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
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
      localStorage.setItem("token", json.authtoken);
      Navigate("/about");
      props.showAlert("SignUp Successfully", "success")
    } else {
      props.showAlert("Invalid credentials", "danger")
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container my-5" style={{ width: "50%" }}>
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
          {/* <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm password:
            </label>
            <input
              type="password"
              name="cpassword"
              onChange={onChange}
              className="form-control"
              id="cpassword"
            />
          </div> */}
          <div id="emailHelp" className="form-text my-3">
            We'll never share your credentials with anyone else.
          </div>
          <button type="submit" className="btn btn-primary">
            SignUp
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
