export function proposals (state = [], action) {
	switch (action.type) {

		case "RECEIVE_PROPOSALS":
			return action.proposals;

		default:
			return state;

	}
}
