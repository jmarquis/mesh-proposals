import React from "react";
import { DragSource, DropTarget } from "react-dnd";

import Icon from "./Icon";
import trashIcon from "../icons/trash.svg";

@DragSource("section-list-item", {
	beginDrag (props) {
		return {
			sectionId: props.sectionId
		};
	}
}, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}))
@DropTarget("section-list-item", {
	drop (props, monitor) {
		console.log("DROPPED", monitor.getItem());
		console.log("ONTO", props);
		props.onDrop(monitor.getItem().sectionId, props.sectionId);
	}
}, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver()
}))
export default class SectionListItem extends React.Component {

	render () {

		const { connectDragSource, connectDropTarget, isOver, isDragging } = this.props;

		return connectDragSource(connectDropTarget(
			<li className={"SectionListItem" + (isOver ? " is-over" : "") + (isDragging ? " is-dragging" : "")}>
				<a className="delete" onClick={this.deleteSection}><Icon svg={trashIcon}/></a>
				<a className="title">{this.props.title}</a>
			</li>
		));

	}

	deleteSection = () => {
		this.props.onDelete(this.props.sectionId);
	}

}
