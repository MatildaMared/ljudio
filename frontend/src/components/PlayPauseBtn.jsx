import React from "react";
import {
	MdPlayArrow,
	MdPause,
} from "react-icons/md";

function PlayPauseBtn({ isPlaying, pause, play }) {
	return (
		<button
			onClick={isPlaying ? pause : play}
			className="play-pause-btn">
			{isPlaying ? (
				<MdPause className="play-pause-btn__icon" />
			) : (
				<MdPlayArrow className="play-pause-btn__icon" />
			)}
		</button>
	);
}

export default PlayPauseBtn;