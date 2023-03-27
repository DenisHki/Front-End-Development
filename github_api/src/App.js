import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [reposits, setReposit] = React.useState([]);
  const [isReady, setReady] = React.useState(false);
  
  React.useEffect(() => {
    fetch('https://api.github.com/search/repositories?q=react') 
    .then(response => response.json())
    .then(responseData => {
      setReposit(responseData.items);
      setReady(true);
  })
  .catch(err => console.log(err))
  },[]);

  if (!isReady) {
    return <div>Loading...</div>;
  }

  // Table to render repositories:
  else {
    return(
      <div className="App">
        <h1>Repositories</h1>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>URL</th>
            </tr>
            {
              reposits.map((item, index) =>
              <tr key={index}>
                <td>{item.full_name}</td>
                <td><a href={item.html_url}>{item.html_url}</a></td>
              </tr>
            )
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
