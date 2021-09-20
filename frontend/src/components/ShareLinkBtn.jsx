import React from "react";
import { FiShare } from "react-icons/fi";

function ShareLinkBtn({ className }) {
	const currentUrl = window.location.href;
	console.log(currentUrl);
	return (
		<>
			<button className={`btn share-btn ${className}`}>
				Share Link
				<FiShare />
			</button>
		</>
	);
}

export default ShareLinkBtn;
