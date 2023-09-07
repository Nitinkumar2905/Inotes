import React from "react";
import Notes from "./Notes";

const Home = (props) => {
  return (
    <>
      <div className="container">
        <Notes showAlert={props.showAlert} mode={props.mode} />
      </div>
    </>
  );
};

export default Home;
