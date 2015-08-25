import { store } from "../flux";

@store("view")
class ViewStore {

	constructor () {
		this.editMode = false;
		this.listen("toggleEditMode", (editMode) => this.toggleEditMode(editMode));
	}

	toggleEditMode = (editMode) => {
		this.editMode = !!editMode;
		this.emitChange();
	}

}

export default new ViewStore();
