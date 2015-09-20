import "../styles/components/Proposals";

import React from "react";
import { connect } from "react-redux";

import { getRelativeDateTime, getLatestRecord, getLatestTimestamp } from "../utils/dateTimeUtils";
import { capitalize } from "../utils/stringUtils";
import { getStatusIcon } from "../utils/proposalUtils";

import { Link } from "react-router";
import Icon from "./Icon";
import SearchField from "./SearchField";
import ScrollPane from "./ScrollPane";

import { listenForProposals, filterProposals, searchProposals } from "../actions/proposals";

import menuIcon from "../icons/menu.svg";
import newProposalIcon from "../icons/new-proposal.svg";

@connect(state => {

	let { proposals, proposalFilter, proposalQuery, editing } = state;

	if (proposalFilter !== "all") {
		let filteredProposals = {};
		for (let id in proposals) {
			if (proposals.hasOwnProperty(id)) {
				if (proposals[id].history) {
					let timestamps = Object.keys(proposals[id].history);
					if (proposals[id].history[timestamps.sort()[timestamps.length - 1]].status === proposalFilter) {
						filteredProposals[id] = proposals[id];
					}
				}
			}
		}
		proposals = filteredProposals;
	}

	if (proposalQuery) {
		let filteredProposals = {};
		for (let id in proposals) {
			if (proposals.hasOwnProperty(id)) {
				if (proposals[id].title.toLowerCase().indexOf(proposalQuery.toLowerCase()) !== -1) {
					filteredProposals[id] = proposals[id];
				}
			}
		}
		proposals = filteredProposals;
	}

	return {
		proposals,
		proposalFilter,
		editing
	};

})
export default class Proposals extends React.Component {

	componentDidMount () {
		const { dispatch } = this.props;
		dispatch(listenForProposals());
	}

	render () {
		const { dispatch, proposals, proposalFilter, editing } = this.props;
		return (
			<div className="Proposals" ref="el">
				<section className={"list-pane" + (editing ? " disabled" : "")}>
					<header>
						<section className="nav">
							<section className="menu-toggle">
								<a><Icon svg={menuIcon}/>PROPOSALS</a>
							</section>
							<SearchField dispatch={dispatch} searchProposals={searchProposals}/>
						</section>
						<section className="toolbar">
							<section className="filter">
								<div>
									<select value={proposalFilter} onChange={(event) => dispatch(filterProposals(event.target.value))}>
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
							{Object.keys(proposals).map((key) => {
								return (
									<li key={key} data-key={key}>
										<Link to={`/proposals/${key}`} activeClassName="current">
											<div className="meta">
												<div className="title">{proposals[key].title}</div>
												<div className="timestamp">{getRelativeDateTime(getLatestTimestamp(proposals[key].history))}</div>
											</div>
											{getStatus(proposals[key].history)}
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

function getStatus (historyRecords) {
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
