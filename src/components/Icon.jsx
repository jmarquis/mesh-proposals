import React from "react";

export default class Icon extends React.Component {

	render () {
		return (
			<svg ref="el" dangerouslySetInnerHTML={{ __html: `<use xlink:href="/icons/icons.svg#${this.props.src}"/>` }}></svg>
		);
	}

}
