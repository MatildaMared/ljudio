import React, { useContext, useState } from 'react';
import { MusicContext } from "./../context/MusicContext";

function QueuePage() {
    const [musicContext, updateMusicContext] = useContext(MusicContext);
    const musicQueue = musicContext.queue;
    const nowPlayingIndex = musicContext.nowPlayingIndex;
    const [list, setList] = useState(musicQueue);

    const handleDelete = (itemId) => {
        const newList = list.filter((item) => item.videoId !== itemId);

        setList(newList);
    }
 
    return (
        <section className="result">
			<h1>Queue</h1>
			<ul>    
                {
                    list.map((item, index) => {
                        if (index >= nowPlayingIndex) {
                            return (
                                <li key={`${item.videoId}`}>
                                {`${item.name} by ${item.artist.name}`}
                                <button className="buttons" onClick={() => handleDelete(item.videoId)}>Delete</button>
                                </li>
                            )
                        }
                    })
                }
			</ul>
		</section>
    )
}

export default QueuePage;
