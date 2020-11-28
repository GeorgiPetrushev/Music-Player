import React, {useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleDoubleRight , faAngleDoubleLeft,faPause} from '@fortawesome/free-solid-svg-icons';

const Player = ({setSongs,audioRef,currentSong,isPlaying,setIsPlaying,setSongInfo,songInfo,songs,setCurrentSong}) =>{


    useEffect(()=>{
        const newSongs = songs.map((song) =>{
            if(song.id === currentSong.id){
                return{
                    ...song,
                    active: true,
                }
            }else{
                return{
                    ...song,
                    active:false,
                }
            }
        });
        setSongs(newSongs);
    },[currentSong])

    //Function

    const playSong = () =>{
        
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
            
        }else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };


    const convertTime = (time) =>{
        return Math.floor(time / 60) + ":" + ("0" + Math.floor(time%60)).slice(-2)
    };

    const changeTime = (e) =>{
        audioRef.current.currentTime =e.target.value;
        setSongInfo({...songInfo,currentTime : e.target.value});
    };

    const skipSong = (direction) => {
        let currentIndex = songs.findIndex((song)=>song.id === currentSong.id);
        if(direction ==='skip-forward'){
            setCurrentSong(songs[(currentIndex+1)%songs.length]);
        }else{console.log(currentIndex);
            if(currentIndex < 1){
                setCurrentSong(songs[songs.length-1]);
            }else{
            setCurrentSong(songs[currentIndex-1]);
            }
        }
        if(isPlaying){

            const playPromise = audioRef.current.play();
            if(playPromise !== undefined){
                playPromise.then((audio)=>{ audioRef.current.play();});
            }
        }
    };

    

    return(
        <div className = "player">
            <div className = "time-control">
                <p>{convertTime(songInfo.currentTime)}</p>
                <input
                    onChange = {changeTime}
                    type = 'range' 
                    min = {0} 
                    max = {songInfo.duration || 0} 
                    value ={songInfo.currentTime} 
                ></input>
                <p>{convertTime(songInfo.duration || 0)}</p>
            </div>
            <div className = "play-control">
            <FontAwesomeIcon onClick={()=>skipSong('skip-back')} className = 'skip-back' icon = {faAngleDoubleLeft} size = '2x' />
            <FontAwesomeIcon onClick = {playSong} className = 'play' icon = {isPlaying ?  faPause : faPlay}  size = '2x'/>
            <FontAwesomeIcon onClick={()=>skipSong('skip-forward')} className = 'skip-forward' icon = {faAngleDoubleRight} size = '2x'/>

            </div>

        </div>

    );
}

export default Player;