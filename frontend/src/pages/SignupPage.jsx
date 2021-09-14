import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import ErrorModal from "../modal/ErrorModal";
import "../../styles/signup.css";

function SignupPage() {
	const [context, updateContext] = useContext(UserContext);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [show, setShow] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		passwordIdentical(password, confirmPassword);
	};

	const passwordIdentical = (pass, confirmPass) => {
		if (pass !== confirmPass) {
			setShow(true);
			setErrorMessage(`Passwords don't match`);
		} else if (pass === confirmPass) {
			createAccount(firstName, lastName, email, password);
		}
	};

	async function createAccount(firstName, lastName, email, password) {
		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					firstName,
					lastName,
					email,
					password,
				}),
			});

			const data = await res.json();

			if (data.success) {
				localStorage.setItem("token", data.user.token);
				history.push("/");
				updateContext({
					isAuthenticated: true,
					user: data.user,
				});
			} else {
				setShow(true);
				setErrorMessage(data.error);
				updateContext({
					isAuthenticated: false,
				});
			}
		} catch (err) {
			console.log('Error fetching: ', err);
		}
	}

	return (
		<div className="container">
			<h1>Sign up</h1>
			<form onSubmit={handleSubmit} className="form">
				<div className="controlling-form">
					<label htmlFor="text">First name: </label>
					<input
						type="text"
						className="firstName"
						name="firstName"
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</div>
				<div className="controlling-form">
					<label htmlFor="text">Last name: </label>
					<input
						type="text"
						className="lastName"
						name="lastName"
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<div className="controlling-form">
					<label htmlFor="email">Email: </label>
					<input
						type="email"
						className="email"
						type="email"
						name="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="controlling-form">
					<label htmlFor="password">Password: </label>
					<input
						type="password"
						name="password"
						className="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="controlling-form">
					<label htmlFor="password">Confirm password: </label>
					<input
						type="password"
						name="password"
						className="password"
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>
				<input type="submit" className="form__btn" value="Create account" />

				<p className="form__text">
					Already have an account?{" "}
					<Link to="/login" className="form__link">
						Log in
					</Link>
				</p>
			</form>
			<ErrorModal title="Error" onClose={() => setShow(false)} show={show}>
				<p>{errorMessage}</p>
			</ErrorModal>
		</div>
	);
}

export default SignupPage;
