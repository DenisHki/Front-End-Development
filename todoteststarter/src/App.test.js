import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoTable from './TodoTable';
import App from './App';
import React from 'react';

// Test 1:
test('renders todotable', () => {
  const row = [
    {desc: 'Go to coffee', date: '24.01.2021'}
  ];
  render(<TodoTable todos={row} />);

  const tablecell = screen.getByText(/go to coffee/i);
  expect(tablecell).toBeInTheDocument();
});

// Test 2:
test('add todo', () => {
  render(<App />);

  const desc = screen.getByPlaceholderText('Description');
  fireEvent.change(desc, {target: {value: 'Go to coffee'}});
  const date = screen.getByPlaceholderText('Date');
  fireEvent.change(date, {target: {value: '29.01.2021'}});
  
  const addButton = screen.getByText('Add');
  fireEvent.click(addButton);

  const tablecell = screen.getByText(/go to coffee/i);
  expect(tablecell).toBeInTheDocument();

})

// Test 3:
test('clear todos', () => {
  render(<App/>);

  const desc = screen.getByPlaceholderText('Description');
  fireEvent.change(desc, {target: {value: 'Go to coffee'}});
  const date = screen.getByPlaceholderText('Date');
  fireEvent.change(date, {target: {value: '12.04.2023'}});

  const addButton = screen.getByText('Add');
  fireEvent.click(addButton);

  const tableCell = screen.getByText(/go to coffee/i);
  expect(tableCell).toBeInTheDocument();

  const clearButton = screen.getByText('Clear');
  fireEvent.click(clearButton); 

  const tableCells = screen.queryByText(/go to coffee/i);
  expect(tableCells).not.toBeInTheDocument();
})

