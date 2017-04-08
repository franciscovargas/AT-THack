import "es6-shim";
import "./app.less"

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as _ from "lodash";

import { Router, Route, hashHistory } from "react-router";
import { FirstPage } from "./firstPage";
import { FirstPageModel } from "./firstPageModel";
import { SecondPage } from "./secondPage";
import { SecondPageModel } from "./secondPageModel"
import { ThirdPage } from "./thirdPage";
import { ThirdPageModel } from "./thirdPageModel"
import { Container } from "./container";

let appElement = document.createElement("div");
appElement.id = "app";
document.body.appendChild(appElement);

const names = ["First", "Second", "Third"];
const linkNames = ["", "second-page", "third-page"];

function wrapInContainer(element: JSX.Element, index: number) {
    let component: any = React.createClass({
        render: () => {
            let relevantNames = _.take(names, index + 1);
            let relevantLinkNames = _.take(linkNames, index + 1);
            let nextPage = (index === names.length - 1) ? "" : linkNames[index + 1];
            return (
                <Container nextPage={nextPage} names={relevantNames} linkNames={relevantLinkNames}>
                    {element}
                </Container>
            );
        }
    });
    return component;
}

ReactDOM.render((
    <Router history={hashHistory}>
        <Route
            path="/"
            component={wrapInContainer(<FirstPage model={new FirstPageModel()}/>, 0)}
        />
        <Route
            path="/second-page"
            component={wrapInContainer(<SecondPage model={new SecondPageModel()}/>, 1)}
        />
        <Route
            path="/third-page"
            component={wrapInContainer(<ThirdPage model={new ThirdPageModel()}/>, 2)}
        />
    </Router>),
    document.getElementById('app')
);
