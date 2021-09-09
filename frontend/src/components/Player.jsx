import React, { useContext, useState } from "react";
import { UserContext } from "./../context/UserContext";
import YouTube from "react-youtube";

const Player = () => {
  const [context, updateContext] = useContext(UserContext);
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
		<div>
			<YouTube
				videoId={context.nowPlaying}
				opts={opts}
				onReady={videoOnReady}
				onStateChange={videoStateChange}
			/>
			<button onClick={isPlaying ? pause : play}>Play/Pause</button>
			<button onClick={volumeUp}>Volume Up</button>
			<button onClick={volumeDown}>Volume Down</button>
		</div>
	);
};

export default Player;
