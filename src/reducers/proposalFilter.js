export function proposalFilter (state = "all", action) {
	switch (action.type) {

		case "FILTER_PROPOSALS":
			return action.filter;

		default:
			return state;

	}
}
