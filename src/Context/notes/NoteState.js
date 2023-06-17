import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const noteInitial = [
    {
      _id: "6465c165cc05d0962042b65d",
      user: "6464b27de0cca457775a4324",
      title: "Hostel BH1",
      description: "Worst hostel",
      tag: "Trash , irresponsible staff",
      date: "2023-05-18T06:10:45.367Z",
      __v: 0,
    },
    {
      _id: "6465c165cc05d0962042b65d",
      user: "6464b27de0cca457775a4324",
      title: "Hostel BH1",
      description: "Worst hostel",
      tag: "Trash , irresponsible staff",
      date: "2023-05-18T06:10:45.367Z",
      __v: 0,
    }
  ];

  const [note, setNote] = useState(noteInitial)
  return (
    <NoteContext.Provider value={{note, setNote}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
