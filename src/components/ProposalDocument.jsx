import "../styles/components/ProposalDocument";
import "../styles/designs/hatteras";

import React from "react";
import { connect } from "react-redux";

import HtmlSection from "./HtmlSection";

import { updateSection } from "../actions/proposals";

@connect(state => {

	let { proposals, editing, router } = state;

	return {
		proposalId: router.params.proposalId,
		proposal: proposals[router.params.proposalId],
		editing
	};

})
export default class ProposalDocument extends React.Component {

	render () {

		const { proposal, editing } = this.props;

		if (!proposal) return <div className="ProposalDocument"/>;

		return (
			<div className="ProposalDocument hatteras-design">
				{Object.keys(proposal.sections).map((sectionId) => {
					let section = proposal.sections[sectionId];
					switch (section.type) {
						case "html": return <HtmlSection data={section} editing={editing} onChange={this.handleChange.bind(this, sectionId)}/>;
						default: return "";
					}
				})}
			</div>
		);

	}


	timer = null;

	handleChange = (sectionId, html) => {

		const { proposalId, dispatch } = this.props;

		if (this.timer) clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			dispatch(updateSection(proposalId, sectionId, html));
		}, 1000);

	}

}
