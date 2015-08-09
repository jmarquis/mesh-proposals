import { store } from "../flux";

@store("proposals")
class ProposalStore {

	constructor () {
		this.proposals = [];
		this.listen("update", (data) => this.handleUpdateProposals(data));
	}

	getAllProposals () {
		return this.proposals;
	}

	getProposal = (proposalId) => {
		return this.proposals[proposalId];
	}

	handleUpdateProposals (proposals) {
		this.proposals = proposals;
		this.emitChange();
	}

}

export default new ProposalStore();
