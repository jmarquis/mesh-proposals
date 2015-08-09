export class ContactActions {

	constructor (firebaseRef) {
		this.contactsRef = firebaseRef.child("teams/-Jd0gbbGT3SDKtqeTSin/contacts");
		this.contactsRef.on("value", (snapshot) => {
			console.log(snapshot.val());
			this.updateContacts(snapshot.val());
		});
	}

	updateContacts (contacts) {
		this.dispatch(contacts);
	}

}
