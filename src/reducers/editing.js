export function editing (state = false, action) {
	switch (action.type) {

		case "TOGGLE_EDITING":
			return action.editing;

		default:
			return state;

	}
}
