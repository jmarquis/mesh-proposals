import "../styles/components/App";

import React from "react";

import MainMenu from "./MainMenu";

export default class App extends React.Component {

	render () {
		return (
			<div className="App">
				<MainMenu/>
				{this.props.children}
			</div>
		);
	}

}
