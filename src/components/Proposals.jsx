import "../styles/components/Proposals";

import React from "react";

import { getRelativeDateTime, getLatestRecord, getLatestTimestamp } from "../utils/dateTimeUtils";
import { capitalize } from "../utils/stringUtils";
import { getStatusIcon } from "../utils/proposalUtils";

import ProposalStore from "../stores/ProposalStore";
import ProposalActions from "../actions/ProposalActions";

import { Link } from "react-router";
import Icon from "./Icon";
import SearchField from "./SearchField";
import ScrollPane from "./ScrollPane";

import menuIcon from "../icons/menu.svg";
import newProposalIcon from "../icons/new-proposal.svg";

export default class Proposals extends React.Component {

	constructor (props) {
		super(props);
		this.state = { proposals: ProposalStore.getAllProposals() };
		this.shadowOpacity = 0;
	}

	componentDidMount () {
		ProposalStore.addChangeHandler(() => this.setState({ proposals: ProposalStore.getAllProposals() }));
	}

	getStatus (historyRecords) {
		if (historyRecords) {
			let latestRecord = getLatestRecord(historyRecords);
			return (
				<div className="status">
					<Icon svg={getStatusIcon(latestRecord.status)}/>
					<span className="description">{capitalize(latestRecord.status)}</span> by <span className="person">{latestRecord.person}</span>
				</div>
			);
		}
	}

	render () {
		return (
			<div className="Proposals" ref="el">
				<section className="list-pane">
					<header>
						<section className="nav">
							<section className="menu-toggle">
								<a><Icon svg={menuIcon}/>PROPOSALS</a>
							</section>
							<SearchField/>
						</section>
						<section className="toolbar">
							<section className="filter">
								<div>
									<select value="all">
										<option value="all">All active proposals</option>
										<option value="draft">Draft</option>
										<option value="sent">Sent</option>
										<option value="viewed">Viewed</option>
										<option value="accepted">Accepted</option>
										<option value="rejected">Rejected</option>
									</select>
								</div>
							</section>
							<section className="actions">
								<Link to="/proposals/new"><Icon svg={newProposalIcon}/></Link>
							</section>
						</section>
					</header>
					<ScrollPane>
						<ul>
							{Object.keys(this.state.proposals).map((key) => {
								return (
									<li key={key} data-key={key}>
										<Link to={`/proposals/${key}`}>
											<div className="meta">
												<div className="title">{this.state.proposals[key].title}</div>
												<div className="timestamp">{getRelativeDateTime(getLatestTimestamp(this.state.proposals[key].history))}</div>
											</div>
											{this.getStatus(this.state.proposals[key].history)}
										</Link>
									</li>
								);
							})}
						</ul>
					</ScrollPane>
				</section>
				<section className="detail-pane">
					{this.props.children}
				</section>
			</div>
		);
	}

}
