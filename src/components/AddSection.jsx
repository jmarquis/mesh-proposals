import React from "react";

import Icon from "./Icon";
import plusIcon from "../icons/plus.svg";

export default class AddSection extends React.Component {

	constructor () {
		super();
		this.state = {
			drawerOpen: false
		};
	}

	toggleDrawer = () => {
		this.setState({ drawerOpen: !this.state.drawerOpen });
	}

	render () {
		return (
			<div className={"AddSection" + (this.state.drawerOpen ? " open" : "")}>
				<a onClick={this.toggleDrawer}><Icon svg={plusIcon}/></a>
			</div>
		);
	}

}
