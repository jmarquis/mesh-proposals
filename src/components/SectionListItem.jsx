import React from "react";
import { DragSource, DropTarget } from "react-dnd";

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
			<li className={"SectionListItem" + (isOver ? " is-over" : "") + (isDragging ? " is-dragging" : "")}>{this.props.title}</li>
		));

	}

}
