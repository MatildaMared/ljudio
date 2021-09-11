import React, { useContext, useEffect } from "react";
import { MusicContext } from "../context/MusicContext";
import AllResults from "./AllResults";
import SongsResults from "./SongsResults";

function Result() {
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	console.log(musicContext.resultType);

	return (
		<div className="result">
			{musicContext.isLoading && <h3>Loading...</h3>}
			{!musicContext.isLoading && musicContext.resultType === "all" && (
				<AllResults />
			)}
			{!musicContext.isLoading && musicContext.resultType === "songs" && (
				<SongsResults />
			)}
		</div>
	);
}

export default Result;
