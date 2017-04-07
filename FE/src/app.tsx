import "es6-shim";
import "./app.less"
import "./graph/renderer.less"

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, hashHistory } from "react-router"
import { ConfigPage } from "./configPage.tsx"

// import { Renderer } from "./graph/renderer";
// import { graph } from "./rx/vizObservable";

let appElement = document.createElement("div");
appElement.id = "app";
document.body.appendChild(appElement);

// ReactDOM.render((
//     <Renderer model={graph} />
// ), appElement);


// class ConfigPage extends React.Component<{}, {}> {
//     render(){
//         return <h1>Hi</h1>;
//     }
// }

ReactDOM.render((
    <Router history={hashHistory}>
    <Route path="/" component={ConfigPage}/>
  </Router>
    ),document.getElementById('app')
);
