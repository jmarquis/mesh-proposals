import "../styles/components/App";

import React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import MainMenu from "./MainMenu";

@DragDropContext(HTML5Backend)
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
