import React, { useContext, useState } from "react";
import { MusicContext } from "./../context/MusicContext";
import YouTube from "react-youtube";

const Player = () => {
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	const [player, setPlayer] = useState(null);
	const [isPlaying, setIsPlaying] = useState(true);

	const opts = {
		height: "390",
		width: "640",
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
			controls: 0,
			fs: 0,
			rel: 0,
			modestbranding: 1,
		},
	};

	function videoOnReady(event) {
		setPlayer(event.target);
	}

	function videoStateChange(event) {
		console.log(player);
	}

	function play() {
		player.playVideo();
		setIsPlaying(true);
	}

	function pause() {
		player.pauseVideo();
		setIsPlaying(false);
	}

	function volumeUp() {
		const currentVolume = player.getVolume();
		player.setVolume(currentVolume + 10);
		console.log(player.getVolume());
	}

	function volumeDown() {
		const currentVolume = player.getVolume();
		player.setVolume(currentVolume - 10);
		console.log(player.getVolume());
	}

	return (
		<section className="player">
			{musicContext.nowPlaying && (
				<div className="player__header">
					<h2>{musicContext.nowPlaying?.artist.name}</h2>
					<h3>{musicContext.nowPlaying?.name}</h3>
				</div>
			)}
			<YouTube
				className="youtube-player"
				videoId={musicContext.nowPlaying?.videoId}
				opts={opts}
				onReady={videoOnReady}
				onStateChange={videoStateChange}
			/>
			<button onClick={isPlaying ? pause : play}>Play/Pause</button>
			<button onClick={volumeUp}>Volume Up</button>
			<button onClick={volumeDown}>Volume Down</button>
		</section>
	);
};

export default Player;
