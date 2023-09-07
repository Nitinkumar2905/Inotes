import React, { useContext } from "react";
import noteContext from "../Context/notes/NoteContext";
import { useState } from "react";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleAddNote = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  };

  const onchange = (e) => {
    setNote({
      ...note,
      [e.target.name]: [e.target.value],
    });
  };
  return (
    <>
      <div
        className=" d-flex justify-content-center flex-column "
        style={{ width: "35vw" }}
      >
        <div
          className={` container d-flex justify-content-center fs-3 text-${
            props.mode === "Dark" ? "white" : "dark"
          }`}
        >
          Create a Note
        </div>

        <form className="d-flex flex-column align-items-center">
          <div className="mb-3">
            <label
              htmlFor="title"
              className={` form-label text-${
                props.mode === "Dark" ? "white" : "dark"
              }`}
            >
              Title:
            </label>
            <input
              type="text"
              className="form-control"
              style={{ width: "30vw" }}
              id="title"
              name="title"
              value={note.title}
              onChange={onchange}
              minLength="5"
              required
            />
            <small className={`text-${props.mode==="Dark"?"white":"dark"}`}style={{fontSize:'13px'}}>Title must contain at least 3 character</small>
          </div>

          <div className="mb-3">
            <label
              htmlFor="description"
              className={`text-${
                props.mode === "Dark" ? "white" : "dark"
              } form-label`}
            >
              Description:
            </label>
            <input
              type="text"
              className="form-control"
              style={{ width: "30vw" }}
              id="description"
              name="description"
              value={note.description}
              onChange={onchange}
              minLength="5"
              required
            />
            <small className={`text-${props.mode==="Dark"?"white":"dark"}`}style={{fontSize:'13px'}}>Description must contain at least 3 character</small>
          </div>
          <div className="mb-3">
            <label
              htmlFor="tag"
              className={`text-${
                props.mode === "Dark" ? "white" : "dark"
              } form-label`}
            >
              Tag(<small style={{fontSize:'12px'}}>Optional</small>):
            </label>
            <input
              type="text"
              className="form-control"
              style={{ width: "30vw" }}
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onchange}
            />
          </div>
          <button
            type="submit"
            className={`fs-6 fw-semibold btn btn-${
              props.mode === "Dark" ? "primary" : "dark"
            } bg-${props.mode === "Dark" ? "black" : "primary"}`}
            onClick={handleAddNote}
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
