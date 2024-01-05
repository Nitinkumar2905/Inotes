import React, { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import userIcon from "./img/user.png";
import toast from "react-hot-toast";

const Navbar = (props) => {

  const Navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    toast("Logged Out successfully!")
    Navigate("/welcome");
  };
  const ref = useRef(null);
  let location = useLocation();
  const handleUserInfo = () => {
    ref.current.click();
    Navigate("/getUser");
  };
  return (
    <>
      <nav
        className={` shadow sticky-top  border-bottom  border-${
          props.mode
        } navbar navbar-expand-lg navbar-${props.mode}  bg-${
          props.mode === "Dark" ? "dark" : "light-subtle"
        } text-${props.mode === "Dark" ? "white" : "dark"}`}
      >
        <div className="container-fluid">
          <Link
            className={`navbar-brand text-${
              props.mode === "Dark" ? "white" : "dark"
            }`}
            to="/"
          >
            INotes
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{
              backgroundColor: "white",
              border: `1px solid ${props.mode === "Dark" ? "white" : "dark"}`,
            }}
          >
            <span
              className="navbar-toggler-icon"
              style={{
                color: `${props.mode === "Dark" ? "dark" : "white"}`,
              }}
            ></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "fw-semibold" : ""
                  } link-offset-2`}
                  to="/welcome"
                  style={{
                    color: `${props.mode === "Dark" ? "white" : "black"}`,
                  }}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/home" ? "fw-semibold" :""
                  } link-offset-2`}
                  aria-current="page"
                  to="/notes"
                  style={{
                    color: `${props.mode === "Dark" ? "white" : "black"}`,
                  }}
                >
                  Notes
                </Link>
              </li>
              
            </ul>
            <div className="form-check form-switch mx-3">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onClick={props.handleMode}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Light Mode
              </label>
            </div>{" "}
            {!localStorage.getItem("token") ? (
              <form className="d-flex" role="search">
                <Link
                  className={`me-1 fs-6 fw-semibold btn btn-${
                    props.mode === "Dark" ? "primary" : "dark"
                  } bg-${props.mode === "Dark" ? "black" : "primary"}`}
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className={`ms-1 fs-6 fw-semibold btn btn-${
                    props.mode === "Dark" ? "primary" : "dark"
                  } bg-${props.mode === "Dark" ? "black" : "primary"}`}
                  to="/signUp"
                >
                  SignUp
                </Link>
              </form>
            ) : (
              <div>
                <Link
                  ref={ref}
                  onClick={handleUserInfo}
                  to="/UserInfo"
                  className="text-white mx-4 fw-semibold fs-6 text-decoration-none "
                  style={{ cursor: "pointer" }}
                >
                  <img className={` bg-${props.mode==="Dark"?"white":""} border rounded-5 border-${props.mode==="Dark"?"primary":"dark"}`} src={userIcon} alt="" />
                </Link>
                <button
                  onClick={handleLogOut}
                  className={`ms-1 fs-6 fw-semibold btn btn-${
                    props.mode === "Dark" ? "primary" : "dark"
                  } bg-${props.mode === "Dark" ? "black" : "primary"}`}
                >
                  LogOut
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
