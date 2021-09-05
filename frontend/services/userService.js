export async function getUser(token) {
	try {
		// Sends a get request with Authorization header
		// set to the JWT token
		const response = await fetch("http://localhost:8000/api/user", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await response.json();

		// If fetch was successful, return the user object
		// Else return null
		if (data.success) {
			return data.user;
		} else {
			return null;
		}
	} catch (err) {
		console.log(err);
	}
}
