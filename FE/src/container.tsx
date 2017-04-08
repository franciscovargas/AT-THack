import * as React from "react";
import * as _ from "lodash";

import { Link } from "react-router";

export interface ContainerProps {
  names: string[];
  linkNames: string[];
  nextPage: string;
}

export class Container extends React.Component<ContainerProps, {}> {
    public render(){
        return (
            <div className="container">
                {this.renderHeader()}
                {this.renderNavigationBar()}
                {this.renderBody()}
            </div>
        );
    }                

    private renderHeader() {
      return (
        <div className="header">
          HEADER
        </div>
      );
    }

    private renderNavigationBar() {
      let nextLink = (this.props.nextPage === "")
        ? null
        : <Link to={`/${this.props.nextPage}`} className="next-button pt-button pt-intent-primary">Next</Link>; 
      return (
        <div className="navigation_bar pt-elevation-0">
          <div className="navigation_bar_content">
            <div>
              <ul className="pt-breadcrumbs">
                {this.renderBreadCrumbs()}
              </ul>
            </div>
            {nextLink}
          </div>
        </div>
      );
    }

    private renderBreadCrumbs() { 
      return _.map(this.props.names, (name: string, i: number) => {
        let current: string = (i === this.props.names  .length - 1) ? "pt-breadcrumb-current" : "";
        return (
          <li key={name}>
            <Link to={`/${this.props.linkNames[i]}`} className="pt-breadcrumb">
              <a className={`pt-breadcrumb ${current}`}>
                {name}
              </a>
            </Link>
          </li>
        );
      });
    }

    private renderBody() {
      return (
        <div className="body pt-elevation-0">
          <div className="content">
              {this.props.children}
          </div>
        </div>
      );
    }
}