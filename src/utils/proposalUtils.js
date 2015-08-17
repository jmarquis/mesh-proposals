import draftIcon from "../icons/draft.svg";
import sentIcon from "../icons/sent.svg";
import viewedIcon from "../icons/viewed.svg";
import acceptedIcon from "../icons/accepted.svg";
import rejectedIcon from "../icons/rejected.svg";

export function getStatusIcon (status) {
	switch (status) {
		case "created": return draftIcon;
		case "sent": return sentIcon;
		case "viewed": return viewedIcon;
		case "accepted": return acceptedIcon;
		case "rejected": return rejectedIcon;
		default: return draftIcon;
	}
}
