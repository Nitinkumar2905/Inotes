import React, { useContext } from "react";
import noteContext from "../Context/notes/noteContext";
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
    props.showAlert("Note added successfully", "success");
  };

  const onchange = (e) => {
    setNote({
      ...note,
      [e.target.name]: [e.target.value],
    });
  };
  return (
    <>
      <div className={`container d-flex justify-content-center fw-semibold fs-2 text-${props.mode==="Dark"?"white":"dark"}`}>
        Create a Note
      </div>
      <form style={{ width: "100%" }}>
        <div className="mb-3">
          <label htmlFor="title" className={`fs-5 form-label text-${props.mode==="Dark"?"white":"dark"}`}>
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={onchange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className={`text-${props.mode==="Dark"?"white":"dark"} fs-5 form-label`}>
            Description:
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onchange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className={`text-${props.mode==="Dark"?"white":"dark"} fs-5 form-label`}>
            Tag:
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onchange}
          />
        </div>
        <button
          type="submit"
          className={`btn btn-${props.mode==="Dark"?"black":"primary"} text-white bg-${props.mode==="Dark"?"black":"primary"}`}
          onClick={handleAddNote}
        >
          Add Note
        </button>
      </form>
    </>
  );
};

export default AddNote;
