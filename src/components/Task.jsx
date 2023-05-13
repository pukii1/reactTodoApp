
import '../styles/Tasks.css';
import { useContext, useState } from "react";
import { TasksContext } from "../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faTrash, faCog, faPencilAlt } from '@fortawesome/free-solid-svg-icons';


import EditTask from './EditTask';
import AddNotes from './AddNotes';
import Note from './Note';

export default function Task({task, idx}) {
    const {title, descr, notes} = task;
    const {deleteTask, editTask, completeTask, addNotes, deleteNote} = useContext(TasksContext);
    const [editTaskFlag, setEditTaskFlag] = useState(false);
    //Flag to indicate if edit mode is available 
    //edit mode is disabled when task has been checked off
    const [editAvailable, setEditAvailable] = useState(true);
    const [notesFlag, setNotesFlag] = useState(false);
    const [showNotes, setShowNotesFlag] = useState(false);


    const editTaskHere = () => {
      console.log("enable edit")
      setEditTaskFlag(prevFlag => editAvailable && !prevFlag);
    }
    const disableEdit = ()=>{
      console.log("disabling edit")
      setEditTaskFlag(false);
    }
    const addNotesHere = ()=>{
      setNotesFlag(prevFlag => !prevFlag);
    }
    const disableNoteEdit = ()=>{
      setNotesFlag(false);
    }
  
    return (
    <div id="taskContainer" className="taskContainer">
            { !editTaskFlag && 
            <div className="task">
              <input type="checkbox" className="completedCheck" onClick={()=>{ setEditAvailable(prevFlag => !prevFlag); completeTask(idx)}}/>
              <div className="taskInfo">
                <p className="bold taskTitle">{title}</p>
                <p className="taskDescription">{descr}</p>
                {/*notes*/}
                {showNotes && typeof notes !== 'undefined' && notes.length > 0 && (
                  <div className="notesContainer">{notes.map((note, i) => 
                    <Note deleteNote={deleteNote} idx={i} taskIdx={idx} note={note} key={i}/>
                  )}</div>
                )}
              </div>
              
              <button className="btnDelete" onClick={()=> {deleteTask(idx)}}>
                  <FontAwesomeIcon className="icon" icon={faTrash} />
              </button>
              <button className="btnEditTitle" onClick={editTaskHere}>
                <FontAwesomeIcon className="icon" icon={faCog} />
              </button>
              
              <button className="btnEditNotes" onClick={addNotesHere}>
                <FontAwesomeIcon className="icon" icon={faPencilAlt} />
              </button>
              
            <button className="btnToggleNotes" onClick={()=>{setShowNotesFlag(prevFlag => !prevFlag)}}>
                  <FontAwesomeIcon className="icon" icon={showNotes ? faChevronUp :faChevronDown} />
                </button>
            </div>
            }
            {notesFlag && <AddNotes addNotes={addNotes} idx={idx} disableNoteEdit={disableNoteEdit}/>}
            {editTaskFlag && <EditTask editTask={editTask} idx={idx} disableEdit={disableEdit}/>}
            
            
    </div>
  )
}
