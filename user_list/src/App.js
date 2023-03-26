import './App.css';
import React, {useState, useEffect} from 'react';

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://reqres.in/api/users')
    .then(response => response.json())
    .then(resData => setUsers(resData.data))
    .catch(err => console.error(err))
  }, []);

  return (
    <div className="App">
      <table>
        <tbody>
          {
            users.map((user, index) => 
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td><img src={user.avatar} alt="User Avatar"/></td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
