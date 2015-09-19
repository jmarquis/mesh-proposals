export function sectionUpdating (state = false, action) {
	switch (action.type) {

		case "TOGGLE_SECTION_UPDATING":
			return action.updating;

		default:
			return state;

	}
}
