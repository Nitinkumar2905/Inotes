import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = 'http://localhost:5000'
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial)

  // Fetch all notes
  const getNotes = async () => {
    //  API call
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2NGIyN2RlMGNjYTQ1Nzc3NWE0MzI0In0sImlhdCI6MTY4NDMyMDkwOX0.IWqF9_iWoscI-1bXYnQAZ5MHfpt5EMDfRnDVSPlHTm0'
      },
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }


  // Add a note
  const addNote = async (title, description, tag) => {
    console.log('added')
    //  API call
    const response = await fetch(`${host}/api/notes/addNote/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2NGIyN2RlMGNjYTQ1Nzc3NWE0MzI0In0sImlhdCI6MTY4NDMyMDkwOX0.IWqF9_iWoscI-1bXYnQAZ5MHfpt5EMDfRnDVSPlHTm0'
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json = response.json()
    const note = {
      // user: json.user,
      title: title,
      description: description,
      tag: tag
    }
    setNotes(notes.concat(note))
  }


  // Delete a note
  const deleteNote = async(id) => {
    // API call
    console.log('deleting the note with the id' + id);
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2NGIyN2RlMGNjYTQ1Nzc3NWE0MzI0In0sImlhdCI6MTY4NDMyMDkwOX0.IWqF9_iWoscI-1bXYnQAZ5MHfpt5EMDfRnDVSPlHTm0'
      },
    });
    const json = response.json();
    console.log(json)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a note
  const updateNote = async (id, title, description, tag) => {
    console.log('cliced');
    // API call 
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2NGIyN2RlMGNjYTQ1Nzc3NWE0MzI0In0sImlhdCI6MTY4NDMyMDkwOX0.IWqF9_iWoscI-1bXYnQAZ5MHfpt5EMDfRnDVSPlHTm0'
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json = response.json();
    console.log(json);
    // Logic code
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;

      }
    }
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getNotes }}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
