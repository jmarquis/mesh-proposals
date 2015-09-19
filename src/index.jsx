import "./styles/externals";
import "./styles/base";
import "./styles/text";
import "./styles/patterns/disabled";

import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Router, Route, Redirect } from "react-router";
import createHistory from "history/lib/createBrowserHistory";
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import { Provider } from "react-redux";
import { ReduxRouter, routerStateReducer, reduxReactRouter } from "redux-router";

import * as reducers from "./reducers";

const combinedReducers = combineReducers({
	router: routerStateReducer,
	...reducers
});

const logger = createLogger({
	level: "info",
	collapsed: true
});

const store = compose(
	applyMiddleware(thunk, logger),
	reduxReactRouter({ createHistory })
)(createStore)(combinedReducers);

import App from "./components/App";
import Proposals from "./components/Proposals";
import Proposal from "./components/Proposal";

ReactDOM.render((
	<Provider store={store}>
		<ReduxRouter>
			<Route component={App}>
				<Route path="proposals" component={Proposals}>
					<Route path=":proposalId" component={Proposal}/>
				</Route>
			</Route>
			<Redirect from="*" to="/proposals"/>
		</ReduxRouter>
	</Provider>
), document.getElementById("root"));
