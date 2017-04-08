import * as React from "react";
import "../res/FCNN.png";
import "../res/CNN.png";
import "../res/LSTM.png";
import "../res/SLSTM.png";

import { NonIdealState } from "@blueprintjs/core";

import { RxComponent } from "./utils/rxComponent";
import { ThirdPageModel, ThirdPageState } from "./thirdPageModel";
import { Tab2, Tabs2 } from "@blueprintjs/core";

export class ThirdPage extends RxComponent<ThirdPageState, ThirdPageModel> {
    public render() {
        
        return (
            <div>
               <h2>Choose the model</h2>
               <p className="ui-text">
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper, tellus et accumsan faucibus, justo metus facilisis libero, sit amet mollis enim enim imperdiet libero. Aliquam mollis velit eget est tincidunt mattis. Suspendisse ultrices mollis odio eget aliquet. Duis et dapibus metus, quis dignissim est. Pellentesque a pretium magna. Phasellus interdum mi facilisis orci suscipit, consectetur condimentum purus ultrices. Cras purus ligula, fermentum sed turpis vel, cursus porta ante. Duis rhoncus ipsum eros, eget convallis metus blandit sit amet. Nullam vitae risus facilisis, ultricies diam vitae, feugiat elit. Sed tincidunt lectus nec convallis sodales.
               </p>
               <Tabs2 id="foo" onChange={()=>{return}}>
                  <Tab2 id="FCNN"  className="strong" title="Fully Connected Neural Network" panel={this.generateFCNNDescription()} />
                  <Tab2 id="CNN"   className="strong"title="Convolutional Neural Network" panel={this.generateCNNDescription()} />
                  <Tab2 id="LSTM"  className="strong"title="Long Short Term Memory (LSTM)" panel={this.generateLSTMDescription()} />
                  <Tab2 id="SLSTM" className="strong"title="Stacked LSTM" panel={this.generateSLSTMDescription()} />
                  <Tab2 id="Advanced" className="strong" title="Advanced" panel={this.generateSLSTMDescription()} />
              </Tabs2>
          </div>  
        );
    }

    private generateFCNNDescription() {
      return (
        <div className="description">
          <h3>Fully Connected Neural Network (FC-NN)</h3>
          <div><NonIdealState title="Missing Info" description="Something missing" /></div>
          <img className="shift-right" src="../res/FCNN.png" />
        </div>
      );
    }

    private generateCNNDescription() {
      return (
        <div className="description">
          <h3>Convolutional Neural Network (CNN)</h3>
          <div><NonIdealState title="Missing Info" description="Something missing" /></div>
          <img className="shift-right" src="../res/CNN.png" />
        </div>
      );
    }

    private generateLSTMDescription() {
      return (
        <div className="description">
          <h3>Long Short Term Memory (LSTM) Network</h3>
          <div><NonIdealState title="Missing Info" description="Something missing" /></div>
          <img className="shift-right" src="../res/LSTM.png" />
        </div>
      );
    }

    private generateSLSTMDescription() {
      return (
        <div className="description">
          <h3>Stacked Long Short Term Memory (LSTM) Network</h3>
          <div><NonIdealState title="Missing Info" description="Something missing" /></div>
          <img className="shift-right" src="../res/SLSTM.png" />
        </div>
      );
    }
}