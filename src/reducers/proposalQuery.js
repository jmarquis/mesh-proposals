export function proposalQuery (state = "", action) {
	switch (action.type) {

		case "SEARCH_PROPOSALS":
			return action.query;

		default:
			return state;

	}
}
