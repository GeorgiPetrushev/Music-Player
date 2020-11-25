import React from "react";

const LibrarySong= ({song}) =>{
    return(
        <div className = "library-song">
            <img alt={song} src={song.cover}></img>
            <div className = "song-info">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>

    );
}

export default LibrarySong;