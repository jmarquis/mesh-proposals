import Firebase from "firebase";

export const firebaseRef = new Firebase("https://mesh-proposals-dev.firebaseio.com");

if (!firebaseRef.getAuth()) {
	firebaseRef.authWithPassword({
		email: "jeremy@knapsackcreative.com",
		password: "123456789"
	}, (error, authData) => {
		if (error) {
			console.log("Login failed!", error);
		} else {
			console.log("Successful auth:" + authData);
		}
	});
} else {
	console.log("Already authenticated");
}

export function whenAuthenticated (callback) {
	if (firebaseRef.getAuth()) {
		console.log("immediate");
		callback();
	} else {
		console.log("queueing");
		let authCallback = (authData) => {
			if (authData) {
				callback();
				firebaseRef.offAuth(authCallback);
			}
		};
		firebaseRef.onAuth(authCallback);
	}
}


const initQueue = [];

whenAuthenticated(() => {
	console.log("initializing");
	initQueue.forEach((initializer) => initializer());
});

export function initializeWhenConnected (actions) {
	if (!firebaseRef.getAuth()) {
		initQueue.push(actions.initialize);
	} else {
		actions.initialize();
	}
}
