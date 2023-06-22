import React from "react";

export default function Alert(props) {
  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div className="my-3 container relative-top" style={{ height: "20px" }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <div className="d-flex">
            <div className="fw-semibold">{capitalize(props.alert.type)}</div>{" "}
            &nbsp; : &nbsp; <div>{props.alert.msg}</div>
          </div>
        </div>
      )}
    </div>
  );
}
