import "../styles/components/Proposal";

import React from "react";
import $ from "jquery";
import { connect } from "react-redux";

import Icon from "./Icon";

import { getStatusIcon } from "../utils/proposalUtils";
import { getRelativeDateTime } from "../utils/dateTimeUtils";

import ScrollPane from "./ScrollPane";
import ProposalDocument from "./ProposalDocument";

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
				<ScrollPane>

					<ProposalDocument/>

				</ScrollPane>
			</div>
		);

	}

	toggleFullscreen = (editing) => {

		let $el = $(this.refs.el);

		if (editing && $el.css("position") !== "fixed") {
			this.originalPosition = {
				top: $el.offset().top,
				left: $el.offset().left,
				width: $el.width(),
				height: $el.height()
			};
			$el.css({
				top: this.originalPosition.top + "px",
				left: this.originalPosition.left + "px",
				width: this.originalPosition.width + "px",
				height: this.originalPosition.height + "px"
			});
			setTimeout(() => {
				$el.css({
					position: "fixed",
					"transition-property": "top, left, width, height",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%"
				});
			}, 10);
		} else if (!editing && $el.css("position") === "fixed") {
			$el.css({
				top: this.originalPosition.top + "px",
				left: this.originalPosition.left + "px",
				width: this.originalPosition.width + "px",
				height: this.originalPosition.height + "px"
			});
			setTimeout(() => {
				$el.css({
					position: "",
					"transition-property": "",
					top: "",
					left: "",
					width: "",
					height: ""
				});
			}, 1000);
		}

	}

}
