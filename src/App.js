
import React from 'react';
import './styles/App.css';
import { useEffect, useState } from 'react';
import Customform from './components/Customform';
import Task from './components/Task';

export const TasksContext = React.createContext();
function App() {
  //Attributes
  const [state, setState] = useState({ tasks : [], completedTasks : []});
  //Export context to allow context provider to access it

  //Handlers
  const addTask = (newTask)=>{
    setState(prevState => ({
      ...prevState,
      tasks: prevState.tasks.length
        ? [...prevState.tasks, newTask]
        : [newTask]
            }));
  }
  const deleteTask = (taskIdx)=> {
    //validate task index
    if(taskIdx >= 0 && taskIdx < state.tasks.length){
      //Remove element at taskIdx from tasks array and update state
      setState(prevState => ({
        ...prevState,
      tasks: prevState.tasks.filter((_, index)=>{return index != taskIdx})
      }));
    }
  }


 
  const editTask = (taskIdx, newTitle, newDescr) =>{
    //validate task index
    console.log(`${newTitle} ${newDescr}`)
    if(taskIdx >= 0 && taskIdx < state.tasks.length){
      //flag to check if task info was updated
      let updated = false;
      //Remove element at taskIdx from tasks array and update state
      let updatedTask = state.tasks[taskIdx];
      if(newTitle.length){
        updated = true;
        updatedTask.title = newTitle;
      }
      if(newDescr.length){
        updated = true;
        updatedTask.descr = newDescr;
      }
      //update task in state if task info was updated
      if(updated){
        setState(prevState => ({
          ...prevState,
          tasks: [...prevState.tasks.slice(0,taskIdx), updatedTask, ...prevState.tasks.slice(taskIdx+1)]
            }));
      }
      
    }
  }
  //Adds notes to task #idx
  const addNotes = (taskIdx, notes) => {
    if (taskIdx >= 0 && taskIdx < state.tasks.length && notes.length) {
      setState(prevState => {
        const updatedTasks = [...prevState.tasks];
        const updatedTask = { ...updatedTasks[taskIdx] };
  
        if (typeof updatedTask.notes !== 'undefined') {
          updatedTask.notes.push(notes);
        } else {
          updatedTask.notes = [notes];
        }
  
        updatedTasks[taskIdx] = updatedTask;
  
        return {
          ...prevState,
          tasks: updatedTasks
        };
      });
    }
  };

  const deleteNote =(noteIdx, taskIdx)=>{
    //console.log("deleting note " + state.tasks[taskIdx].notes[noteIdx] + " from task " + state.tasks[taskIdx])
    if (noteIdx >= 0 && taskIdx < state.tasks.length && noteIdx < state.tasks[taskIdx].notes.length) {
      setState(prevState => {
        const updatedTasks = [...prevState.tasks];
        const updatedTask = { ...updatedTasks[taskIdx] };
        //delete note at noteIdx from task #taskIdx
        if (typeof updatedTask.notes !== 'undefined') {
          updatedTask.notes = updatedTask.notes.filter((_, index)=>{return index != noteIdx})
        } 
        updatedTasks[taskIdx] = updatedTask;
  
        return {
          ...prevState,
          tasks: updatedTasks
        };
      });
      console.log(noteIdx + " " + state.tasks[taskIdx])
    }
  }


  const completeTask = (taskIdx) =>{
    //validate task index
    if(taskIdx >= 0 && taskIdx < state.tasks.length){
      //Remove element at taskIdx from tasks array and update state
      setState(prevState => ({
      ...prevState,
        completedTasks: prevState.completedTasks.length
          ? [...prevState.completedTasks, prevState.tasks[taskIdx]]
          : [prevState.tasks[taskIdx]]
        }));
    }
  }
  //Debugs
  useEffect(()=>{
  console.log(state.tasks)
  }, [state.tasks]);


  
  return (
    <TasksContext.Provider value={{ tasks: state.tasks, 
    addTask: addTask, 
    editTask: editTask, 
    deleteTask: deleteTask, 
    completeTask: completeTask,
    addNotes: addNotes,
    deleteNote: deleteNote
    }}>
      <div className="app">
        <h1 className="appTitle">Todo App</h1>
        <Customform/>
        { state.tasks.length ? <div className="tasksContainer">
          {state.tasks.map( (t,i) => <Task key={i} idx={i} task={t}></Task>)}
        </div> : <p className="tasksPlaceHolder">Wow... such empty....</p> }
        

        {/*{state.completedTasks.map( (t,i) => <p key={i}>{t}</p>)}*/}

      </div>
    </TasksContext.Provider>
  );
}

export default App;
