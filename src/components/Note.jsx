import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes} from '@fortawesome/free-solid-svg-icons';

export default function Note({deleteNote,note, idx, taskIdx}) {
  return (
    <div className="noteContainer">
      <p className="taskNote">
        {note}
      </p>
      <button className="btnDeleteNote inline" onClick={()=> {deleteNote(idx, taskIdx)}}>
                  <FontAwesomeIcon className="icon" icon={faTimes} />
        </button>
    </div>
  )
}
