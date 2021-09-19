import React, { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import AllResults from "./AllResults";
import SongsResults from "./SongsResults";
import ArtistsResults from './ArtistsResults';
import PlaylistsResults from './PlaylistsResults';

function Result() {
	const [musicContext, updateMusicContext] = useContext(MusicContext);

	return (
		<div>
			{musicContext.isLoading && <h3>Loading...</h3>}
			{!musicContext.isLoading && musicContext.resultType === "all" && (
				<AllResults />
			)}
			{!musicContext.isLoading && musicContext.resultType === "songs" && (
				<SongsResults />
			)}
			{!musicContext.isLoading && musicContext.resultType === "artists" && (
				<ArtistsResults />
			)}
			{!musicContext.isLoading && musicContext.resultType === "playlists" && (
				<PlaylistsResults />
			)}
		</div>
	);
}

export default Result;
