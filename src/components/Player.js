import React,{useRef,useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleDoubleRight , faAngleDoubleLeft,faPause} from '@fortawesome/free-solid-svg-icons';

const Player = ({currentSong,isPlaying,setIsPlaying}) =>{
    //Ref
    const audioRef = useRef(null);
    const [songInfo,setSongInfo] = useState({
        currentTime: 0,
        duration: 0
    });

    //Function

    let playSong = () =>{
        if(isPlaying){
            audioRef.current.pause();
            currentSong.active = false;
            setIsPlaying(currentSong.active);
        }else{
            audioRef.current.play();
            currentSong.active = true;
            setIsPlaying(currentSong.active);
        }
    }

    const timeUpdate = (e) =>{
        const current = Math.floor(e.target.currentTime);
        const duration = Math.floor(e.target.duration);
        setSongInfo({
            ...songInfo,
            currentTime: current,
            duration: duration
        });
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
            <audio 
            onLoadedMetadata = {timeUpdate}
            onTimeUpdate={timeUpdate}
            ref={audioRef} 
            src={currentSong.audio}></audio>
        </div>

    );
}

export default Player;