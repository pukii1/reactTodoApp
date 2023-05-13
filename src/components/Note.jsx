import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash} from '@fortawesome/free-solid-svg-icons';

export default function Note({deleteNote,note, idx, taskIdx}) {
  return (
    <div>
      <p className="taskNote">{note}</p>
      <button className="btnDelete" onClick={()=> {deleteNote(idx, taskIdx)}}>
                  <FontAwesomeIcon className="icon" icon={faTrash} />
        </button>
    </div>
  )
}
