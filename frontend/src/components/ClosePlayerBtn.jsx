import React, { useContext } from "react";
import { LayoutContext } from '../context/LayoutContext';
import { MdKeyboardArrowRight } from "react-icons/md";

function ClosePlayerBtn() {
  const [layoutContext, updateLayoutContext] = useContext(LayoutContext);
	return (
		<button
			className="close-player-btn"
			onClick={() => {
				updateLayoutContext({ showPlayerOnSmallDevice: false });
			}}>
			<MdKeyboardArrowRight className="close-player-btn__icon" />
		</button>
	);
}

export default ClosePlayerBtn;
