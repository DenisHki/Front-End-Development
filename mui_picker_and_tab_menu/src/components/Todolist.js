import React, {useState, useRef} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


function Todolist() {

  const [todo, setTodo] = useState({description: '', date: null, priority:''});
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  // Define the columns of the table in the AgGridReact component:
  const columns = [
    {field:'description', headerName: 'Description', sortable:true, filter: true, floatingFilter: true},
    {field:'date', headerName: 'Date', sortable:true, filter: true, floatingFilter: true, valueGetter: (params) => {
      // Convert the date object to string in the "DD.MM.YY" format
      return params.data.date ? params.data.date.format("DD.MM.YY") : "";
    }},
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

  // Change the date value
  const changeDate = (newDate) => {
    setTodo({ ...todo, date: newDate});
  }

  return (
    <div>
      
      <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
        <TextField 
          label='Description'
          name='description'
          variant='standard' 
          value={todo.description} 
          onChange={inputChanged} 
        />
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            format="DD.MM.YY"
            value={todo.date}
            onChange={changeDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <TextField 
          label='Priority'
          name='priority'
          variant='standard'   
          value={todo.priority} 
          onChange={inputChanged} 
        />

        <Button 
          variant="contained" 
          onClick={addTodo}>Add
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          onClick={deleteTodo}>Delete
        </Button>
      </Stack>
      <div
        className='ag-theme-material'
        style={{height: '700px', width: '50%', margin: 'auto'}}
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

export default Todolist;


