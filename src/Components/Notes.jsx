import React, { useContext } from "react";
import noteContext from "../Context/notes/NoteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(noteContext);
  const { note } = context;
  return (
    <>
      <div className="text-primary">
        {note.map((note) => {
          return <NoteItem note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
