import React from "react";
import { Link } from "react-router";

export default class MainMenu extends React.Component {

	render () {
		return (
			<menu className="MainMenu menu-pane">
				<header>
					<figure></figure>
					<div>Knapsack</div>
				</header>
				<ul>
					<li><Link to="/proposals">Proposals</Link></li>
					<li><Link to="/proposals/archive">Archive</Link></li>
					<li className="separator"></li>
					<li><Link to="/templates">Templates</Link></li>
					<li><Link to="/team">Team</Link></li>
					<li><Link to="/settings">Settings</Link></li>
				</ul>
				<footer>
					<figure></figure>
					<div>Jeremy Marquis</div>
				</footer>
			</menu>
		);
	}

}
