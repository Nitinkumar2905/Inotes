import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const UserDetails = (props) => {
  const Navigate = useNavigate();
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
        setUser({
          name: json.user.name,
          email: json.user.email,
          userId: json.user._id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = async () => {
    const response = await fetch(`${host}/api/auth/deleteUser/${user.userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    if (response.status === 404) {
      // Handle user not found error
      alert("User not found");
      return;
    }

    try {
      const json = await response.json();
      if (response.ok) {
        localStorage.removeItem("token");
        Navigate("/signUp");
      } else {
        alert("Cannot process this request right now");
        console.log(json);
      }
    } catch (error) {
      console.log(error);
      alert("Error occurred while processing the request");
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card text-center" style={{ width: "40%" }}>
        <div className="card-header fs-3 fw-bold ">INotes </div>
        <div className="card-body m-3 d-flex flex-column align-items-start">
          <h5 className="card-title d-flex justify-content-start">
            {localStorage.getItem("token") && (
              <i className="fa-regular fa-user my-1"></i>
            )}
            <div className=" mx-3 fa-envalope my-1 fs-5">{user.name}</div>
          </h5>
          <div className="card-text d-flex justify-content-start align-item-center">
            {localStorage.getItem("token") && (
              <i className="fa-regular fa-envelope my-1 fs-5"></i>
            )}
            <p className="mx-3">{user.email}</p>
          </div>
          <div className="card-text d-flex justify-content-start align-item-center">
            {localStorage.getItem("token") && (
              <i className="fa-solid fa-id-card my-1 fs-5"></i>
            )}
            <p className="mx-3">{user.userId}</p>
          </div>
          <div className="d-flex justify-content-between w-100 align-items-center ">
            <Link
              to="/home"
              className={`mt-2 btn btn-${
                props.mode === "Dark" ? "primary" : "dark"
              } bg-${props.mode === "Dark" ? "black" : "primary"}`}
            >
              Your Notes
            </Link>
            {localStorage.getItem("token") && (
              <button
                onClick={deleteUser}
                className={`mt-2 btn btn-${
                  props.mode === "Dark" ? "primary" : "dark"
                } bg-${props.mode === "Dark" ? "black" : "primary"}`}
              >
                Delete Account
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
