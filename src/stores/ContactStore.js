import alt from "../alt";

import ContactActions from "../actions/ContactActions";

class ContactStore {

	constructor () {
		this.contacts = [];

		this.bindListeners({
			handleUpdateContacts: ContactActions.UPDATE_CONTACTS
		});
	}

	handleUpdateContacts (contacts) {
		this.contacts = contacts;
	}

}

export default alt.createStore(ContactStore, "ContactStore");
