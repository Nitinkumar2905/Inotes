import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UserDetails = (props) => {
  //   const token = localStorage.getItem("token");
  const host = "http://localhost:5000";
  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line
  }, []);

  const [user, setUser] = useState({ name: "", email: "" });
  const getUserDetails = async () => {
    try {
      const response = await fetch(`${host}/api/auth/getUser`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      } else {
        const json = await response.json();
        setUser({ name: json.user.name, email: json.user.email });
        console.log(json.user.name, json.user.email);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="card text-center" style={{ width: "30%" }}>
        <div className="card-header fs-3 fw-bold">INotes </div>
        <div className="card-body m-3">
          <h5 className="card-title d-flex justify-content-start">
            <i className="fa-regular fa-user"></i>
            <div className="mx-3">{user.name}</div>
          </h5>
          <div className="card-text d-flex justify-content-start align-item-center">
            <i className="fa-regular fa-envelope my-1 fs-5"></i>
            <p className="mx-3">{user.email}</p>
          </div>
          <Link to="/home" className={` btn btn-${
              props.mode === "Dark" ? "primary" : "dark"
            } bg-${props.mode === "Dark" ? "black" : "primary"}`}>
            Your Notes
          </Link>
        </div>
      </div>
    </div>
  );
};
