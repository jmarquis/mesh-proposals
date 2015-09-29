import "../styles/components/SectionList";

import React from "react";
import { connect } from "react-redux";

@connect(state => {

	const { proposals, router } = state;

	return {
		proposal: proposals[router.params.proposalId]
	};

})
export default class SectionList extends React.Component {

	render () {
		const { proposal } = this.props;
		return (
			<div className="SectionList">
				<ul>
					{ proposal.sectionOrder.map(sectionId => {
						return <li key={sectionId}>{proposal.sections[sectionId].title}</li>;
					})}
				</ul>
			</div>
		);
	}

}
