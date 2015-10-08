import "../styles/components/AddSection";

import React from "react";

import Icon from "./Icon";

import plusIcon from "../icons/plus.svg";
import textIcon from "../icons/text.svg";
import gridIcon from "../icons/grid.svg";

export default class AddSection extends React.Component {

	constructor () {
		super();
		this.state = {
			drawerOpen: false
		};
	}

	componentDidUpdate () {
		if (!this.props.editing && this.state.drawerOpen) {
			this.setState({ drawerOpen: false });
		}
	}

	toggleDrawer = () => {
		this.setState({ drawerOpen: !this.state.drawerOpen });
	}

	addSection = (type) => {
		this.setState({ drawerOpen: false });
		this.props.addSection(type);
	}

	render () {
		return (
			<div className={"AddSection" + (this.props.editing ? " editing" : "") + (this.state.drawerOpen ? " open" : "")}>
				{this.props.editing && <a onClick={this.toggleDrawer}><Icon svg={plusIcon}/></a>}
				<ul>
					<li>
						<a onClick={this.addSection.bind(this, "html")}>
							<figure><Icon svg={textIcon}/></figure>
							<span>Text</span>
						</a>
					</li>
					<li>
						<a onClick={this.addSection.bind(this, "grid")}>
							<figure><Icon svg={gridIcon}/></figure>
							<span>Cost Grid</span>
						</a>
					</li>
				</ul>
			</div>
		);
	}

}
