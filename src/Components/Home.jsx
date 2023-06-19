import React, { useContext } from "react";
// import noteContext from "../Context/notes/noteContext";
import Notes from "./Notes";

const Home = () => {
  return (
    <>
      <div className="container">
        <Notes />
      </div>
    </>
  );
};

export default Home;
