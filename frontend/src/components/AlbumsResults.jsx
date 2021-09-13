import React, { useContext } from "react";
import { MusicContext } from "../context/MusicContext";

function AlbumsResults() {
	const [musicContext, updateMusicContext] = useContext(MusicContext);

	return (
		<section className="result">
			<h1>Albums</h1>
			<ul>
				{musicContext.fetchResult.content.map((item) => {
					if (item.type === "album") {
						return (
							<li
								key={item.browseId}
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}>
								<p>{`${item.name}`}</p>
								<img src={item.thumbnails[0].url} alt={item.name}></img>
							</li>
						);
					}
				})}
			</ul>
		</section>
	);
}

export default AlbumsResults;
