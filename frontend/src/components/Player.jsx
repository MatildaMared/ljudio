import React, { useContext, useState, useEffect, useRef } from "react";
import { MusicContext } from "./../context/MusicContext";
import { LayoutContext } from "../context/LayoutContext";
import YouTube from "react-youtube";
import { getArtistNameFromSongObj } from "./../utilities/musicUtils";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import {
	MdSkipPrevious,
	MdSkipNext,
	MdVolumeUp,
	MdVolumeDown,
	MdVolumeMute,
	MdVolumeOff,
} from "react-icons/md";
import SmallPlayer from "./SmallPlayer";
import PlayPauseBtn from "./PlayPauseBtn";
import ClosePlayerBtn from "./ClosePlayerBtn";

const Player = () => {
	const [musicContext, updateMusicContext] = useContext(MusicContext);
	const [layoutContext, updateLayoutContext] = useContext(LayoutContext);
	const [player, setPlayer] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [videoLength, setVideoLength] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [volumeMessage, setVolumeMessage] = useState("");
	const volumeMessageRef = useRef();
	const [isMuted, setIsMuted] = useState(false);
	const [videoOn, setVideoOn] = useState(false);
	const [previousVolume, setPreviousVolume] = useState(100);
	const [artistName, setArtistName] = useState(null);
	const [nextArtistName, setNextArtistName] = useState(null);
	const [songName, setSongName] = useState(null);
	const [nextSongName, setNextSongName] = useState(null);
	const [currentSongObj, setCurrentSongObj] = useState(null);
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
			player && player.seekTo(0);
			play();
		}
		updateMusicContext({
			resetPlayer: false,
		});
	}, [musicContext.queue, musicContext.resetPlayer]);

	// Updates variables about current and next song & artist,
	// every time the nowPlayingIndex changes
	useEffect(() => {
		if (queue.length === 0) {
			setArtistName(null);
			setSongName(null);
			setNextArtistName(null);
			setNextSongName(null);
		}

		if (nowPlayingIndex !== null && queue.length > 0) {
			setCurrentSongObj(queue[nowPlayingIndex]);
			setArtistName(
				getArtistNameFromSongObj(queue[nowPlayingIndex]) || "Unknown"
			);
			setSongName(queue[nowPlayingIndex]?.name);

			if (!queue[nowPlayingIndex + 1]) {
				setNextArtistName(null);
				setNextSongName(null);
				return;
			}

			if (queue[nowPlayingIndex + 1]) {
				setNextArtistName(
					getArtistNameFromSongObj(queue[nowPlayingIndex + 1]) || "Unknown"
				);
				setNextSongName(queue[nowPlayingIndex + 1]?.name);
			}
		}
	}, [musicContext.nowPlayingIndex, musicContext.queue]);

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
		height: "100%",
		width: "100%",
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

	function onVideoEnd(event) {
		if (queue.length === 1) {
			updateMusicContext({
				nowPlayingIndex: null,
				queue: [],
			});
		}
		if (queue.length > 0) {
			updateMusicContext({
				nowPlayingIndex: nowPlayingIndex + 1,
			});
		}
		clearTimer && clearTimer();
	}

	return (
		<>
			<section
				className={
					layoutContext.showPlayerOnSmallDevice
						? "player player--show"
						: "player"
				}>
				{layoutContext.showPlayerOnSmallDevice && <ClosePlayerBtn />}
				{/* Player Header - Where the artist and song name is displayed! */}
				{artistName && (
					<header className="player__header">
						<div className="player__artist-info">
							<p className="player__artist-name">{artistName}</p>
							<p className="player__song-name">{songName}</p>
						</div>
					</header>
				)}
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
				{queue.length > 0 && (
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
							{volumeMessage && (
								<span className="player__volume-message" ref={volumeMessageRef}>
									{volumeMessage}
								</span>
							)}
						</section>
						{/* Player Buttons */}
						<section className="player__player-btns">
							{/* Previous Song Button */}
							<button onClick={previousSong} className="player__btn">
								<MdSkipPrevious className="player__icon" />
							</button>
							{/* Play/Pause Button */}
							<PlayPauseBtn isPlaying={isPlaying} play={play} pause={pause} />
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
				)}
				{/* Song Progress Bar */}
				{queue.length > 0 && (
					<section className="player__progress">
						<span className="player__current-time">
							{getTimeInMinutes(currentTime)}
						</span>
						<input
							type="range"
							min="0"
							max={videoLength || 0}
							value={currentTime || 0}
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
				)}
				{/* Information about next song */}
				{nextArtistName && (
					<section className="player__next">
						<span className="player__label player__label--next">
							Next in queue
						</span>
						<div className="player__artist-info player__artist-info--next">
							<p className="player__artist-name player__artist-name--next">
								{nextArtistName}
							</p>
							<p className="player__song-name player__song-name--next">
								{nextSongName}
							</p>
						</div>
					</section>
				)}
			</section>
			{/* Small player element */}
			{queue.length > 0 && (
				<SmallPlayer
					song={currentSongObj}
					artist={artistName}
					title={songName}
					isPlaying={isPlaying}
					play={play}
					pause={pause}
				/>
			)}
		</>
	);
};

export default Player;
