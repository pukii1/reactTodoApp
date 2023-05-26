import React from 'react'
import '../styles/CustomForm.css';

import {useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes} from '@fortawesome/free-solid-svg-icons';
import { EditContext } from './Task';


export default function Note({deleteNote, note, idx, taskIdx}) {
  //Edit context constant
  const {disableNotesFlag} = useContext(EditContext);

  return (
    <div className="noteContainer">
      <p className="taskNote">
        {note}
      </p>
      <button className="btnDeleteNote inline" onClick={()=> {
        console.log("DisableNotesFlag " + disableNotesFlag)
        if(!disableNotesFlag){
          deleteNote(idx, taskIdx)}
        }}>
                  <FontAwesomeIcon className="bg-transparent icon" icon={faTimes} />
        </button>
    </div>
  )
}
