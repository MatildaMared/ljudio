import React from "react";
import { useHistory } from "react-router-dom";
import { getFallbackImage } from "../utilities/musicUtils";

function ArtistsList({ artists }) {
	const history = useHistory();

	return (
		<div className="artistslist">
			<h2 className="artistslist__heading">Artists</h2>
			<ul className="artistslist__list">
				{artists &&
					artists.map((item, index) => (
						<li
							className="artistslist__item"
							key={`${item.browseId}${index}`}
							onClick={() => history.push(`/artist/${item.browseId}`)}>
							<p className="artistslist__artist-name">{`${item.name}`}</p>
							<img
								className="artistslist__thumbnail"
								src={item.thumbnails[0].url}
								alt={item.name}
								onError={getFallbackImage}></img>
						</li>
					))}
			</ul>
		</div>
	);
}

export default ArtistsList;
