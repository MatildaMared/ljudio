import React from "react";
import PlaySongBtn from "./PlaySongBtn";
import AddToPlayQueue from "./AddToPlayQueue";

function SongsList({ songs }) {
	return (
		<div>
			<div className="songslist">
				<h2 className="songslist__heading">Songs</h2>
				<ul className="songslist__list">
					{songs &&
						songs.map((item) => (
							<li className="songslist__item" key={item.videoId}>
								<div className="songslist__info">
									<p className="songslist__song-name">{item.name}</p>
									<p className="songslist__artist-name">{item.artist.name}</p>
								</div>
								<div className="songslist__icons">
									<PlaySongBtn item={item} />
									<AddToPlayQueue item={item} />
								</div>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
}

export default SongsList;
