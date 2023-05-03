import React from 'react';

export type Todo = {
  description: string;
  date: string;
  priority: string;
}

type TodoTableProps = {
  todos: Todo[];
  deleteTodo: (row: number) => void;
}

const TodoTable: React.FC<TodoTableProps> = ({ todos, deleteTodo }) => {
  return (
    <table style={{ margin: '0 auto' }}>
      <tbody>
        {todos.map((todo, index) => (
          <tr key={index}>
            <td>{todo.description}</td>
            <td>{todo.date}</td>
            <td>{todo.priority}</td>
            <td>
              <button onClick={() => deleteTodo(index)}>Done</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TodoTable;
