import React from 'react'
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function AddNotes({addNotes, idx, disableNoteEdit}) {
    const [note, setNote] = useState("")
    //ref to notes input field
    //useRef to make it mutable so that the onChange event handler doesnt bind to the 
    //undefined input field before the useEffect callback has exec
    const taskNotesInputRef = useRef(null);
    //init notes input field ref on render
    useEffect(()=>{
      taskNotesInputRef.current = document.getElementById("notesInput")
    },[])

    const onChangeNote = (e)=> {
        e.preventDefault();
        setNote(taskNotesInputRef.current.value);
      }
  
    return (
        <div>
        <form className="form editForm" onSubmit={(e)=>{e.preventDefault();addNotes(idx,note); disableNoteEdit()}}>
      <div className="input-container">
        <input 
          className="inputField editInputField"
          id="notesInput" 
          type="text" 
          placeholder="Add some notes to your task..."
          onChange={onChangeNote}/>
      </div>
        
        <button className="btnSubmit btnNoteSubmit" type="submit">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </form>
    </div>
  )
}
