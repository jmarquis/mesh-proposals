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


export function addSection (proposalId, previousSectionId, type) {
	return (dispatch, getState) => {
		const newSectionRef = firebaseRef.child("proposals").child(proposalId).child("sections").push();
		const newSectionId = newSectionRef.key();
		const order = getState().proposals[proposalId].sectionOrder || [];
		const newOrder = [...order];
		console.log("index to replace", previousSectionId);
		console.log("position of index to replace", newOrder.indexOf(previousSectionId));
		console.log("before", newOrder);
		newOrder.splice(newOrder.indexOf(previousSectionId) + 1, 0, newSectionId);
		console.log("after", newOrder);
		firebaseRef.child("proposals").child(proposalId).update({
			["sections/" + newSectionId]: { type },
			sectionOrder: newOrder
		});
	};
}


export function rearrangeSections (proposalId, newOrder) {
	return (dispatch, getState) => {
		firebaseRef.child("proposals").child(proposalId).child("sectionOrder").set(newOrder);
	};
}
