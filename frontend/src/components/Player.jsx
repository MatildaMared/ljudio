import React, { useContext, useState, useEffect, useRef } from "react";
import { MusicContext } from "./../context/MusicContext";
import YouTube from "react-youtube";
import { getArtistNameFromSongObj } from "./../utilities/musicUtils";
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
	const [volumeMessage, setVolumeMessage] = useState("");
	const volumeMessageRef = useRef();
	const [isMuted, setIsMuted] = useState(false);
	const [videoOn, setVideoOn] = useState(true);
	const [previousVolume, setPreviousVolume] = useState(100);
	// const [videoTimer, setTimer] = useState(0);
	const [artistName, setArtistName] = useState(null);
	const [nextArtistName, setNextArtistName] = useState(null);
	const [songName, setSongName] = useState(null);
	const [nextSongName, setNextSongName] = useState(null);
	let clearTimer;
	let volumeMessageTimeout;
	const queue = musicContext.queue;
	const nowPlayingIndex = musicContext.nowPlayingIndex;

	// Will play song from beginning if 
	// replacing an old queue with a new one
	// to make sure that the video begins playing
	// at 00:00 even if it's the same video that was
	// playing when user replaced the old queue
	useEffect(() => {
		if (musicContext.resetPlayer === true) {
			player.seekTo(0);
		}
		updateMusicContext({
			resetPlayer: false,
		});
	}, [musicContext.queue]);

	// Updates variables about current and next song & artist,
	// every time the nowPlayingIndex changes
	useEffect(() => {
		if (nowPlayingIndex !== null) {
			setArtistName(getArtistNameFromSongObj(queue[nowPlayingIndex]));
			setSongName(queue[nowPlayingIndex]?.name);

			if (queue[nowPlayingIndex + 1]) {
				setNextArtistName(getArtistNameFromSongObj(queue[nowPlayingIndex + 1]));
				setNextSongName(queue[nowPlayingIndex + 1]?.name);
			}
		}
	}, [musicContext.nowPlayingIndex]);

	useEffect(() => {
		if (volumeMessage.length > 0) {
			displayVolumeMessage();
		}
	}, [volumeMessage]);

	function displayVolumeMessage() {
		volumeMessageRef.current.className = "player__volume-message";
		volumeMessageTimeout = setTimeout(() => {
			volumeMessageRef.current.className =
				"player__volume-message player__volume-message--hide";
		}, 1500);
	}

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

		return `${minutes.toString().padStart(2, 0)}:${seconds
			.toString()
			.padStart(2, 0)}`;
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
		clearTimeout(volumeMessageTimeout);
		const currentVolume = player.getVolume();
		player.setVolume(currentVolume + 10);
		setPreviousVolume(player.getVolume());
		setIsMuted(false);
		if (currentVolume === 100 || currentVolume + 10 === 100) {
			setVolumeMessage(`Volume max`);
		} else {
			setVolumeMessage(`Volume: ${currentVolume + 10}`);
		}
	}

	function volumeDown() {
		clearTimeout(volumeMessageTimeout);
		const currentVolume = player.getVolume();
		player.setVolume(currentVolume - 10);
		if (currentVolume <= 0 || currentVolume - 10 <= 0) {
			setIsMuted(true);
			setVolumeMessage("Muted");
		} else {
			setPreviousVolume(player.getVolume());
			setVolumeMessage(`Volume: ${currentVolume - 10}`);
		}
	}

	// Mute/Unmute function
	function volumeMute() {
		clearTimeout(volumeMessageTimeout);
		if (isMuted) {
			player.setVolume(previousVolume);
			setIsMuted(false);
			setVolumeMessage("Unmuted");
		} else {
			setPreviousVolume(player.getVolume());
			player.setVolume(0);
			setIsMuted(true);
			setVolumeMessage("Muted");
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
							<MdVolumeOff className="player__icon" />
						) : (
							<MdVolumeMute className="player__icon" />
						)}
					</button>
					{/* Volume Up */}
					<button onClick={volumeUp} className="player__btn">
						<MdVolumeUp className="player__icon" />
					</button>
					<span className="player__volume-message" ref={volumeMessageRef}>
						{volumeMessage}
					</span>
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
						{nextArtistName}
					</p>
					<p className="player__song-name player__song-name--next">
						{nextSongName}
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
