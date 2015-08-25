import React from "react";
import $ from "jquery";
import Quill from "quill";

export default class HtmlSection extends React.Component {

	componentDidMount () {

		this.editor = new Quill($(this.refs.editor).get(0), {
			styles: false,
			readOnly: !this.props.editing,
			formats: [
				"bold",
				"italic",
				"bullet",
				"link",
				"list"
			]
		});

		this.editor.on("text-change", (delta, source) => {
			if (source === "user") {
				this.props.onChange(this.editor.getHTML());
			}
		});

	}

	componentDidUpdate () {
		if (this.props.editing) {
			this.editor.editor.enable();
		} else {
			this.editor.editor.disable();
		}
	}

	render () {
		return (
			<section className="HtmlSection">
				<div ref="editor" dangerouslySetInnerHTML={{__html: this.props.data.html}}/>
			</section>
		);
	}

}
