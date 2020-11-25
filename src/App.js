import React,{useState} from 'react';
import Player from './components/Player';
import Song from "./components/Song";
import "./style/app.scss"
import chillHop from "./Songs-list";
import Library from "./components/Library"


function App() {
  //State
  const [songs,setSongs] = useState(chillHop());
  const[currentSong,setCurrentSong] = useState(songs[1]);
  const[isPlaying,setIsPlaying] = useState(false);
  return (
    <div className="App">
      <Song currentSong = {currentSong}/>
      <Player
        isPlaying = {isPlaying}
        setIsPlaying = {setIsPlaying} 
        currentSong = {currentSong}
      />
      <Library songs = {songs}/>
    </div>
  );
}

export default App;
