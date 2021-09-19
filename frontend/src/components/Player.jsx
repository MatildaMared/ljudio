import React, { useContext, useState, useEffect } from "react";
import { MusicContext } from "./../context/MusicContext";
import YouTube from "react-youtube";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import {
	MdSkipPrevious,
	MdSkipNext,
	MdPlayArrow,
	MdPause,
	MdVolumeUp,
	MdVolumeDown,
	MdVolumeMute,
	MdVolumeOff,
} from "react-icons/md";

const Player = () => {
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	const [player, setPlayer] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [videoLength, setVideoLength] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [isMuted, setIsMuted] = useState(false);
	const [videoOn, setVideoOn] = useState(true);
	const [previousVolume, setPreviousVolume] = useState(100);
	// const [videoTimer, setTimer] = useState(0);
	const [artistName, setArtistName] = useState(null);
	const [songName, setSongName] = useState(null);
	let clearTimer;

	useEffect(() => {
		setArtistName(
			musicContext.queue[musicContext.nowPlayingIndex]?.artist.name
		);
		setSongName(musicContext.queue[musicContext.nowPlayingIndex]?.name);
	}, [musicContext.nowPlayingIndex]);

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

	function getTimeInMinutes(time) {
		const minutes = Math.floor(time / 60);
		const seconds = Math.round(time - minutes * 60);

		return `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`;
	}

	function videoOnReady(event) {
		setPlayer(event.target);
	}

	function toggleVideo() {
		setVideoOn(!videoOn);
	}

	function videoStateChange(event) {
		// console.log("Video state change", player);
	}

	function onVideoPlay() {
		setIsPlaying(true);
		setVideoLength(player.getDuration());
		clearTimer = setInterval(() => {
			setCurrentTime(player.getCurrentTime());
		}, 1000);
	}

	function onVideoPause() {
		clearTimer && clearTimer();
	}

	function play() {
		player.playVideo();
		setIsPlaying(true);
		// setTimer(setInterval(sliderUpdate, 1000));
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

	// function sliderUpdate(event) {
	// 	if (player.getPlayerState() === 2) {
	// 		clearInterval(videoTimer);
	// 	} else if (player.getPlayerState() === 1) {
	// 		let percentage = (player.getCurrentTime() / player.getDuration()) * 100;
	// 		document.querySelector("#seek-slider span").style.width =
	// 			percentage + "%";
	// 	}
	// }

	// Called when clicking on the video progressbar to change the current time
	// function sliderClick(event) {
	// 	player.seekTo(player.getDuration() * 0.95);
	// }

	// Called when dragging the video progressbar to change the current time
	// function sliderMove(event) {}

	// Called when the cursor hovers over the video progressbar
	// function sliderHover(event) {
	// 	document.querySelector("#seek-slider span").classList.add("hover");
	// }

	// Called when the cursor unhovers the video progressbar
	// function sliderUnhover(event) {
	// 	document.querySelector("#seek-slider span").classList.remove("hover");
	// }

	function onVideoEnd(event) {
		updateMusicContext({
			nowPlayingIndex: musicContext.nowPlayingIndex + 1,
		});
		clearTimer && clearTimer();
	}

	return (
		<section className="player">
			{/* Player Header - Where the artist and song name is displayed! */}
			<header className="player__header">
				<span className="player__label">Now playing</span>
				<div className="player__artist-info">
					<p className="player__artist-name">{artistName}</p>
					<p className="player__song-name">{songName}</p>
				</div>
			</header>
			{/* Player - Where the YouTube iframe is rendered */}
			<YouTube
				className={
					videoOn ? "player__player" : "player__player player__player--hide"
				}
				videoId={musicContext.queue[musicContext.nowPlayingIndex]?.videoId}
				opts={opts}
				onReady={videoOnReady}
				onStateChange={videoStateChange}
				onPlay={onVideoPlay}
				onEnd={onVideoEnd}
				onPause={onVideoPause}
			/>
			<div className="player__btns">
				{/* Volume Buttons */}
				<section className="player__volume-btns">
					{/* Volume Down */}
					<button onClick={volumeDown} className="player__btn">
						<MdVolumeDown className="player__icon" />
					</button>
					{/* Volume Mute Toggler */}
					<button onClick={volumeMute} className="player__btn">
						{isMuted === true ? (
							<MdVolumeMute className="player__icon" />
						) : (
							<MdVolumeOff className="player__icon" />
						)}
					</button>
					{/* Volume Up */}
					<button onClick={volumeUp} className="player__btn">
						<MdVolumeUp className="player__icon" />
					</button>
				</section>
				{/* Player Buttons */}
				<section className="player__player-btns">
					{/* Previous Song Button */}
					<button onClick={previousSong} className="player__btn">
						<MdSkipPrevious className="player__icon" />
					</button>
					{/* Play/Pause Button */}
					<button
						onClick={isPlaying ? pause : play}
						className="player__btn player__btn--gray">
						{isPlaying ? (
							<MdPause className="player__icon player__icon--pause" />
						) : (
							<MdPlayArrow className="player__icon player__icon--play" />
						)}
					</button>
					{/* Next Song Button */}
					<button onClick={nextSong} className="player__btn">
						<MdSkipNext className="player__icon" />
					</button>
				</section>
				{/* Video On/Off Toggler */}
				<button
					className="player__btn player__video-toggler"
					onClick={toggleVideo}>
					<p>{videoOn ? "Video on" : "Video off"}</p>
					{videoOn ? (
						<FaToggleOn className="player__icon player__icon--on" />
					) : (
						<FaToggleOff className="player__icon player__icon--off" />
					)}
				</button>
			</div>
			{/* Song Progress Bar */}
			<section className="player__progress">
				<span className="player__current-time">
					{getTimeInMinutes(currentTime)}
				</span>
				<input
					type="range"
					min="0"
					max={videoLength}
					value={currentTime}
					className="player__slider"
					id="myRange"
					onChange={(e) => {
						setCurrentTime(e.target.value);
						player.seekTo(e.target.value);
					}}
				/>
				<span className="player__remaining-time">
					{getTimeInMinutes(videoLength - currentTime)}
				</span>
			</section>
			<section className="player__next">
				<span className="player__label player__label--next">Next in queue</span>
				<div className="player__artist-info player__artist-info--next">
					<p className="player__artist-name player__artist-name--next">
						{musicContext.queue[musicContext.nowPlayingIndex + 1]?.artist.name}
					</p>
					<p className="player__song-name player__song-name--next">
						{musicContext.queue[musicContext.nowPlayingIndex + 1]?.name}
					</p>
				</div>
			</section>
			{/* <div
				id="seek-slider"
				onClick={sliderClick}
				onMouseMove={sliderMove}
				onMouseOver={sliderHover}
				onMouseOut={sliderUnhover}>
				<span></span>
			</div> */}
		</section>
	);
};

export default Player;
