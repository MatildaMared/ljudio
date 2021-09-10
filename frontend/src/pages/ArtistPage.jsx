import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import Player from "../components/Player";
import { getArtistById, getSongsByString } from "../services/musicService";
import ResultList from '../components/ResultList';


const ArtistPage = () => {
	const [context, updateContext] = useContext(UserContext);
	const [artist, setArtist] = useState(null);
	const { browseId } = useParams();
	const [artistData, setArtistData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(async () => {
		getArtistData(browseId);
	}, []);

	async function getArtistData(browseId) {
		const data = await getArtistById(browseId);
		setArtistData(data);
		setArtist(data.name);
		setIsLoading(false);
	}

  async function getSong(songName) {
    // Make a fetch request to return 
    // an array of songs by a search string
		const data = await getSongsByString(songName);

    // Iterate over the array
		for (const song of data.content) {
      // If the artist name of the song is the same
      // as the current artist, update the context
      // and break out of the loop
			if (song.artist.name.toLowerCase() === artist.toLowerCase()) {
				updateContext({
					nowPlaying: song.videoId,
        });
        break;
			}
		}
	}

	function playSong(e) {
		getSong(e.target.dataset.name);
	}

	return (
		<div>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div>
					<h1>{artistData.name}</h1>
					<p>{artistData.description}</p>
					<ul>
						{artistData.products.songs.content.map((song) => (
							<li key={song.name} data-name={song.name} onClick={playSong}>
								{song.name}
							</li>
						))}
					</ul>
					<Player />
					<ResultList />
				</div>
			)}
		</div>
	);
};

export default ArtistPage;
