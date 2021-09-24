export function getArtistNameFromSongObj(item) {
	if (item.artist?.name) {
		return item.artist?.name;
	} else if (item.artist[0]?.name) {
		return item.artist[0]?.name;
	} else if (item.author[0]) {
		return item.author[0]?.name;
	} else if (item.author) {
		return item.author.name;
	}
	return undefined;
}
