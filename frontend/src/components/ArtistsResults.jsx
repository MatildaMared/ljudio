import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { MusicContext } from "../context/MusicContext";

function ArtistsResults() {
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	const history = useHistory();
	function clickHandler (browseId) {
		history.push(`/artist/${browseId}`);
	}

	return (
		<section className="result">
			<h1>Artists</h1>
			<ul>
				{musicContext.fetchResult.content.map((item) => (
					<li onClick={() => clickHandler(item.browseId)} key={item.browseId} style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <p>{`${item.name}`}</p>
            <img src={item.thumbnails[0].url} alt={item.name}></img>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ArtistsResults;
