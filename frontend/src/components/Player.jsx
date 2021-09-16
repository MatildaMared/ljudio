import React, { useContext, useState } from "react";
import { MusicContext } from "./../context/MusicContext";
import YouTube from "react-youtube";
import "./../../styles/SeekSlider.css";
import {
	FaPlay,
	FaPause,
	FaVolumeDown,
	FaVolumeUp,
	FaVolumeMute,
} from "react-icons/fa";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";

const Player = () => {
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	const [player, setPlayer] = useState(null);
	const [isPlaying, setIsPlaying] = useState(true);
	const [isMuted, setIsMuted] = useState(false);
	const [previousVolume, setPreviousVolume] = useState(100);
	const [videoTimer, setTimer] = useState(0);

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
		setTimer(setInterval(sliderUpdate, 1000));
	}

	function pause() {
		player.pauseVideo();
		setIsPlaying(false);
	}

	function volumeUp() {
		const currentVolume = player.getVolume();
		player.setVolume(currentVolume + 10);
		setPreviousVolume(player.getVolume());
		setIsMuted(false);
	}

	function volumeDown() {
		const currentVolume = player.getVolume();
		player.setVolume(currentVolume - 10);
		if (currentVolume <= 0) {
			setIsMuted(true);
		} else {
			setPreviousVolume(player.getVolume());
		}
	}

	// Mute/Unmute function
	function volumeMute() {
		if (isMuted) {
			player.setVolume(previousVolume);
			setIsMuted(false);
		} else {
			setPreviousVolume(player.getVolume());
			player.setVolume(0);
			setIsMuted(true);
		}
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

	function sliderUpdate(event) {
		if (player.getPlayerState() === 2) {
			clearInterval(videoTimer);
		} else if (player.getPlayerState() === 1) {
			let percentage = (player.getCurrentTime() / player.getDuration()) * 100;
			document.querySelector("#seek-slider span").style.width =
				percentage + "%";
		}
	}

	// Called when clicking on the video progressbar to change the current time
	function sliderClick(event) {
		player.seekTo(player.getDuration() * 0.95);
	}

	// Called when dragging the video progressbar to change the current time
	function sliderMove(event) {}

	// Called when the cursor hovers over the video progressbar
	function sliderHover(event) {
		document.querySelector("#seek-slider span").classList.add("hover");
	}

	// Called when the cursor unhovers the video progressbar
	function sliderUnhover(event) {
		document.querySelector("#seek-slider span").classList.remove("hover");
	}

	return (
		<section className="player">
				<header className="player__header">
					<span className="player__label">Now playing</span>
					<div className="player__artist-info">
						<h2 className="player__artist-name">{musicContext.nowPlaying?.artist.name}</h2>
						<h3 className="player__song-name">– {musicContext.nowPlaying?.name}</h3>
					</div>
				</header>
			<YouTube
				className="player__player"
				videoId={musicContext.queue[musicContext.nowPlayingIndex]?.videoId}
				opts={opts}
				onReady={videoOnReady}
				onStateChange={videoStateChange}
			/>
			<div className="buttons">
				<button onClick={isPlaying ? pause : play}>Play/Pause</button>
				<button onClick={volumeUp}>Volume Up</button>
				<button onClick={volumeDown}>Volume Down</button>
				<br></br>
				<div
					id="seek-slider"
					onClick={sliderClick}
					onMouseMove={sliderMove}
					onMouseOver={sliderHover}
					onMouseOut={sliderUnhover}>
					<span></span>
				</div>
			</div>
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
				<button onClick={volumeMute}>
					{isMuted === true ? <FaVolumeMute /> : <FaVolumeUp />}
				</button>
			</article>
		</section>
	);
};

export default Player;
