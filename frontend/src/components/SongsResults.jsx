import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

function SongsResults() {
	const [context, updateContext] = useContext(UserContext);
	const searchResult = context.fetchResult;

	// musicContext.fetchResult.type => "songs"

	function clickHandler(e) {
		console.log(e.target.dataset.key);
		updateContext({
			nowPlaying: e.target.dataset.key,
		});
	}

	return (
		searchResult && (
			<ul>
				{searchResult.map((item) => (
					<li key={item.videoId} data-key={item.videoId} onClick={clickHandler}>
                        {`${item.name} by ${item.artist.name}`}
                        <button>Play Now</button>
                        <button>Queue Song</button>
					</li>
				))}
			</ul>
		)
	);
}

export default SongsResults;
