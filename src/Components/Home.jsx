import React, { useContext } from "react";
import noteContext from "../Context/notes/NoteContext";
import Notes from "./Notes";

const Home = () => {
    
  return (
    <>
      <div className="container">
        <div className="container d-flex justify-content-center fw-semibold fs-2 text-primary">
          Create a Note
        </div>
        <form style={{width:"100%"}}>
          <div className="mb-3">
            <label htmlFor="title" className="fs-5 form-label">
              Title:
            </label>
            <input type="text" className="form-control" id="title" />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="fs-5 form-label">
              Description
            </label>
            <input type="text" className="form-control" id="description" />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Note
          </button>
            <Notes/>
        </form>
      </div>
    </>
  );
};

export default Home;
