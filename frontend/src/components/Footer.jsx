import React from "react";
import { MdFavorite } from "react-icons/md";

function Footer() {
	return (
		<footer className="footer">
			<div className="footer__heading-wrapper">
				<h3 className="footer__heading">
					Made with
					<MdFavorite className="footer__icon" />
				</h3>
			</div>
			<p className="footer__copyright">
				&copy; 2021 Sara, Sofia, Patrik & Matilda
			</p>
		</footer>
	);
}

export default Footer;
