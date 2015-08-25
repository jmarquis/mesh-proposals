import "../styles/components/ProposalDocument";
import "../styles/designs/hatteras";

import React from "react";
import $ from "jquery";

import Quill from "quill";

import HtmlSection from "./HtmlSection";

import ProposalActions from "../actions/ProposalActions";

export default class ProposalDocument extends React.Component {

	render () {
		return (
			<div ref="el" className="ProposalDocument hatteras-design">
				{Object.keys(this.props.proposal.sections).map((sectionId) => {
					let section = this.props.proposal.sections[sectionId];
					switch (section.type) {
						case "html": return <HtmlSection data={section} editing={this.props.editing} onChange={this.handleChange.bind(this, sectionId)}/>;
						default: return "";
					}
				})}
			</div>
		);
	}

	handleChange = (sectionId, html) => {
		ProposalActions.updateSectionContents(this.props.proposalId, sectionId, html);
	}

}
