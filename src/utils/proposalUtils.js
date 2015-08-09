export function getStatusIcon (status) {
	switch (status) {
		case "created": return "draft";
		case "sent": return "sent";
		case "viewed": return "viewed";
		case "accepted": return "accepted";
		case "rejected": return "rejected";
		default: return "draft";
	}
}
