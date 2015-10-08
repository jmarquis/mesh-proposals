import "../styles/components/SectionList";

import React from "react";
import { connect } from "react-redux";

import { rearrangeSections } from "../actions/proposals";

import SectionListItem from "./SectionListItem";

@connect(state => {

	const { proposals, router } = state;

	return {
		proposalId: router.params.proposalId,
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
						return (
							<SectionListItem key={sectionId} sectionId={sectionId} title={proposal.sections[sectionId].title} onDrop={this.handleDrop}/>
						);
					})}
					<SectionListItem sectionId={null} onDrop={this.handleDrop}/>
				</ul>
			</div>
		);
	}

	handleDrop = (movingSectionId, nextSectionId) => {

		const { proposalId, proposal, dispatch } = this.props;

		const newOrder = [...proposal.sectionOrder];
		newOrder.splice(newOrder.indexOf(movingSectionId), 1);
		if (nextSectionId) {
			newOrder.splice(newOrder.indexOf(nextSectionId), 0, movingSectionId);
		} else {
			newOrder.push(nextSectionId);
		}
		dispatch(rearrangeSections(proposalId, newOrder));

	}

}
