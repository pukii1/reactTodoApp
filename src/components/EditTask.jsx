import React from 'react'
import '../styles/CustomForm.css';
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


export default function EditTask({editTask, idx, disableEdit}) {
  //initialize the input variables as containers for DOM elements
  //and make them mutable
  const editTitleInputRef = useRef(null);
  const editDescrInputRef = useRef(null);

  //Use effects
   useEffect(()=>{  
    editTitleInputRef.current = document.getElementById("newTaskTitle")
    editDescrInputRef.current = document.getElementById("newTaskDescr")
  },[])
    //States
  const [newTask, setNewTask] = useState({
    title: "",
    descr: ""
  });
    //Handlers
  const onChangeTaskTitle = (e)=> {
    e.preventDefault();
    setNewTask(
      (newTask) => ({...newTask, title: editTitleInputRef.current.value})
      );
  }
const onChangeTaskDescr = (e)=>{
  e.preventDefault();
  setNewTask(
    (newTask) => ({...newTask, descr: editDescrInputRef.current.value})
    );
}


const editSubmit = (e)=>{
  e.preventDefault();
  editTask(idx, newTask.title, newTask.descr); 
  disableEdit()
}

  return (
    <div>
        <form className="form bg-white" 
              onSubmit={editSubmit}>
      <div className="input-container">
        <input 
          className="inputField bg-blue-light"
          id="newTaskTitle" 
          type="text" 
          placeholder="Change the title of your task..."
          onChange={onChangeTaskTitle}/>
          
          <input 
          className="inputField bg-blue-light"
          id="newTaskDescr" 
          type="text" 
          placeholder="Change the description of your task..."
          onChange={onChangeTaskDescr}/>
      </div>
        
        <button className="btnSubmit bg-transparent txt-white bg-purple-light" type="submit">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </form>
    </div>
  )
}
