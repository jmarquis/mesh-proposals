import { actions } from "../flux";
import { firebaseRef, initializeWhenConnected } from "../firebase";

@actions("proposals")
class ProposalActions {

	initialize () {
		this.proposalsRef = firebaseRef.child("proposals");
		this.proposalsRef.on("value", snapshot => {
			this.updateProposals(snapshot.val());
		});
	}

	updateProposals (proposals) {
		this.dispatch("update", proposals);
	}

	updateSectionContents (proposalId, sectionId, html) {
		this.proposalsRef.child(proposalId).child(sectionId).update({ html });
	}

}

export const proposalActions = new ProposalActions();
initializeWhenConnected(proposalActions);
