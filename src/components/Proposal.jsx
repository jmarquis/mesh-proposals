import "../styles/components/Proposal";

import React from "react";
import $ from "jquery";
import { connect } from "react-redux";

import Icon from "./Icon";

import { getStatusIcon } from "../utils/proposalUtils";
import { getRelativeDateTime } from "../utils/dateTimeUtils";

import ScrollPane from "./ScrollPane";
import ProposalDocument from "./ProposalDocument";
import SectionList from "./SectionList";

import editIcon from "../icons/edit.svg";
import sendIcon from "../icons/send.svg";
import archiveIcon from "../icons/archive.svg";

import { toggleEditing } from "../actions/proposals";

@connect(state => {

	let { proposals, router, editing, sectionUpdating } = state;

	return {
		proposal: proposals[router.params.proposalId],
		proposalId: router.params.proposalId,
		editing,
		sectionUpdating
	};

})
export default class Proposal extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			activeSection: 0
		};
	}

	render () {

		const { proposalId, proposal, editing, sectionUpdating, dispatch } = this.props;

		if (!proposalId || !proposal) return <div className="Proposal"></div>;

		return (
			<div className={ "Proposal" + (editing ? " editing" : "") } ref="el">

				<header>
					<div className="title">{proposal.title}</div>
					{(() => {
						if (editing) {
							return (
								<menu>
									<a className="primary" onClick={() => dispatch(toggleEditing(false))}>Done</a>
									<small>{sectionUpdating ? "Saving..." : ""}</small>
								</menu>
							);
						} else {
							return (
								<menu>
									<a className="secondary" onClick={() => dispatch(toggleEditing(true))}><Icon svg={editIcon}/>Edit</a>
									<a className="tertiary"><Icon svg={sendIcon}/>Re-send</a>
									<a className="tertiary"><Icon svg={archiveIcon}/>Archive</a>
								</menu>
							);
						}
					})()}
				</header>

				<ProposalDocument ref="proposalDocument" onSectionActivate={this.handleSectionActivate}/>

				<SectionList activeSection={this.state.activeSection} scrollToSection={this.scrollToSection}/>

			</div>
		);

	}

	handleSectionActivate = (activeSection) => {
		this.setState({ activeSection });
	}

	scrollToSection = (sectionIndex) => {
		this.refs.proposalDocument.getWrappedInstance().scrollToSection(sectionIndex);
	}

}
