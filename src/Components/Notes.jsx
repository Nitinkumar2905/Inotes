import React, { useState, useContext, useEffect, useRef } from "react";
import noteContext from "../Context/notes/noteContext";
import { v4 as uuidv4 } from "uuid";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  const updateNote = (e) => {
    ref.current.click();
  };
  const ref = useRef(null);
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });

  const handleAddNote = (e) => {
    e.preventDefault();
  };

  const onchange = (e) => {
    setNote({
      ...note,
      [e.target.name]: [e.target.value],
    });
  };
  return (
    <>
      <AddNote />
      <button
        type="button"
        className="btn btn-primary my-2 d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        ref={ref}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form style={{ width: "100%" }}>
                <div className="mb-3">
                  <label htmlFor="etitle" className="fs-5 form-label">
                    Title:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="fs-5 form-label">
                    Description:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="fs-5 form-label">
                    Tag:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
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
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        {notes.map((note) => {
          return (
            <NoteItem note={note} updateNote={updateNote} key={uuidv4()} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
