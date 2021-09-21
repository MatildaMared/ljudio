
export async function changePlayListTitle(playlistId, title) {
	const token = localStorage.getItem("token");

	const response = await fetch(`/${playlistId}/changetitle`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ playlistId, title }),
	});

	const data = await response.json();
	return data;
}