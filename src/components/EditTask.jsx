import React from 'react'
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




  return (
    <div>
        <form className="form editForm" onSubmit={(e)=>{e.preventDefault();editTask(idx, newTask.title, newTask.descr); disableEdit()}}>
      <div className="input-container">
        <input 
          className="inputField editInputField"
          id="newTaskTitle" 
          type="text" 
          placeholder="Change the title of your task..."
          onChange={onChangeTaskTitle}/>
          
          <input 
          className="inputField editInputField"
          id="newTaskDescr" 
          type="text" 
          placeholder="Change the description of your task..."
          onChange={onChangeTaskDescr}/>
      </div>
        
        <button className="btnSubmit btnEditSubmit" type="submit">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </form>
    </div>
  )
}
