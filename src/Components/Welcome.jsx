import React from "react";
import { Link } from "react-router-dom";

const About = (props) => {
  return (
    <>
      <div className="d-flex flex-column align-items-center container">
        <div
          className={`container d-flex justify-content-center fs-5 text-${
            props.mode === "Dark" ? "white" : "dark"
          }`}
        >
          Welcome To Inotes cloud service
        </div>

        {!localStorage.getItem("token") && (
          <div className="my-5 fs-6 d-flex flex-column align-items-center">
            <span
              className={`text-${props.mode === "Dark" ? "white" : "dark"}`}
            >
              New to Inotes? no worries!😎
            </span>
            <Link
              to="/signUp"
              className={`ms-1 fs-6 my-2 btn btn-${
                props.mode === "Dark" ? "primary" : "dark"
              } bg-${props.mode === "Dark" ? "black" : "primary"}`}
            >
              Create Account
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default About;
