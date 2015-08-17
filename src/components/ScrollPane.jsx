import "../styles/components/ScrollPane";

import React from "react";

import { Link } from "react-router";

export default class ScrollPane extends React.Component {

	handleScroll = (event) => {
		if (event.target.scrollTop === 0 && this.shadowOpacity !== 0) {
			this.shadowOpacity = 0;
			this.refs.shadow.style.cssText = "opacity: 0";
		} else if (event.target.scrollTop < 50) {
			this.shadowOpacity = event.target.scrollTop / 50;
			this.refs.shadow.style.cssText = "opacity: " + this.shadowOpacity;
		} else if (this.shadowOpacity !== 1) {
			this.shadowOpacity = 1;
			this.refs.shadow.style.cssText = "opacity: 1";
		}
	}

	render () {
		return (
			<div className="ScrollPane">
				<div className="shadow" ref="shadow"></div>
				<div onScroll={this.handleScroll} ref="contents">
					{this.props.children}
				</div>
			</div>
		);
	}

}
