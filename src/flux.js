import postal from "postal";

export function store (channelName) {
	const channel = postal.channel(channelName);
	return (StoreClass) => {

		StoreClass.prototype._channel = channelName;

		// for the store to listen for action dispatches
		StoreClass.prototype.listen = function (eventName, callback) {
			channel.subscribe(eventName, (data) => callback(data));
		};

		StoreClass.prototype._changeHandlers = [];

		// for components to listen for store changes
		StoreClass.prototype.addChangeHandler = function (handler) {
			this._changeHandlers.push(handler);
		};

		StoreClass.prototype.emitChange = function () {
			this._changeHandlers.forEach((handler) => handler());
		};

	};
}

export function actions (channelName) {
	const channel = postal.channel(channelName);
	return (ActionsClass) => {

		ActionsClass.prototype.dispatch = function (eventName, data) {
			channel.publish(eventName, data);
		};

	};
}
