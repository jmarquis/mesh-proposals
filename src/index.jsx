import "./styles/externals";
import "./styles/base";
import "./styles/text";

import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Router, Route, Redirect } from "react-router";
import HashHistory from "react-router/lib/HashHistory";
import { reduxRouteComponent, routerStateReducer } from "redux-react-router";
import thunk from "redux-thunk";
import logger from "redux-logger";

import * as reducers from "./reducers";

const combinedReducers = combineReducers({
	router: routerStateReducer,
	...reducers
});

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

const store = createStoreWithMiddleware(combinedReducers);
const RouteComponent = reduxRouteComponent(store);

import App from "./components/App";
import Proposals from "./components/Proposals";
import Proposal from "./components/Proposal";

ReactDOM.render((
	<Router history={(new HashHistory())}>
		<Route component={RouteComponent}>
			<Route component={App}>
				<Route path="proposals" component={Proposals}>
					<Route path=":proposalId" component={Proposal}/>
				</Route>
			</Route>
			<Redirect from="*" to="proposals"/>
		</Route>
	</Router>
), document.getElementById("root"));
