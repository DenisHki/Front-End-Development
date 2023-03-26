import './App.css';
import React, {useState, useEffect} from 'react';

function App() {

  const [explanation, setExplanation] = useState('');
  const [url, setUrl] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
    .then(response => response.json())
    .then(data => {
      setExplanation(data.explanation);
      setUrl(data.url);
      setMediaType(data.media_type);
      setReady(true);
    })
    .catch(err => console.log(err))
  }, [])

  if (!isReady) {
    return <div>Loading...</div>;
  }

  else if (mediaType === 'image') {
    return (
      <div>
        <p>Explanation: {explanation}</p>
        <img alt="Nasa APOD" src={url} style={{width:"60%"}}/>
      </div>
    );
  }

  else {
    return (
      <div>
        <p>Explanation: {explanation}</p>
        <iframe width="520" height="415" src={url} title="Nasa APOD"></iframe>
      </div>
    );
  }
  
}

export default App;
