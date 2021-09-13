import React, {useContext} from "react";
import { UserContext } from "./../context/UserContext";

function HomePage() {
	const [userContext, updateUserContext] = useContext(UserContext);
	return (
		<div className="home-page" style={{padding: "2rem 0rem"}}>
			<h1 style={{marginBottom: "1rem"}}>Welcome back, {userContext.user.firstName}! 👋</h1>
			<p>What music are you in the mood for today? 🥳</p>
		</div>
	);
}

export default HomePage;
