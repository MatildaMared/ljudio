import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "./../context/UserContext";
import { MusicContext } from "./../context/MusicContext";
import { MdInput } from "react-icons/md";

function LogoutBtn() {
	const history = useHistory();
	const [userContext, updateUserContext] = useContext(UserContext);
	const [musicContext, updateMusicContext] = useContext(MusicContext);

	function logoutHandler() {
		localStorage.removeItem("token");
		updateUserContext({
			isAuthenticated: null,
			user: {},
		});
		updateMusicContext({
			nowPlayingIndex: null,
			queue: [],
			fetchResult: null,
			resultType: null,
			isLoading: false,
			searchString: "",
		});
		history.push("/login");
	}

	return <button className="logoutbtn" onClick={logoutHandler}>Logout <MdInput className="logoutbtn__icon" /></button>;
}

export default LogoutBtn;
