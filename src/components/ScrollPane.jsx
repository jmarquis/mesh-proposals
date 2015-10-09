import "../styles/components/ScrollPane";

import React from "react";
import $ from "jquery";
import throttle from "lodash.throttle";

import { Link } from "react-router";

export default class ScrollPane extends React.Component {

	render () {
		return (
			<div className="ScrollPane">
				<div className="shadow" ref="shadow"></div>
				<div onScroll={throttle(this.handleScroll, 10)} className="contents" ref="contents">
					{this.props.children}
				</div>
			</div>
		);
	}

	handleScroll = (event) => {

		if (event.target.scrollTop === 0 && this.shadowOpacity !== 0) {
			this.shadowOpacity = 0;
			this.refs.shadow.style.cssText = "opacity: 0";
		} else if (event.target.scrollTop < 50) {
			this.shadowOpacity = event.target.scrollTop / 50;
			this.refs.shadow.style.cssText = "opacity: " + this.shadowOpacity.toFixed(2);
		} else if (this.shadowOpacity !== 1) {
			this.shadowOpacity = 1;
			this.refs.shadow.style.cssText = "opacity: 1";
		}

		if (this.props.onScroll) this.props.onScroll(event);

	}

	scrollTo = (top) => {
		const $contents = $(this.refs.contents);
		$contents.scrollTop(top);
		this.handleScroll({ target: { scrollTop: $contents.scrollTop() }});
	}

}
