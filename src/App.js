import React, {useState, useEffect} from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';

function App() {
  const [isCompletedScreen,setIsCompletedScreen] =useState(false);
  const [allTodos,setTodos] =useState([]);
  const [newTitle,setNewTitle] =useState("");
  const [newDescription,setNewDescripiton] =useState("");
  const [CompletedTodos,setCompletedTodos]= useState([]);
  
  
  const handleAddTodo=()=>{
    let newTodoItem = {
      title:newTitle,
      description: newDescription
    }
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolistsdata',JSON.stringify(updatedTodoArr));
  }
  // delete from todo list
  const handleDeleteTodo =(index)=>{
    let reducedtTodo = [...allTodos];
    reducedtTodo.splice(index,1);  /* splice position and number of elemet to be deleted*/
    localStorage.setItem('todolistsdata',JSON.stringify(reducedtTodo));
    setTodos(reducedtTodo);

  }
  // delete from completed todo list
  const handleDeleteCompletedTodo= (index)=>{
    let reducedcompletedTodo = [...CompletedTodos];
    reducedcompletedTodo.splice(index,1);
    localStorage.setItem('completedtodolistsdata',JSON.stringify(reducedcompletedTodo));
    setCompletedTodos(reducedcompletedTodo);
  }

  const handleComplete =(index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth()+1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm +'-' +yyyy + 'at' + h+ ':' +m+':'+s;
    
    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    }
    let updatedCompletedArr = [...CompletedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedtodolistsdata',JSON.stringify(updatedCompletedArr));
  }

  useEffect(()=>{
    console.log(localStorage.getItem('todolistsdata'));
    let savedTodos = JSON.parse(localStorage.getItem('todolistsdata'));
    let savedCompletedtodo = JSON.parse(localStorage.getItem('completedtodolistsdata'));
    if(savedTodos)
    {
      setTodos(savedTodos);
    }
    if(savedCompletedtodo)
    {
      setCompletedTodos(savedCompletedtodo);
    }
  },[])

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className ='todo-wrapper'>
        <div className="todo-input">
          <div className="todo-input-item">
            <label >Title</label>
          
            <input 
              type="text" 
              value={newTitle} 
              onChange={(Event)=>
              setNewTitle(Event.target.value)} 
              placeholder = "what's the tast title?" 
            />
          
          </div>
          <div className="todo-input-item">
            <label>Desciptions</label>
            
            <input 
              type="text" 
              value={newDescription} 
              onChange={(Event)=>setNewDescripiton(Event.target.value)} 
              placeholder="What's the tast description?"
            />

          </div>
          <div className="todo-input-item">
            <button 
              type ="button"  
              onClick={handleAddTodo} 
              className="primary-btn"
            >
              Add
            </button>
          </div>
        </div>

          {/* to do list start  different sheet*/}
        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompletedScreen === false && 'active'}`} 
          onClick={()=>setIsCompletedScreen(false)}
          >
            Todo
          </button>
          <button className={`secondaryBtn ${isCompletedScreen === true && 'active'}`} 
          onClick={()=>setIsCompletedScreen(true)}
          >
            Completed
          </button>
        </div>
        
        <div className="todo-list">
          { isCompletedScreen=== false && allTodos.map ((item,index)=>{
            return(
            <div className ="todo-list-item" key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>  
              </div>
              <div>
                <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index)}  title='Delete?'/>
                <BsCheckLg className="check-icon" onClick={()=>handleComplete(index)} title='Completed?'/>
              </div>  
            </div>
            )
          })}
        </div>
      <div className="todo-list">
          { isCompletedScreen=== true && CompletedTodos.map ((item,index)=>{
            return(
            <div className ="todo-list-item" key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>  
                <p><small>Completed on: {item.completedOn} </small></p>
              </div>
              <div>
                <AiOutlineDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)}  title='Delete?'/>
                
              </div>  
            </div>
            )
          })}
          
          
          
        </div>
      </div>
    </div>
  );
}

export default App;
