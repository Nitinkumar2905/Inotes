import React, { useContext } from "react";
import noteContext from "../Context/notes/noteContext";
const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <>
      <div className="col-md-3 my-2 ">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <p className="card-text">{note.tag}</p>
            <p className="card-text">
              {note.date && typeof note.date === "string"
                ? new Date(note.date).toLocaleString()
                : ""}
            </p>
            <span
              className={`text-white bg-${
                props.mode === "Dark" ? "black" : "primary"
              }  px-2 py-1`}
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Note deleted successfully", "success");
              }}
              style={{ borderRadius: "6px", cursor: "pointer" }}
            >
              Delete
            </span>
            <span
              className={`text-white bg-${
                props.mode === "Dark" ? "black" : "primary"
              }   px-2 py-1 mx-2 `}
              onClick={() => {
                updateNote(note);
              }}
              style={{ borderRadius: "6px", cursor: "pointer" }}
            >
              Edit Note
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
