import { useState } from 'react';
import './App.css';

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
  const [prompt, setPrompt] = useState("Click the button to get a random prompt!");

  const generatePrompt = () => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    setPrompt(prompts[randomIndex]);
  };

  return (
    <div className="App">
      <h1>Vibe Match</h1>
      <div className="prompt-box">{prompt}</div>
      <button onClick={generatePrompt}>Generate Prompt</button>
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
