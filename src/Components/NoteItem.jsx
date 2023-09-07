import React, { useContext } from "react";
import noteContext from "../Context/notes/NoteContext";
const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <>
      
      <div className="m-3" style={{ height: "100%" }}>
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
              className={`px-2 py-1 me-2 btn btn-${
                props.mode === "Dark" ? "primary" : "dark"
              } bg-${props.mode === "Dark" ? "black" : "primary"}`}
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Note deleted successfully", "success");
              }}
              style={{ borderRadius: "6px", cursor: "pointer" }}
            >
              Delete
            </span>
            <span
              className={`px-2 py-1 btn btn-${
                props.mode === "Dark" ? "primary" : "dark"
              } bg-${props.mode === "Dark" ? "black" : "primary"}`}
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
