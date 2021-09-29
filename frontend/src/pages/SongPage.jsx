import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
	decodeBtoaString,
	getArtistNameFromSongObj,
	getThumbNailUrlFromSongObj,
} from "../utilities/musicUtils";
import { getSongsByString } from "../services/musicService";
import PlaySongBtn from "../components/PlaySongBtn";
import AddToPlayQueue from "../components/AddToPlayQueue";
import AddToPlaylist from "../components/AddToPlaylist";
import ShareLinkBtn from "../components/ShareLinkBtn";

function SongPage() {
	const [songData, setSongData] = useState(null);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const { btoaString } = useParams();
	const searchString = decodeBtoaString(btoaString);

	useEffect(() => {
		getSongData();
	}, []);

	async function getSongData() {
		const data = await getSongsByString(searchString);
		if (!data) {
			setIsError(true);
			setIsLoading(false);
			return;
		}
		if (data.content[0]) {
			setSongData(data.content[0]);
			setIsLoading(false);
		}
	}

	return (
		<section className="song">
			{isError && (
				<h2 className="song__error">
					Could not find song... Please go back and try again.
				</h2>
			)}
			{isLoading && <h2 className="song__loading">Loading...</h2>}
			{!isLoading && !isError && (
				<>
					<h1 className="song__heading">Song</h1>
					<ShareLinkBtn />
					<article className="song__item">
						<img
							src={getThumbNailUrlFromSongObj(songData)}
							alt="Album cover image"
							className="song__thumbnail"
						/>
						<div className="song__info">
							<p className="song__artist">
								{getArtistNameFromSongObj(songData)}
							</p>
							<p className="song__title">{songData.name}</p>
						</div>
						<div className="song__btns">
							<PlaySongBtn item={songData} />
							<AddToPlayQueue item={songData} />
							<AddToPlaylist item={songData} />
						</div>
					</article>
				</>
			)}
		</section>
	);
}

export default SongPage;
