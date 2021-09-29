import React, { useState, useEffect } from "react";

function YtThumbnailImages({ playlist }) {
	const [firstThumbnail, setFirstThumbnail] = useState(null);
	const [secondThumbnail, setSecondThumbnail] = useState(null);
	const [thirdThumbnail, setThirdThumbnail] = useState(null);
	const [fourthThumbnail, setFourthThumbnail] = useState(null);

	useEffect(() => {
		setFirstThumbnail(getFirstThumbnail(playlist.content));
		setSecondThumbnail(getSecondThumbnail(playlist.content));
		setThirdThumbnail(getThirdThumbnail(playlist.content));
		setFourthThumbnail(getFourthThumbnail(playlist.content));
	}, []);

	function getFirstThumbnail(content) {
		if (content[0]?.hasOwnProperty("thumbnails")) {
      if (content[0].thumbnails.length > 0) {
        return content[0].thumbnails[0].url;
			} else {
        return content[0].thumbnails.url;
			}
		}
	}
	function getSecondThumbnail(content) {
		if (content[1]?.hasOwnProperty("thumbnails")) {
			if (content[1].thumbnails.length > 0) {
				return content[1].thumbnails[0].url;
			} else {
				return content[1].thumbnails.url;
			}
		}
	}
	function getThirdThumbnail(content) {
		if (content[2]?.hasOwnProperty("thumbnails")) {
			if (content[2].thumbnails.length > 0) {
				return content[2].thumbnails[0].url;
			} else {
				return content[2].thumbnails.url;
			}
		}
	}
	function getFourthThumbnail(content) {
		if (content[3]?.hasOwnProperty("thumbnails")) {
			if (content[3].thumbnails.length > 0) {
				return content[3].thumbnails[0].url;
			} else {
				return content[3].thumbnails.url;
			}
		}
	}

	return (
		<div className="thumbnail-images">
			{firstThumbnail ? (
				<img
					src={firstThumbnail}
					alt="Album cover image"
					className="thumbnail-images__thumbnail"
				/>
			) : (
				<div className="thumbnail-images__placeholder"></div>
			)}
			{secondThumbnail ? (
				<img
					src={secondThumbnail}
					alt="Album cover image"
					className="thumbnail-images__thumbnail"
				/>
			) : (
				<div className="thumbnail-images__placeholder"></div>
			)}
			{thirdThumbnail ? (
				<img
					src={thirdThumbnail}
					alt="Album cover image"
					className="thumbnail-images__thumbnail"
				/>
			) : (
				<div className="thumbnail-images__placeholder"></div>
			)}
			{fourthThumbnail ? (
				<img
					src={fourthThumbnail}
					alt="Album cover image"
					className="thumbnail-images__thumbnail"
				/>
			) : (
				<div className="thumbnail-images__placeholder"></div>
			)}
		</div>
	);
}

export default YtThumbnailImages;
