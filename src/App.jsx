import { useState, useEffect } from 'react';
import './App.css';

//array of prompts 
const prompts = [
  "Write a story set on Mars.",
  "Describe a world where gravity is reversed.",
  "What if animals could talk?",
  "Invent a new holiday and explain how it's celebrated.",
  "Describe your ideal futuristic city.",
  "Imagine you wake up with a superpower. What is it?",
  "Create a dialogue between a ghost and a robot.",
  "Write a poem about time travel.",
  "Describe a day in the life of a pirate in space.",
  "What if dreams could be recorded and played back?"
];

function App() {
  const [timeLeft, setTimeLeft] = useState(10);
  const [prompt, setPrompt] = useState('');
  const [running, setRunning] = useState(false);

  //countdown timer
  useEffect(() => {
    let timer;
    if (running && timeLeft > 0) { //time greater than 0 continue count down
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000); //every second subtract one from timer 
    } else if (running && timeLeft === 0) { //time reaches 0
      setPrompt(''); //set prompt to blank
      setRunning(false); 
    }
    return () => clearTimeout(timer); //clean up timer
  }, [timeLeft, running]);

  // generate random prompt
  const generatePrompt = () => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    setPrompt(prompts[randomIndex]);
  };

  //start timer function
  const startTimer = () => {
    setTimeLeft(10);
    generatePrompt();
    setRunning(true);
  };

  return (
    <div className="App">
      <div className="timer">Time left: {timeLeft}s</div>
      <h1>Vibe Match</h1>
      <div className="prompt-box">{prompt}</div>
       <button onClick={startTimer}>
        {running ? "Running..." : "Start Round"}
      </button>
      <div className="spotify">
        <iframe 
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M" 
          width="300" 
          height="380" 
          frameBorder="0" 
          allowtransparency="true" 
          allow="encrypted-media">
        </iframe>
      </div>
    </div>
  );
}

export default App;
