import React, { useContext } from "react";
import noteContext from "../Context/notes/noteContext";
import { useState } from "react";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });
  const handleAddNote = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };

  const onchange = (e) => {
    setNote({
      ...note,
      [e.target.name]: [e.target.value],
    });
  };
  return (
    <>
      <div className="container d-flex justify-content-center fw-semibold fs-2 text-primary">
        Create a Note
      </div>
      <form style={{ width: "100%" }}>
        <div className="mb-3">
          <label htmlFor="title" className="fs-5 form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="fs-5 form-label">
            Description:
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="fs-5 form-label">
            Tag:
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onchange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleAddNote}
        >
          Add Note
        </button>
      </form>
    </>
  );
};

export default AddNote;
