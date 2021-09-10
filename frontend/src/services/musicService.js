// Help function to make a fetch request based on a provided url
// Returns the result
async function fetchDataByUrl(url) {
	try {
		const response = await fetch(url);
		return await response.json();
	} catch (err) {
		console.log(err);
	}
}

// Get a mix of songs, artists, albums, based on a search string
export async function getAllMusicByString(string) {
	const fetchUrl = `https://yt-music-api.herokuapp.com/api/yt/search/${string}`;
	return fetchDataByUrl(fetchUrl);
}

// Get result with multiple songs based on a search string
export async function getSongsByString(string) {
	const fetchUrl = `https://yt-music-api.herokuapp.com/api/yt/songs/${string}`;
	return fetchDataByUrl(fetchUrl);
}

// Get a single artist by ID
export async function getArtistById(id) {
	const fetchUrl = `https://yt-music-api.herokuapp.com/api/yt/artist/${id}`;
	return fetchDataByUrl(fetchUrl);
}

// Get result with multiple artists based on a search string
export async function getArtistsByString(string) {
	const fetchUrl = `https://yt-music-api.herokuapp.com/api/yt/artists/${string}`;
	return fetchDataByUrl(fetchUrl);
}

// Get a single album by ID
export async function getAlbumById(id) {
	const fetchUrl = `https://yt-music-api.herokuapp.com/api/yt/album/${id}`;
	return fetchDataByUrl(fetchUrl);
}

// Get result with multiple albums based on a search string
export async function getAlbumsByString(string) {
	const fetchUrl = `https://yt-music-api.herokuapp.com/api/yt/albums/${string}`;
	return fetchDataByUrl(fetchUrl);
}
