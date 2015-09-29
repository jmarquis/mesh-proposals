import React from "react";
import $ from "jquery";
import { ProseMirror } from "prosemirror/src/edit";

import AddSection from "./AddSection";

export default class HtmlSection extends React.Component {

	constructor () {
		super();
		this.state = {
			title: ""
		};
	}

	componentDidMount () {
		this.initialize();
		if (this.props.editing) {
			this.refs.titleField.focus();
		}
		this.setState({ title: this.props.data.title });
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
		const { html } = this.props.data;
		const { editing, addSection } = this.props;
		const { title } = this.state;
		return (
			<section className="HtmlSection">
				<div className="contents">
					<h2>
						{ editing ? <input type="text" ref="titleField" value={title} placeholder="Section Title" onChange={this.setTitle}/> : title }
					</h2>
					{ editing ? <div ref="editor" className="editor"></div> : <div dangerouslySetInnerHTML={{__html: html}} className="html"></div> }
				</div>
				<AddSection editing={editing} addSection={addSection}/>
			</section>
		);
	}

	setTitle = (event) => {
		this.setState({ title: event.target.value });
		this.handleChange(event.target.value);
	}

	handleChange = (title = this.state.title) => {
		this.props.onChange({
			type: "html",
			title: title || "",
			html: this.editor.getContent("html") || ""
		});
	}

}
