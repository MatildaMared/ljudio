import React, { useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { createAccountFetch } from "../services/authService";
import ErrorModal from "../modals/ErrorModal";

function SignupForm() {
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
	const location = useLocation();
	const [errorArray, setErrorArray] = useState([]);

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

			if (data.success) {
				localStorage.clear();
				localStorage.setItem("token", data.token);
				updateContext({
					isAuthenticated: true,
					user: data.user,
				});
				if (location.pathname === "/login") {
					history.push("/");
				}
			} else {
				setShow(true);
				let array = data.error.split(',');
				let updateArray = array.map(item=>{
					return item.replace('...','');
				})
				setErrorArray(updateArray);
				setErrorMessage(data.error);
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<section className="loginpage">
			<h1 className="loginpage__logo">Ljudio</h1>
			<h2 className="loginpage__heading">Sign up</h2>
			<form onSubmit={handleSubmit} className="loginpage__form">
				<div className="loginpage__form-control">
					<input
						type="text"
						className="loginpage__input"
						name="firstName"
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<label htmlFor="text" className="loginpage__label">
						First name*
					</label>
				</div>
				<div className="loginpage__form-control">
					<input
						type="text"
						className="loginpage__input"
						name="lastName"
						onChange={(e) => setLastName(e.target.value)}
					/>
					<label htmlFor="text" className="loginpage__label">
						Last name*
					</label>
				</div>
				<div className="loginpage__form-control">
					<input
						type="email"
						className="loginpage__input"
						type="email"
						name="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor="email" className="loginpage__label">
						Email*
					</label>
				</div>
				<div className="loginpage__form-control">
					<input
						type="password"
						name="password"
						className="loginpage__input"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label htmlFor="password" className="loginpage__label">
						Password*
					</label>
				</div>
				<div className="loginpage__form-control">
					<input
						type="password"
						name="password"
						className="loginpage__input"
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<label htmlFor="password" className="loginpage__label">
						Confirm password*
					</label>
				</div>
				<p className="loginpage__fine-print">* Required field</p>
				<input
					type="submit"
					className="loginpage__btn"
					value="Create account"
				/>
			</form>
			
			<ErrorModal title="Error" onClose={() => setShow(false)} show={show}>
				{errorArray.length > 0 && errorArray.map((error, index)=>(
					<p key={index}>{error}</p>
				))}
			</ErrorModal>
		</section>
	);
}

export default SignupForm;
