export async function addPlaylist(title) {
  const token = localStorage.getItem('token');

  const response = await fetch('/api/playlist', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  const data = await response.json();
  return data;
}

export async function addSongToPlaylist(playlistId, song) {
  const token = localStorage.getItem('token');

  const response = await fetch(`/api/playlist/${playlistId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      song: song,
    }),
  });

  const data = await response.json();
  return data;
}

export async function removePlaylist(playlistId) {
  const token = localStorage.getItem('token');

  const response = await fetch(`/api/playlist/${playlistId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getPlaylist(playlistId) {
  const response = await fetch(`/api/playlist/${playlistId}`);
  const data = await response.json();
  return data;
}

export async function removeSongFromPlaylist(playlistId, videoId) {
  const token = localStorage.getItem('token');

  const response = await fetch(`/api/playlist/${playlistId}/${videoId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function changePlayListTitle(title, playlistId) {
	const token = localStorage.getItem("token");
	
	const response = await fetch(`/api/playlist/${playlistId}/changetitle`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title }),
	});

	const data = await response.json();
	console.log('data: ', data);
	return data;
}
