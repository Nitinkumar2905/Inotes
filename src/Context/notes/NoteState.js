import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  // const host = 'http://localhost:5000'
  const host = "https://inotes-backend-ten.vercel.app";

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial)

  // Fetch all notes
  const getNotes = async () => {
    //  API call
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'auth-token': localStorage.getItem('token')
      },
      credentials: 'include',
    });
    const json = await response.json()
    setNotes(json)

  }


  // Add a note
  const addNote = async (title, description, tag) => {
    try {
      // Convert title, description, and tag to strings
      const titleString = String(title);
      const descriptionString = String(description);
      const tagString = String(tag);

      const response = await fetch(`${host}/api/notes/addNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({ title: titleString, description: descriptionString, tag: tagString }),
      });

      if (!response.ok) {
        throw new Error("Internal server error"); // Throw an error if the response is not successfull
      }

      const json = await response.json();
      const note = {
        user: json.user,
        title: titleString,
        description: descriptionString,
        tag: tagString,
        date: json.date
      };
      setNotes(notes.concat(note));
    } catch (error) {
      console.log(error);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // Convert title, description, and tag to strings
    const titleString = String(title);
    const descriptionString = String(description);
    const tagString = String(tag);

    // API call 
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title: titleString, description: descriptionString, tag: tagString }),
    });
    if (!response.ok) {
      throw new Error("Internal Server Error")
    }
    // Logic code
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = titleString;
        newNotes[index].description = descriptionString;
        newNotes[index].tag = tagString;
        break;
      }
    }
    setNotes(newNotes)
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
