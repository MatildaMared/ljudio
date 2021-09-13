import React, { useContext, useState } from "react";
import { MusicContext } from "./../context/MusicContext";
import YouTube from "react-youtube";
import { FaPlay, FaPause, FaVolumeDown, FaVolumeUp } from "react-icons/fa";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";

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

	function nextSong() {
		updateMusicContext({
			nowPlayingIndex:
				musicContext.nowPlayingIndex < musicContext.queue.length - 1
					? musicContext.nowPlayingIndex + 1
					: musicContext.nowPlayingIndex,
		});
	}

	function previousSong() {
		updateMusicContext({
			nowPlayingIndex:
				musicContext.nowPlayingIndex > 0 ? musicContext.nowPlayingIndex - 1 : 0,
		});
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
				videoId={musicContext.queue[musicContext.nowPlayingIndex]?.videoId}
				opts={opts}
				onReady={videoOnReady}
				onStateChange={videoStateChange}
			/>
			<article className="playButtons buttons">
				<button onClick={previousSong}>
					<MdSkipPrevious />
				</button>
				<button onClick={isPlaying ? pause : play}>
					<FaPlay /> <FaPause />
				</button>
				<button onClick={nextSong}>
					<MdSkipNext />
				</button>
			</article>
			<article className="volumeButtons buttons">
				<button onClick={volumeDown}>
					<FaVolumeDown />
				</button>
				<button onClick={volumeUp}>
					<FaVolumeUp />
				</button>
			</article>
		</section>
	);
};

export default Player;
