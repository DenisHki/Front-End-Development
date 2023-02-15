import React, {useState} from 'react';
import './App.css';

function App() {

  // Save values here:
  const [todo, setTodo] = useState({description: '', date: ''});

  // Save all todos here:
  const [todos, setTodos] = useState([]);

  // Save typed values to the states:
  const inputChanged = (e) => {
    setTodo({...todo, [e.target.name]: e.target.value});
  }

  // Add new todo at the beginning of the array
  const addTodo = () => {
    setTodos([todo, ...todos]);
    // Clear input fields:
    setTodo({description: '', date: ''});
  }

  const deleteTodo = (row) => {
    setTodos(todos.filter((todo, index) => index !== row));
  }

  return (
    <div className="App">
      <h1>Simple Todolist</h1>
      
      <input 
        placeholder='Description' name='description' 
        value={todo.description} onChange={inputChanged} />
      <input 
        placeholder='Date' name='date' 
        value={todo.date} onChange={inputChanged} />
      <button onClick={addTodo}>Add</button>
      <table>
        <tbody>
          {
            todos.map((todo, index) => 
            <tr key={index}>
            <td>{todo.date}</td>
            <td>{todo.description}</td>
            <td><button onClick={() => deleteTodo(index)}>Delete</button></td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;