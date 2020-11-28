import React,{useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleDoubleRight , faAngleDoubleLeft,faPause} from '@fortawesome/free-solid-svg-icons';

const Player = ({audioRef,currentSong,isPlaying,setIsPlaying,setSongInfo,songInfo}) =>{




    //Function

    const playSong = () =>{
        console.log(isPlaying);
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
            
        }else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }


    const convertTime = (time) =>{
        return Math.floor(time / 60) + ":" + ("0" + Math.floor(time%60)).slice(-2)
    }

    const changeTime = (e) =>{
        audioRef.current.currentTime =e.target.value;
        setSongInfo({...songInfo,currentTime : e.target.value});
    }

    

    return(
        <div className = "player">
            <div className = "time-control">
                <p>{convertTime(songInfo.currentTime)}</p>
                <input
                    onChange = {changeTime}
                    type = 'range' 
                    min = {0} 
                    max = {songInfo.duration} 
                    value ={songInfo.currentTime} 
                ></input>
                <p>{convertTime(songInfo.duration)}</p>
            </div>
            <div className = "play-control">
            <FontAwesomeIcon className = 'skip-back' icon = {faAngleDoubleLeft} size = '2x' />
            <FontAwesomeIcon onClick = {playSong} className = 'play' icon = {isPlaying ?  faPause : faPlay}  size = '2x'/>
            <FontAwesomeIcon className = 'skip-forward' icon = {faAngleDoubleRight} size = '2x'/>

            </div>

        </div>

    );
}

export default Player;