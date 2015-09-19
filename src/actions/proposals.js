import { firebaseRef } from "../firebase";

function receiveProposals (proposals) {
	return {
		type: "RECEIVE_PROPOSALS",
		proposals
	};
}


let proposalsRef = null;

export function listenForProposals () {
	return (dispatch, getState) => {
		if (!proposalsRef) {
			proposalsRef = firebaseRef.child("proposals");
			return proposalsRef.on("value", snapshot => {
				dispatch(receiveProposals(snapshot.val()));
			});
		}
	};
}


export function filterProposals (filter) {
	return {
		type: "FILTER_PROPOSALS",
		filter
	};
}


export function searchProposals (query) {
	return {
		type: "SEARCH_PROPOSALS",
		query
	};
}


export function toggleEditing (editing) {
	return {
		type: "TOGGLE_EDITING",
		editing
	};
}


function toggleSectionUpdating (updating) {
	return {
		type: "TOGGLE_SECTION_UPDATING",
		updating
	};
}


export function updateSection (proposalId, sectionId, html) {
	return (dispatch, getState) => {
		dispatch(toggleSectionUpdating(true));
		console.log("html", html);
		firebaseRef.child("proposals").child(proposalId).child("sections").child(sectionId).update({
			html
		}, error => {
			console.log(error);
			dispatch(toggleSectionUpdating(false));
		});
	};
}
