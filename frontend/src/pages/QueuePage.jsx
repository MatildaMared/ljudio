import React, { useContext } from 'react';
import { MusicContext } from "./../context/MusicContext";

function QueuePage() {
    const [musicContext, updateMusicContext] = useContext(MusicContext);
    const musicQueue = musicContext.queue;
    const nowPlayingIndex = musicContext.nowPlayingIndex;
    let items = [];

    console.log('nowPlayingindex: ', nowPlayingIndex);
    console.log('musicqueue: ', musicQueue);
    console.log('items before ', items);
 
    for (let i = nowPlayingIndex; i < (musicQueue - nowPlayingIndex); i++) {
        console.log('nowPlayingindex in loop: ', nowPlayingIndex);
        console.log('musicqueue in loop: ', musicQueue);
        items.push(<li key={nowPlayingIndex}>
            {musicQueue.name} by {musicQueue.artist.name}
        </li>) 
    }

    console.log('items after ', items);
 
    return (
        <section className="result">
			<h1>Queue</h1>
			<ul>           
                {items}
			</ul>
		</section>
    )
}

export default QueuePage;
