import React,{useState,useRef} from 'react';
import Player from './components/Player';
import Song from "./components/Song";
import "./style/app.scss"
import chillHop from "./Songs-list";
import Library from "./components/Library"
import Nav from './components/nav';


function App() {
   //Ref
   const audioRef = useRef(null);
  //State
  const [songs,setSongs] = useState(chillHop());
  const[currentSong,setCurrentSong] = useState(songs[0]);
  const[isPlaying,setIsPlaying] = useState(false);
  const [songInfo,setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  });
  const [libraryStatus,setLibraryStatus] = useState(false);


  const timeUpdate = (e) =>{
    const current = Math.floor(e.target.currentTime);
    const duration = Math.floor(e.target.duration);
    setSongInfo({
        ...songInfo,
        currentTime: current,
        duration: duration
    });
}


  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong = {currentSong}/>
      <Player
        audioRef = {audioRef}
        isPlaying = {isPlaying}
        setIsPlaying = {setIsPlaying} 
        currentSong = {currentSong}
        setCurrentSong = {setCurrentSong}
        setSongInfo = {setSongInfo}
        songInfo = {songInfo}
        songs = {songs}
        setSongs = {setSongs}
      />
      <Library 
        libraryStatus={libraryStatus}
        audioRef = {audioRef} 
        songs = {songs} 
        setCurrentSong = {setCurrentSong}
        isPlaying = {isPlaying}
        setSongs = {setSongs}
       />
      <audio 
                onLoadedMetadata = {timeUpdate}
                onTimeUpdate={timeUpdate}
                ref={audioRef} 
                src={currentSong.audio}
                
      ></audio>
    </div>
  );
}

export default App;
