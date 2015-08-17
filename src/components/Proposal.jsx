import "../styles/components/Proposal";

import React from "react";
import $ from "jquery";

import Icon from "./Icon";

import { getStatusIcon } from "../utils/proposalUtils";
import { getRelativeDateTime } from "../utils/dateTimeUtils";

import ProposalStore from "../stores/ProposalStore";

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

	init = () => {
		this.setState({
			proposal: ProposalStore.getProposal(this.props.params.proposalId)
		});
	}

	setupScroll = () => {
		let $el = $(this.refs.el);
		let $proposal = $(this.refs.proposal);
		let offset = $proposal.position().top + 10;
		let sticky = false;

		$el.on("scroll", () => {
			if (!sticky && $el.scrollTop() > offset) {
				sticky = true;
				$proposal.toggleClass("sticky-menu", true);
			} else if (sticky && $el.scrollTop() < offset) {
				sticky = false;
				$proposal.toggleClass("sticky-menu", false);
			}
		});
	}

	componentDidUpdate () {
		if (this.state.proposal) {
			this.setupScroll();
		}
	}

	componentDidMount () {
		this.init();
		ProposalStore.addChangeHandler(this.init);

		if (this.state.proposal) {
			this.setupScroll();
		}
	}

	render () {
		if (!this.state["proposal"]) return <div className="Proposal"></div>;

		return (
			<div className="Proposal" ref="el">
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
				<section className="proposal" ref="proposal">
					<menu ref="menu">
						<a className="secondary"><Icon svg={editIcon}/>Edit</a>
						<a className="tertiary"><Icon svg={sendIcon}/>Re-send</a>
						<a className="tertiary"><Icon svg={archiveIcon}/>Archive</a>
					</menu>
					<ProposalDocument proposalId={this.props.params.proposalId}/>
				</section>
			</div>
		);
	}

}
