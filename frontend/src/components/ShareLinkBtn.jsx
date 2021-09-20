import React from "react";
import { FiShare } from "react-icons/fi";

function ShareLinkBtn({className}) {
	return <button className={`btn share-btn ${className}`}>Share Link<FiShare /></button>;
}

export default ShareLinkBtn;
