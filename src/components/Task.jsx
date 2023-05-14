
import React from 'react'
import '../styles/Task.css';
import { useContext, useState } from "react";
import { TasksContext } from "../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faTrash, faCog, faPencilAlt } from '@fortawesome/free-solid-svg-icons';


import EditTask from './EditTask';
import AddNotes from './AddNotes';
import Note from './Note';

//edit context to disable note deletion when task is checked off
export const EditContext = React.createContext();

export default function Task({task, idx}) {

    const {title, descr, notes} = task;
    const {deleteTask, editTask, completeTask, addNotes, deleteNote} = useContext(TasksContext);
    const [editTaskFlag, setEditTaskFlag] = useState(false);
    //Flag to indicate if edit mode is available 
    //edit mode is disabled when task has been checked off
    const [editAvailable, setEditAvailable] = useState(true);
    const [notesFlag, setNotesFlag] = useState(false);
    const [showNotes, setShowNotesFlag] = useState(false);
    const [disableNotesFlag, setDisableNotesFlag] = useState(false);

    const editTaskHere = () => {
      console.log("enable edit")
      setEditTaskFlag(prevFlag => editAvailable && !prevFlag);
    }
    const disableEdit = ()=>{
      console.log("disabling edit")
      setEditTaskFlag(false);
    }
    const addNotesHere = ()=>{
      setNotesFlag(prevFlag => editAvailable && !prevFlag);
    }
    const disableNoteEdit = ()=>{
      setNotesFlag(false);
    }
    
    return (
    <div id="taskContainer" className="taskContainer">
            { !editTaskFlag && 
            <div className="task">
              <input type="checkbox" className="completedCheck" onClick={()=>{ setEditAvailable(prevFlag => !prevFlag); setDisableNotesFlag(prevFlag => !prevFlag); completeTask(idx)}}/>
              <div className="taskInfo">
                <p className="bold taskTitle">{title}</p>
                <p className="taskDescription">{descr}</p>
                <EditContext.Provider value={{ disableNotesFlag: disableNotesFlag}}>
                {/*notes*/}
                {showNotes && typeof notes !== 'undefined' && notes.length > 0 && (
                  <div className="notesContainer">{notes.map((note, i) => 
                    <Note deleteNote={deleteNote} idx={i} taskIdx={idx} note={note} key={i}/>
                  )}</div>
                )}
              </EditContext.Provider>
              </div>
              
              <button className="bg-transparent btnDelete" onClick={()=> {deleteTask(idx)}}>
                  <FontAwesomeIcon className="bg-transparent icon" icon={faTrash} />
              </button>
              <button className="bg-transparent btnEditTitle" onClick={editTaskHere}>
                <FontAwesomeIcon className="bg-transparent icon" icon={faCog} />
              </button>
              
              <button className="bg-transparent btnEditNotes" onClick={addNotesHere}>
                <FontAwesomeIcon className="bg-transparent icon" icon={faPencilAlt} />
              </button>
              
            <button className="bg-transparent btnToggleNotes" onClick={()=>{setShowNotesFlag(prevFlag => editAvailable && !prevFlag)}}>
                  <FontAwesomeIcon className="bg-transparent icon" icon={showNotes ? faChevronUp :faChevronDown} />
                </button>
            </div>
            }
            {notesFlag && <AddNotes addNotes={addNotes} idx={idx} disableNoteEdit={disableNoteEdit}/>}
            {editTaskFlag && <EditTask editTask={editTask} idx={idx} disableEdit={disableEdit}/>}
            
            
    </div>
  )
}
