import "es6-shim";
import "./app.less"
import "./graph/renderer.less"

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import { ConfigPage } from "./configPage";
import { ConfigPageModel } from "./configPageModel";
import { PageTwo } from "./pageTwo";

let appElement = document.createElement("div");
appElement.id = "app";
document.body.appendChild(appElement);

class Home extends React.Component<{},{}> {
    public render() {
        return (
            <ConfigPage model={new ConfigPageModel()} />
        );
    }   
}

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={Home}/>
        <Route path="/page-two" component={PageTwo} />
    </Router>),
    document.getElementById('app')
);
