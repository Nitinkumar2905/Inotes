import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Context/notes/NoteContext";
import { v4 as uuidv4 } from "uuid";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import "./Notes.css";
import toast from "react-hot-toast";

function Notes(props) {
  const context = useContext(NoteContext);
  let navigate = useNavigate();
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    refClose.current.click();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    toast.success("Note updated successfully!");
  };

  const onchange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div
        className="mt-5 d-flex  justify-content-between"
        style={{ height: "100%", overflow: "hidden" }}
      >
        <div className=" w-100" style={{ height: "70vh" }}>
          <AddNote showAlert={props.showAlert} mode={props.mode} />
        </div>
        <hr
          className="bg-black rounded "
          style={{ width: "8px", height: "77vh" }}
        />
        <div
          className="ms-5 w-100 inner-container"
          style={{ height: "80vh", overflowY: "scroll" }}
        >
          <button
            type="button"
            className="btn btn-primary my-2 d-none"
            data-bs-toggle="modal"
            ref={ref}
            data-bs-target="#exampleModal"
          >
            Launch demo modal
          </button>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5 " id="exampleModalLabel">
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
                        value={note.etitle}
                        onChange={onchange}
                        minLength={5}
                        required
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
                        value={note.edescription}
                        onChange={onchange}
                        minLength={5}
                        required
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
                        value={note.etag}
                        onChange={onchange}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    ref={refClose}
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleClick}
                    className="btn btn-primary"
                  >
                    Update Note
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <h3
              className={` py-1 rounded sticky-top bg-${
                props.mode === "Dark" ? "black" : "light"
              } text-${
                props.mode === "Dark" ? "white" : "dark"
              } d-flex justify-content-center fw-semibold fs-2 container`}
            >
              Your Notes
            </h3>
            {notes.length ? (
              notes.map((note) => {
                return (
                  <NoteItem
                    note={note}
                    key={uuidv4()}
                    showAlert={props.showAlert}
                    updateNote={updateNote}
                    mode={props.mode}
                  />
                );
              })
            ) : (
              <div className="Container">
                {notes.length === 0 && (
                  <span
                    className={`mt-3 d-flex justify-content-center fs-3 text-${
                      props.mode === "Dark" ? "white" : "dark"
                    }`}
                  >
                    No notes available !
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Notes;
