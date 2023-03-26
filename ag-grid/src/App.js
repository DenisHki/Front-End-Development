import React, {useState, useRef} from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function App() {

  const [todo, setTodo] = useState({description: '', date: '', priority:''});
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  // Define the columns of the table in the AgGridReact component:
  const columns = [
    {field:'description', headerName: 'Description', sortable:true, filter: true, floatingFilter: true},
    {field:'date', headerName: 'Date', sortable:true, filter: true, floatingFilter: true},
    {field:'priority', headerName: 'Priority', sortable:true, filter: true, floatingFilter: true,
     cellStyle: params => params.value.toLowerCase() === "high" ? {color: 'red'} : {color: 'black'}
    },
  ]

  // Save typed values to the states:
  const inputChanged = (e) => {
    setTodo({...todo, [e.target.name]: e.target.value});
  }

  // Add new todo at the beginning of the array
  const addTodo = () => {
    setTodos([todo, ...todos]);
    // Clear input fields:
    setTodo({description: '', date: '', priority:''});
  }

  // Delete the row: 
  const deleteTodo = () => {
    // Check that the row selected to avoid error:
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todo, index) => 
        index != gridRef.current.getSelectedNodes()[0].id))
    }
    else {
      alert("Select row first");
    }
  }

  return (
    <div className="App">
      <h1>My Todolist</h1>
      
      <input 
        type='text' placeholder='Description' name='description' 
        value={todo.description} onChange={inputChanged} />
      <input 
        type='date' placeholder='Date' name='date' 
        value={todo.date} onChange={inputChanged} />
      <input 
        type='text' placeholder='Priority' name='priority' 
        value={todo.priority} onChange={inputChanged} />
      <button onClick={addTodo}>Add</button>
      <button onClick={deleteTodo}>Delete</button>
      
      <div
        className='ag-theme-material'
        style={{height: '700px', width: '80%', margin: 'auto'}}
      >
        <AgGridReact
          animateRows={true}
          ref={gridRef}
          onGridReady={params => gridRef.current = params.api}
          rowSelection='single' 
          columnDefs={columns}
          rowData={todos}
        >
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;


