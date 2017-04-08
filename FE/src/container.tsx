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
      return (
        <div className="navigation_bar">
          <div className="navigation_bar_content">
            <ul className="pt-breadcrumbs">
              {this.renderBreadCrumbs()}
            </ul>
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
        <div className="body">
          <div className="content">
              {this.props.children}
              <Link to={`/${this.props.nextPage}`} className="next-button pt-button pt-intent-primary">Next</Link>
          </div>
        </div>
      );
    }
}