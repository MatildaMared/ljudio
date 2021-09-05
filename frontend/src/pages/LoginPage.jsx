import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	function handleSubmit(e) {
		e.preventDefault();
		login(email, password);
	}

	async function login(email, password) {
		try {
			const response = await fetch("http://localhost:8000/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});

			const data = await response.json();

			if (data.success) {
				localStorage.setItem("token", data.token);
				history.push("/");
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div>
			<h1>Log in</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">
					Email:
					<input
						type="email"
						name="email"
						id="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label htmlFor="password">
					Password:
					<input
						type="password"
						name="password"
						id="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<input type="submit" value="Log in" />
			</form>
		</div>
	);
}

export default LoginPage;
