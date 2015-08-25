import "../styles/components/Proposal";

import React from "react";
import $ from "jquery";

import Icon from "./Icon";

import { getStatusIcon } from "../utils/proposalUtils";
import { getRelativeDateTime } from "../utils/dateTimeUtils";

import ProposalStore from "../stores/ProposalStore";
import ViewActions from "../actions/ViewActions";
import ViewStore from "../stores/ViewStore";

import ScrollPane from "./ScrollPane";
import ProposalDocument from "./ProposalDocument";

import editIcon from "../icons/edit.svg";
import sendIcon from "../icons/send.svg";
import archiveIcon from "../icons/archive.svg";

export default class Proposal extends React.Component {

	constructor () {
		super();
		this.state = {};
	}

	toggleEditMode = (editing) => {
		this.setState({ editing });
	}

	componentDidMount () {

		this.setState({
			proposal: ProposalStore.getProposal(this.props.params.proposalId),
			editing: false
		});

		ProposalStore.addChangeHandler(() => this.setState({ proposal: ProposalStore.getProposal(this.props.params.proposalId) }));

	}

	componentDidUpdate () {

		this.toggleFullscreen(this.state.editing);

	}

	render () {

		if (!this.state["proposal"]) return <div className="Proposal"></div>;

		return (
			<div className={ "Proposal" + (this.state.editing ? " editing" : "") } ref="el">
				{(() => {
					if (this.state.editing) {
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
						<div className="title">{this.state.proposal.title}</div>
						<ol className="history">
							{Object.keys(this.state.proposal.history).sort().reverse().map((timestamp) => {
								return (
									<li key={timestamp}>
										<Icon svg={getStatusIcon(this.state.proposal.history[timestamp].status)}/>
										<span className="description">{this.state.proposal.history[timestamp].status}</span> by <span className="person">{this.state.proposal.history[timestamp].person}</span>
										<time dateTime="{timestamp}">{getRelativeDateTime(timestamp)}</time>
									</li>
								);
							})}
						</ol>
					</section>
					<ProposalDocument proposal={this.state.proposal} proposalId={this.props.params.proposalId} editing={this.state.editing}/>
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
