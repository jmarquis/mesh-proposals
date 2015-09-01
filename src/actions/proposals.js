import { firebaseRef } from "../firebase";

function receiveProposals (proposals) {
	return {
		type: "RECEIVE_PROPOSALS",
		proposals
	}
}


let proposalsRef = null;

export function listenForProposals () {
	return (dispatch, getState) => {
		if (!proposalsRef) {
			proposalsRef = firebaseRef.child("proposals");
			return proposalsRef.on("value", snapshot => {
				console.log(snapshot.val());
				dispatch(receiveProposals(snapshot.val()));
			});
		}
	};
}


export function filterProposals (filter) {
	return {
		type: "FILTER_PROPOSALS",
		filter
	}
}


export function searchProposals (query) {
	return {
		type: "SEARCH_PROPOSALS",
		query
	}
}
