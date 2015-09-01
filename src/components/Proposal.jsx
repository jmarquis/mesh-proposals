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

export default class Proposal extends React.Component {

	toggleEditMode = (editing) => {
		this.setState({ editing });
	}

	componentDidUpdate () {

		this.toggleFullscreen(this.props.editing);

	}

	render () {

		const { proposal, editing } = this.props;

		if (!proposal) return <div className="Proposal"></div>;

		return (
			<div className={ "Proposal" + (editing ? " editing" : "") } ref="el">
				{(() => {
					if (editing) {
						return (
							<menu>
								<a className="primary" onClick={this.toggleEditMode.bind(this, false)}>Done</a>
								<small>Changes are saved as they are made.</small>
							</menu>
						);
					} else {
						return (
							<menu>
								<a className="secondary" onClick={this.toggleEditMode.bind(this, true)}><Icon svg={editIcon}/>Edit</a>
								<a className="tertiary"><Icon svg={sendIcon}/>Re-send</a>
								<a className="tertiary"><Icon svg={archiveIcon}/>Archive</a>
							</menu>
						);
					}
				})()}
				<ScrollPane>
					<section className="meta">
						<div className="title">{proposal.title}</div>
						<ol className="history">
							{Object.keys(proposal.history).sort().reverse().map((timestamp) => {
								return (
									<li key={timestamp}>
										<Icon svg={getStatusIcon(proposal.history[timestamp].status)}/>
										<span className="description">{proposal.history[timestamp].status}</span> by <span className="person">{proposal.history[timestamp].person}</span>
										<time dateTime="{timestamp}">{getRelativeDateTime(timestamp)}</time>
									</li>
								);
							})}
						</ol>
					</section>
					<ProposalDocument proposal={proposal} proposalId={this.props.params.proposalId} editing={this.state.editing}/>
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
