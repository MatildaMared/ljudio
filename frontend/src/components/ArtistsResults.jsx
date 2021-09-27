import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { MusicContext } from "../context/MusicContext";
import ArtistsList from "./ArtistsList";

function ArtistsResults() {
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	const history = useHistory();
	function clickHandler(browseId) {
		history.push(`/artist/${browseId}`);
	}

	return (
		<section className="artists-results">
			<ArtistsList artists={musicContext.fetchResult.content} />
		</section>
	);
}

export default ArtistsResults;
