import { useEffect, useState, useContext, useRef } from "react";
import { TasksContext } from "../App";
import '../styles/CustomForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Customform() {
    //Attributes
    const taskTitleInputRef = useRef(null);
    const taskTitleDescrRef = useRef(null);

    //States
    const [newTask, setNewTask] = useState({
      title: "",
      descr: ""
    });
    const {tasks, addTask} = useContext(TasksContext);

    //Use effects
    useEffect(()=>{
      taskTitleInputRef.current = document.getElementById("taskTitle");
      taskTitleDescrRef.current = document.getElementById("taskDescr");
    },[])
    //Debug effect to print updated tasks array
    useEffect(() => {
        printArr(tasks);
      }, [tasks]);


    //Helpers
    const printArr = (arr)=>{
        //console.log(`newTask: ${newTask} \n #tasks: ${state.tasks.length}`)
        let taskString = "";
        arr.forEach(element => taskString = taskString.concat(` ${element}`));
    }

    //Handlers
    const onChangeTaskTitle = (e)=> {
        e.preventDefault();
        setNewTask(
          (newTask) => ({...newTask, title: taskTitleInputRef.current.value})
          );
      }
    const onChangeTaskDescr = (e)=>{
      e.preventDefault();
      setNewTask(
        (newTask) => ({...newTask, descr: taskTitleDescrRef.current.value})
        );
    }

    const handleFormSubmit = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        //console.log("Form suubmit")
        //check if new task was entered
        if(newTask.title.length){
          //Pass new prop to parent component ("App")
          addTask(newTask);
          //Clear the input fields
          taskTitleDescrRef.current.value = "";
          taskTitleInputRef.current.value = "";
        }
    }


  return (
    <div>
      <form className="form" onSubmit={handleFormSubmit}>
      <div className="input-container">
        <input 
          className="inputField"
          id="taskTitle" 
          type="text" 
          placeholder="Enter a new task..."
          onChange={onChangeTaskTitle}/>
          
          <input 
          className="inputField"
          id="taskDescr" 
          type="text" 
          placeholder="Describe your task..."
          onChange={onChangeTaskDescr}/>
      </div>
        
        <button className="btnSubmit" type="submit"> 
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </form>
    </div>
  )
}
