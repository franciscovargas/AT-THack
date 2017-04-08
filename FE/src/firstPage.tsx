import * as React from "react";
import * as _ from "lodash";

import { NumericInput } from "@blueprintjs/core";

import { RxComponent } from "./utils/rxComponent"
import { FirstPageModel, FirstPageState } from "./firstPageModel"

const MAX_CLASSES=5;

export class FirstPage extends RxComponent<FirstPageState, FirstPageModel> {
    public render() {
        let onValueChange = (n: number) => {
            this.props.model.changeNumOfClasses(n);
        }
        let labelInputs = _.map(_.range(this.state.numOfClasses), (i: number) => (
            <input key={i} className="label-input pt-input" dir="auto" placeholder={`Class ${i+1}`} />
        ));
        return (
            <div className="num-of-classes-container">
               <h2>Select number of classes</h2>
               <p className="ui-text">
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper, tellus et accumsan faucibus, justo metus facilisis libero, sit amet mollis enim enim imperdiet libero. Aliquam mollis velit eget est tincidunt mattis. Suspendisse ultrices mollis odio eget aliquet. Duis et dapibus metus, quis dignissim est. Pellentesque a pretium magna. Phasellus interdum mi facilisis orci suscipit, consectetur condimentum purus ultrices. Cras purus ligula, fermentum sed turpis vel, cursus porta ante. Duis rhoncus ipsum eros, eget convallis metus blandit sit amet. Nullam vitae risus facilisis, ultricies diam vitae, feugiat elit. Sed tincidunt lectus nec convallis sodales.
               </p>
               <NumericInput
                    className="label-input"
                    min={1}
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