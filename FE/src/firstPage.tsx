import * as React from "react";
import * as _ from "lodash";

import { NumericInput } from "@blueprintjs/core";

import { RxComponent } from "./utils/rxComponent"
import { FirstPageModel, FirstPageState } from "./firstPageModel"

const MAX_CLASSES=5;

export class FirstPage extends RxComponent<FirstPageState, FirstPageModel> {
    public render(){
        return (
            <div>
                <h1>Page One</h1>
                {this.renderNumOfClasses()}
            </div>
        );
    }

    private renderNumOfClasses = () => {
        let onValueChange = (n: number) => {
            this.props.model.changeNumOfClasses(n);
        }
        let labelInputs = _.map(_.range(this.state.numOfClasses), (i: number) => (
            <input key={i} className="pt-input" dir="auto" placeholder={`Class ${i+1}`} />
        ));
        return (
            <div className="num-of-classes-container pt-elevation-0">
               <h2>Select number of classes</h2>
               <div className="pt-ui-text-large "><strong></strong></div>
               <NumericInput
                    min={0}
                    max={MAX_CLASSES}
                    minorStepSize={1}
                    value={this.state.numOfClasses}
                    onValueChange={onValueChange}
                />
            <div>
                {labelInputs}
            </div>
          </div>  
        );

    }
}