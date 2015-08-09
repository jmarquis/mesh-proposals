import moment from "moment";

export const timestampFormat = "YYYY-MM-DDTHH:mm:ssZ";

export function getRelativeDateTime (timestamp) {
	return moment(timestamp).calendar(null, {
		sameDay: "LT",
		lastDay: "MMM D",
		lastWeek: "MMM D",
		sameElse: "MMM D"
	});
}

export function getLatestRecord (records) {
	if (!records) return null;
	return records[getLatestTimestamp(records)];
}

export function getLatestTimestamp (records) {
	if (!records) return null;
	let keys = Object.keys(records);
	return keys.sort()[keys.length - 1];
}
