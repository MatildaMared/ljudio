import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { createAccountFetch } from "../services/authService";
import ErrorModal from "../modals/ErrorModal";

function SignupPage() {
	const [context, updateContext] = useContext(UserContext);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	//Show or hide modal that displays an error message when user typed something wrong
	const [show, setShow] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const history = useHistory();

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
		const obj = {
			firstName,
			lastName,
			email,
			password,
		};

		try {
			const data = await createAccountFetch(obj);
			console.log(data);

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
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<section className="signup">
			<h1 className="signup__logo">Ljudio</h1>
			<h2 className="signup__heading">Sign up</h2>
			<form onSubmit={handleSubmit} className="signup__form">
				<div className="signup__form-control">
					<input
						type="text"
						className="signup__input"
						name="firstName"
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<label htmlFor="text" className="signup__label">
						First name
					</label>
				</div>
				<div className="signup__form-control">
					<input
						type="text"
						className="signup__input"
						name="lastName"
						onChange={(e) => setLastName(e.target.value)}
					/>
					<label htmlFor="text" className="signup__label">
						Last name
					</label>
				</div>
				<div className="signup__form-control">
					<input
						type="email"
						className="signup__input"
						type="email"
						name="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor="email" className="signup__label">
						Email
					</label>
				</div>
				<div className="signup__form-control">
					<input
						type="password"
						name="password"
						className="signup__input"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label htmlFor="password" className="signup__label">
						Password
					</label>
				</div>
				<div className="signup__form-control">
					<input
						type="password"
						name="password"
						className="signup__input"
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<label htmlFor="password" className="signup__label">
						Confirm password
					</label>
				</div>
				<input type="submit" className="signup__btn" value="Create account" />

				<p className="signup__text">
					Already have an account?{" "}
					<Link to="/login" className="signup__link">
						Log in
					</Link>
				</p>
			</form>
			<ErrorModal title="Error" onClose={() => setShow(false)} show={show}>
				<p>{errorMessage}</p>
			</ErrorModal>
		</section>
	);
}

export default SignupPage;
