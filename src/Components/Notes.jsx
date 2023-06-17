import React, { useContext } from "react";
import noteContext from "../Context/notes/noteContext";
import { v4 as uuidv4 } from 'uuid';
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(noteContext);
  const { note } = context;
  return (
    <>
      <div className="row my-3">
        {note.map((note) => {
          return <NoteItem note={note} key={uuidv4()}/>;
        })}
      </div>
    </>
  );
};

export default Notes
