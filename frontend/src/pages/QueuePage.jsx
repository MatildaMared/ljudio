import React, { useContext } from 'react';
import { MusicContext } from "./../context/MusicContext";

function QueuePage() {
    const [musicContext, updateMusicContext] = useContext(MusicContext);
    const musicQueue = musicContext.queue;

    console.log(musicQueue);
    
    return (
        <section className="result">
			<h1>Queue</h1>
			<ul>
				{musicQueue.map((item) => (
					<li key={item.videoId}>
						{`${item.name} by ${item.artist.name}`}
					</li>
				))}
			</ul>
		</section>
    )
}

export default QueuePage;
