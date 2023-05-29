import React from "react";

const NoteItem = (props) => {
  const { note } = props;
  return (
    <>
      <div className="" style={{display:'flex', flexDirection:'column'}}>
        {note.title}
        {note.description}
      </div>
    </>
  );
};

export default NoteItem;
