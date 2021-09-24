import React, { forwardRef } from "react";
import { MdPlayArrow, MdPause } from "react-icons/md";

const PlayPauseBtn = forwardRef(({ isPlaying, pause, play }, ref) => {
	return (
		<button
			ref={ref}
			onClick={isPlaying ? pause : play}
			className="play-pause-btn">
			{isPlaying ? (
				<MdPause className="play-pause-btn__icon" />
			) : (
				<MdPlayArrow className="play-pause-btn__icon" />
			)}
		</button>
	);
});

export default PlayPauseBtn;
