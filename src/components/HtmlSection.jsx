import React from "react";
import $ from "jquery";
import { ProseMirror } from "prosemirror/src/edit";

import AddSection from "./AddSection";

export default class HtmlSection extends React.Component {

	componentDidMount () {
		this.initialize();
		if (this.props.editing) {
			this.editor.focus();
		}
	}

	componentDidUpdate () {
		this.initialize();
	}

	initialize = () => {
		if (this.props.editing && !this.editor) {

			this.editor = new ProseMirror({
				place: this.refs.editor,
				doc: this.props.data.html || "",
				docFormat: "html"
			});

			this.editor.on("change", this.handleChange);

		} else if (!this.props.editing && this.editor) {
			this.editor.off("change", this.handleChange);
			this.handleChange();
		 	delete this.editor;
		}
	}

	render () {
		return (
			<section className="HtmlSection">
				{ this.props.editing ? <div ref="editor" className="editor"></div> : <div dangerouslySetInnerHTML={{__html: this.props.data.html}} className="contents"></div> }
				<AddSection editing={this.props.editing} addSection={this.props.addSection}/>
			</section>
		);
	}

	handleChange = () => {
		this.props.onChange(this.editor.getContent("html"));
	}

}
