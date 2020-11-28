import React from "react";

const LibrarySong= ({song,songs,setCurrentSong,id,audioRef,isPlaying,setSongs}) =>{
    const selectSong = () =>{
        const selectedSong = songs.filter((state) => state.id ===id);
        setCurrentSong(selectedSong[0]);

        const newSongs = songs.map((song) =>{
            if(song.id ===id){
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

        
        if(isPlaying){

            const playPromise = audioRef.current.play();
            if(playPromise !== undefined){
                playPromise.then((audio)=>{ audioRef.current.play();});
            }
        }
    }
    return(

        <div onClick = {selectSong} className = {`library-song ${song.active ? 'selected' : ""}`}>
            <img alt={song} src={song.cover}></img>
            <div className = "song-info">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
                
            </div>
        </div>

    );
}

export default LibrarySong;