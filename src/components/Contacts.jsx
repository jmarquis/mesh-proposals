import React from "react";

import ContactStore from "../stores/ContactStore";
import ContactActions from "../actions/ContactActions";

export default class Contacts extends React.Component {

	constructor (props) {
		super(props);
		this.state = ContactStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount () {
		ContactStore.listen(this.onChange);
	}

	componentWillUnmount () {
		ContactStore.unlisten(this.onChange);
	}

	onChange (state) {
		this.setState(state);
	}

	render () {
		console.log(this.state);
		return (
			<div>
				<h1>Contacts</h1>
				<ul>
					{Object.keys(this.state.contacts).map((contactId) => {
						return (
							<li key={contactId}>{this.state.contacts[contactId].name}</li>
						);
					})}
				</ul>
			</div>
		);
	}
}
