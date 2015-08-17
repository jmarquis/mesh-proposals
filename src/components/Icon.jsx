import React from "react";

import "../styles/components/Icon";

export default class Icon extends React.Component {

	render () {
		return (
			<div ref="el" className="Icon" dangerouslySetInnerHTML={{__html: this.props.svg}}></div>
		);
	}

}
