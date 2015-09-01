export default class ProposalActions {

	initialize () {
		this.proposalsRef = firebaseRef.child("proposals");
		this.proposalsRef.on("value", snapshot => {
			this.updateProposals(snapshot.val());
		});
	}

	updateProposals (proposals) {
		return { proposals };
	}

	updateSectionContents (proposalId, sectionId, html) {
		this.proposalsRef.child(proposalId).child(sectionId).update({ html });
	}

}



export function updateProposals (proposals) {
	return {
		type: "UPDATE_PROPOSALS",
		proposals
	}
}
