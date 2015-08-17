import "./styles/externals";
import "./styles/base";
import "./styles/text";
import "./styles/components/App";

import React from "react";
import ReactDOM from "react-dom";

import Router, { Route, Redirect } from "react-router";
import HashHistory from "react-router/lib/HashHistory";

import MainMenu from "./components/MainMenu";
import Proposals from "./components/Proposals";
import Proposal from "./components/Proposal";

export default class App extends React.Component {

	render () {
		return (
			<div className="App">
				<MainMenu/>
				{this.props.children}
			</div>
		);
	}

}

ReactDOM.render((
	<Router history={(new HashHistory())}>
		<Route component={App}>
			<Route path="proposals" component={Proposals}>
				<Route path=":proposalId" component={Proposal}/>
			</Route>
		</Route>
		<Redirect from="*" to="proposals"/>
	</Router>
), document.getElementById("root"));
