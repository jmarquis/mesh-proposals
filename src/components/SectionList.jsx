import "../styles/components/SectionList";

import React from "react";
import { connect } from "react-redux";

import { rearrangeSections, deleteSection } from "../actions/proposals";

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
		const { proposal, activeSection } = this.props;
		return (
			<div className="SectionList">
				<ul>
					{ proposal.sectionOrder.map((sectionId, index) => {
						if (proposal.sections[sectionId]) {
							return (
								<SectionListItem active={index === activeSection} scrollToSection={() => this.props.scrollToSection(index)} key={sectionId} sectionId={sectionId} title={proposal.sections[sectionId].title} onDrop={this.handleDrop} onDelete={this.handleDelete}/>
							);
						} else {
							return "";
						}
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

	handleDelete = (sectionId) => {

		const { proposalId, dispatch } = this.props;

		dispatch(deleteSection(proposalId, sectionId));

	}

}
