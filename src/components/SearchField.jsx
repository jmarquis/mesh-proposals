import React from "react";
import $ from "jquery";

import Icon from "./Icon";

export default class SearchField extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			focus: false,
			value: ""
		};
	}

	componentDidMount () {
		this.reposition();
		$(window).on("resize", this.reposition);
	}

	componentWillUnmount () {
		$(window).off("resize", this.reposition);
	}

	reposition = () => {
		let $el = $(this.refs.el);
		let $field = $(this.refs.field);
		let $icon = $(this.refs.icon.refs.el);
		$field.css("padding-left", ($el.width() / 2) + "px");
		$icon.css("transform", "translateX(" + ($el.offset().left - $icon.offset().left + 18) + "px)");
	}

	setFocus = (event) => {
		this.setState({ focus: event.nativeEvent.type === "focus" });
	}

	setValue = (event) => {
		this.setState({ value: event.nativeEvent.target.value });
	}

	render () {
		return (
			<div ref="el" className={["SearchField", this.state.focus || this.state.value ? "active" : ""].join(" ")}>
				<input type="text" ref="field" value={this.state.value} onFocus={this.setFocus} onBlur={this.setFocus} onChange={this.setValue}/>
				<Icon ref="icon" src="search"/>
			</div>
		);
	}

}
