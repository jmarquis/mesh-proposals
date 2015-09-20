import React from "react";
import $ from "jquery";
import { ProseMirror } from "prosemirror/src/edit";

export default class HtmlSection extends React.Component {

	componentDidMount () {


	}

	componentDidUpdate () {
		if (this.props.editing && !this.editor) {

			this.editor = new ProseMirror({
				place: this.refs.editor,
				doc: this.props.data.html,
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
				{ this.props.editing ? <div ref="editor"></div> : <div dangerouslySetInnerHTML={{__html: this.props.data.html}}></div> }
			</section>
		);
	}

	handleChange = () => {
		this.props.onChange(this.editor.getContent("html"));
	}

}
