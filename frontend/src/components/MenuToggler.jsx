import React, { useState, useEffect, useContext, useRef } from "react";
import { LayoutContext } from "../context/LayoutContext";

function MenuToggler() {
	const [showMenu, setShowMenu] = useState(false);
	const [layoutContext, updateLayoutContext] = useContext(LayoutContext);
	const menuRef = useRef();

	useEffect(() => {
		if (showMenu) {
			updateLayoutContext({
				showSmallDeviceMenu: true,
			});
		} else {
			updateLayoutContext({
				showSmallDeviceMenu: false,
			});
		}
	}, [showMenu]);

	useEffect(() => {
		if (!showMenu) {
			document.removeEventListener("mouseup", clickHandler);
		} else if (showMenu) {
			document.addEventListener("mouseup", clickHandler);
		}
	}, [showMenu]);

	function toggleMenuHandler() {
		if (showMenu === true) {
			setShowMenu(false);
		} else {
			setShowMenu(true);
		}
	}

	function clickHandler(e) {
		e.stopPropagation();
		updateLayoutContext({
			showSmallDeviceMenu: false,
		});
		document.removeEventListener("mouseup", clickHandler);
		if (e.target === menuRef.current || e.target.parentElement === menuRef.current) {
			return;
		}
		setShowMenu(false);
	}

	return (
		<div
			className={showMenu ? "menu-toggler menu-toggler--open" : "menu-toggler"}
			onClick={toggleMenuHandler}
			ref={menuRef}>
			<span className="menu-toggler__icon"></span>
		</div>
	);
}

export default MenuToggler;
