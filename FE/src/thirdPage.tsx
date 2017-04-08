import * as React from "react";
// import * as _ from "lodash";

import { RxComponent } from "./utils/rxComponent";
import { ThirdPageModel, ThirdPageState } from "./thirdPageModel";
import { Tab2, Tabs2 } from "@blueprintjs/core";

export class ThirdPage extends RxComponent<ThirdPageState, ThirdPageModel> {
    public render() {
        
        return (
            <div className="pt-elevation-1">
               <h2>Choose the model</h2>
               <p className="ui-text">
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper, tellus et accumsan faucibus, justo metus facilisis libero, sit amet mollis enim enim imperdiet libero. Aliquam mollis velit eget est tincidunt mattis. Suspendisse ultrices mollis odio eget aliquet. Duis et dapibus metus, quis dignissim est. Pellentesque a pretium magna. Phasellus interdum mi facilisis orci suscipit, consectetur condimentum purus ultrices. Cras purus ligula, fermentum sed turpis vel, cursus porta ante. Duis rhoncus ipsum eros, eget convallis metus blandit sit amet. Nullam vitae risus facilisis, ultricies diam vitae, feugiat elit. Sed tincidunt lectus nec convallis sodales.
               </p>
               <Tabs2 id="foo" className="pt-elevation-2" onChange={()=>{return}}>
                  <Tab2 id="FCNN" title="Fully Connected Neural Network" panel={this.generateFCNNDescription()} />
                  <Tab2 id="CNN" title="Convolutional Neural Network" panel={this.generateCNNDescription()} />
                  <Tab2 id="LSTM" title="Long Short Term Memory (LSTM)" panel={this.generateLSTMDescription()} />
                  <Tab2 id="SLSTM" title="Stacked LSTM" panel={this.generateSLSTMDescription()} />
                  <Tabs2.Expander />
              </Tabs2>
          </div>  
        );
    }

    private generateFCNNDescription() {
      return (
        <div>
          FCNN
        </div>
      );
    }

    private generateCNNDescription() {
      return (
        <div>
          CNN
        </div>
      );
    }

    private generateLSTMDescription() {
      return (
        <div>
          LSTM
        </div>
      );
    }

    private generateSLSTMDescription() {
      return (
        <div>
          SLSTM
        </div>
      );
    }
}