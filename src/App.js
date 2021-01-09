import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [languageCode, setLanguageCode] = useState('tr')
  const [word, setWord] = useState('')
  const [root, setRoot] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function handleCodeChange(e) {
    setLanguageCode(e.target.value)
  }

  function handleWordChange(e) {
    setWord(e.target.value)
  }

  function handleCall() {
    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${languageCode}/${word}`)
    .then((response)=> {setRoot(response.data[0].meanings[0].definitions[0].definition);setErrorMessage('')})
    .catch((err) => {setErrorMessage('Kelime Bulunamadi')})
  }

  return (
    <div className="App">
      <label>language code:</label>          
      <select value={languageCode} onChange={handleCodeChange}>
            <option selected value="tr">Turkish</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
      </select>
      <br></br>
      <label>word:</label><input onChange={handleWordChange}></input>
      <br></br>
      <button onClick={handleCall}>Call definition</button>
      <h1>{root}</h1>
      <h1>{errorMessage}</h1>
    </div>
  );
}

export default App;
