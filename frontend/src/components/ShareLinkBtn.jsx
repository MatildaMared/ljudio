import React, { useState, useRef, useEffect } from "react";
import { FiShare } from "react-icons/fi";
import { MdContentCopy } from "react-icons/md";

function ShareLinkBtn({ className }) {
	const [showDropdown, setshowDropdown] = useState(false);
	const [showCopyAlert, setShowCopyAlert] = useState(false);
	const currentUrl = window.location.href;
	const dropdownRef = useRef();
	let timeout;

	useEffect(() => {
		document.addEventListener("mousedown", handleClick);
	}, []);

	function onCopyHandler() {
		timeout && timeout();
		setshowDropdown(false);
		setShowCopyAlert(true);
		navigator.clipboard.writeText(currentUrl);
		timeout = setTimeout(() => {
			setShowCopyAlert(false);
		}, 2000);
	}

	function handleClickOutside(e) {
		setshowDropdown(false);
	}

	function handleClick(e) {
    if (dropdownRef?.current?.contains(e.target)) {
			return;
		}
		handleClickOutside(e);
	}

	return (
		<div className={`share-btn ${className}`}>
			<button
				className="share-btn__btn"
				onClick={() => {
					setshowDropdown(!showDropdown);
				}}>
				Share Link
				<FiShare className="share-btn__icon" />
			</button>
			{showDropdown && (
				<div
					className="share-btn__dropdown"
					ref={dropdownRef}
					onClick={(e) => e.stopPropagation()}>
					<input
						className="share-btn__input"
						type="text"
						value={currentUrl}
						readOnly
					/>
					<button className="share-btn__copy-btn" onClick={onCopyHandler}>
						Copy link <MdContentCopy className="share-btn__copy-icon" />
					</button>
				</div>
			)}
			{showCopyAlert && (
				<p className="share-btn__copy-alert">Link url copied to clipboard!</p>
			)}
		</div>
	);
}

export default ShareLinkBtn;
