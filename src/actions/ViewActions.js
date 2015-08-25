import { actions } from "../flux";

@actions("view")
class ViewActions {

	setEditState (editState) {
		this.dispatch("setEditState", editState);
	}

}

export default new ViewActions();
