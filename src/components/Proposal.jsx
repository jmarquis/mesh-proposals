import React from "react";

import Icon from "./Icon";

import { getStatusIcon } from "../utils/proposalUtils";
import { getRelativeDateTime } from "../utils/dateTimeUtils";

import ProposalStore from "../stores/ProposalStore";

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

	componentDidMount () {
		this.init();
		ProposalStore.addChangeHandler(this.init);
	}

	render () {
		if (!this.state["proposal"]) return <div className="Proposal"></div>;

		return (
			<div className="Proposal">
				<div className="title">{this.state.proposal.title}</div>
				<ol className="history">
					{Object.keys(this.state.proposal.history).sort().reverse().map((timestamp) => {
						return (
							<li key={timestamp}>
								<Icon src={getStatusIcon(this.state.proposal.history[timestamp].status)}/>
								<span className="description">{this.state.proposal.history[timestamp].status}</span> by <span className="person">{this.state.proposal.history[timestamp].person}</span>
								<time dateTime="{timestamp}">{getRelativeDateTime(timestamp)}</time>
							</li>
						);
					})}
				</ol>
				<section className="proposal">
					<menu>
						<a className="secondary"><Icon src="edit"/>Edit</a>
						<a className="tertiary"><Icon src="send"/>Re-send</a>
						<a className="tertiary"><Icon src="archive"/>Archive</a>
					</menu>
				</section>
			</div>
		);
	}

}
