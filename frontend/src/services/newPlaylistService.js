
export async function changePlayListTitle(title, playlistId) {
	const token = localStorage.getItem("token");

	console.log('In service', title, playlistId);
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