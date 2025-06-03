import { useState, useEffect } from 'react';
import axios from "axios";
import { loginUrl } from "./spotifyConfig";
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
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [tracks, setTracks] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [prompt, setPrompt] = useState('');
  const [running, setRunning] = useState(false);

 //count down timer
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

  //check for token in URL
  useEffect(() => {
    const hash = window.location.hash;
    let _token = window.localStorage.getItem("token");

    if (!_token && hash) {
      _token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", _token);
    }

    setToken(_token);
  }, []);

  const searchTracks = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "track"
      }
    });
    setTracks(data.tracks.items);
  };

  const renderTracks = () => {
    return tracks.map(track => (
      <div key={track.id} className="track">
        <img src={track.album.images[0]?.url} alt={track.name} />
        <p><strong>{track.name}</strong> - {track.artists[0].name}</p>
        {track.preview_url ? (
          <audio controls src={track.preview_url} />
        ) : (
          <p>No preview available</p>
        )}
      </div>
    ));
  };

  return (
    <div className="App">
      <div className="timer">Time left: {timeLeft}s</div>
      <h1>Vibe Match</h1>
      <div className="prompt-box">{prompt}</div>
       <button onClick={startTimer}>
        {running ? "Running..." : "Start Round"}
      </button>

      {!token ? (
        <a className="login-btn" href={loginUrl}>Login with Spotify</a>
      ) : (
        <form onSubmit={searchTracks}>
          <input
            type="text"
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="Search for a song"
          />
          <button type="submit">Search</button>
        </form>
      )}
      <div className="track-list">
        {renderTracks()}
      </div>
      {/* <div className="spotify">
        <iframe 
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M" 
          width="300" 
          height="380" 
          frameBorder="0" 
          allowtransparency="true" 
          allow="encrypted-media">
        </iframe>
      </div> */}
    </div>
  );
}

export default App;
