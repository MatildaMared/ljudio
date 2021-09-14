import React, { useContext, useEffect } from "react";
import { UserContext } from "./../context/UserContext";
import { getUser } from "./../services/userService";

function HomePage() {
	const [userContext, updateUserContext] = useContext(UserContext);

	useEffect(async () => {
		setUserData();
	}, []);

	async function setUserData() {
		const data = await getUser(localStorage.getItem("token"));
		console.log("Data from useeffect is: ", data);
		updateUserContext({
			user: data,
		});
	}

	return (
		<div className="home-page" style={{ padding: "2rem 0rem" }}>
			{userContext.user?.firstName && (
				<div>
					<h1 style={{ marginBottom: "1rem" }}>
						Welcome back, {userContext.user?.firstName}! 👋
					</h1>
					<p>What music are you in the mood for today? 🥳</p>
				</div>
			)}
		</div>
	);
}

export default HomePage;
