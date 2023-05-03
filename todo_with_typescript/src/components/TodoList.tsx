import React, { useState } from "react";
import TodoTable, { Todo } from "./TodoTable";

const TodoList: React.FC = () => {
  const [todo, setTodo] = useState<Todo>({ description: "", date: "", priority: "" });
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleAddTodo = () => {
    if (
      todo.description.trim() === "" ||
      todo.date.trim() === "" ||
      todo.priority.trim() === ""
    ) {
      window.alert("Please fill out all fields.");
    } else {
      const formattedDate = new Date(todo.date).toLocaleDateString("en-GB");
      setTodos([{ ...todo, date: formattedDate }, ...todos]);
      setTodo({ description: "", date: "", priority: "" });
    }
  };

  const handleDeleteTodo = (row: number) => {
    setTodos(todos.filter((todo, index) => index !== row));
  };

  return (
    <div>
      <input
        name="description"
        type='text'
        placeholder="Description"
        value={todo.description}
        onChange={handleInputChange}
      />
      <input
        name="date"
        type='date'
        placeholder="Date"
        value={todo.date}
        onChange={handleInputChange}
      />
      <input
        name="priority"
        type='text'
        placeholder="Priority"
        value={todo.priority}
        onChange={handleInputChange}
      />
      <button onClick={handleAddTodo}>Add new task</button>
      <TodoTable todos={todos} deleteTodo={handleDeleteTodo} />
    </div>
  );
};

export default TodoList;
