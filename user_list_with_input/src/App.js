import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
  // Here we save user object from the response:
  const [user, setUser] = useState([]);
  // For saving value that user will type into the input field:
  const [userId, setUserId] = useState('');

  const fetchData = () => {
    fetch('https://reqres.in/api/users/' + userId)
    .then(response => {
      if (response.status !== 200) {
        throw new Error('Response status not ok');
      }

      return response.json();
    })
    .then(resData => setUser(resData.data))
    .catch(err => console.error(err))
  };

  const inputChanged = (event) => {
    setUserId(event.target.value);
  }

  return (
    <div className="App">
      <input placeholder='User ID' value={userId} onChange={inputChanged} />
      <button onClick={fetchData}>Fetch</button>
      <p>{user.first_name} {user.last_name} {user.email}</p>
    </div>
  );
}

export default App;
