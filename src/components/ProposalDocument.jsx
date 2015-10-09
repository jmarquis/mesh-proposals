import "../styles/components/ProposalDocument";
import "../styles/designs/hatteras";

import React from "react";
import $ from "jquery";
import { connect } from "react-redux";

import HtmlSection from "./HtmlSection";
import ScrollPane from "./ScrollPane";

import { updateSection, addSection, rearrangeSections } from "../actions/proposals";

@connect(state => {

	let { proposals, editing, router } = state;

	return {
		proposalId: router.params.proposalId,
		proposal: proposals[router.params.proposalId],
		editing
	};

})
export default class ProposalDocument extends React.Component {

	componentDidMount () {
		this.normalizeOrder();
	}

	componentDidUpdate () {
		this.normalizeOrder();
		if (this.props.destinationSection) {
			this.scrollToSection(this.props.destinationSection);
		}
	}

	render () {

		const { proposalId, proposal, editing } = this.props;

		if (!proposal) return <div className="ProposalDocument"/>;

		return (
			<div className={"ProposalDocument hatteras-design" + (editing ? " editing" : "")}>
				<ScrollPane ref="scrollPane" onScroll={this.handleScroll}>
					<div className="document">
						{(proposal.sectionOrder || []).map((sectionId) => {
							let section = proposal.sections[sectionId];
							if (section) {
								switch (section.type) {
									case "html": return <HtmlSection ref={sectionId} key={sectionId} data={section} editing={editing} onChange={this.handleChange.bind(this, sectionId)} addSection={this.addSection.bind(this, sectionId)}/>;
									default: return "";
								}
							}
						})}
					</div>
				</ScrollPane>
			</div>
		);

	}


	timer = null;

	handleChange = (sectionId, html) => {

		const { proposalId, dispatch } = this.props;

		if (this.timer) clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			dispatch(updateSection(proposalId, sectionId, html));
		}, 500);

	}

	addSection = (previousSectionId, type) => {

		const { proposalId, dispatch } = this.props;
		dispatch(addSection(proposalId, previousSectionId, type));

	}

	rearrange = (newOrder) => {

		const { proposalId, dispatch } = this.props;
		dispatch(rearrangeSections(proposalId, newOrder));

	}

	normalizeOrder = () => {

		const { proposal } = this.props;
		if (proposal) {
			const unorderedSections = [];
			Object.keys(proposal.sections).forEach((sectionId) => {
				if (!proposal.sectionOrder || proposal.sectionOrder.indexOf(sectionId) === -1) {
					unorderedSections.push(sectionId);
				}
			});
			if (unorderedSections.length) {
				if (proposal.sectionOrder) {
					this.rearrange([...proposal.sectionOrder, ...unorderedSections]);
				} else {
					this.rearrange(unorderedSections);
				}
			} else {
				if (proposal.sectionOrder) {
					const nonexistantSections = [];
					proposal.sectionOrder.forEach((sectionId) => {
						if (!proposal.sections[sectionId]) {
							nonexistantSections.push(sectionId);
						}
					});
					if (nonexistantSections.length) {
						const newOrder = [...proposal.sectionOrder];
						nonexistantSections.forEach((sectionId) => {
							newOrder.splice(newOrder.indexOf(sectionId), 1);
						});
						this.rearrange(newOrder);
					}
				}
			}
		}

	}

	handleScroll = (event) => {

		const { proposal } = this.props;

		let activeSection = 0;
		for (let i = 0; i < proposal.sectionOrder.length; i++) {
			const $section = $(this.refs[proposal.sectionOrder[i]].refs.el);
			const sectionTop = $section.position().top;
			if (sectionTop < 10 && sectionTop + $section.height() > 0) {
				activeSection = i;
				break;
			}
		}

		this.props.onSectionActivate(activeSection);

	}

	scrollToSection = (sectionIndex) => {
		const { proposal } = this.props;
		const $targetSection = $(this.refs[proposal.sectionOrder[sectionIndex]].refs.el);
		this.refs.scrollPane.scrollTo($targetSection.position().top + $(this.refs.scrollPane.refs.contents).scrollTop());
	}

}
