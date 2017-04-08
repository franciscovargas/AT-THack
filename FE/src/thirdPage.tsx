import * as React from "react";
import "../res/FCNN.png";
import "../res/CNN.png";
import "../res/LSTM.png";
import "../res/SLSTM.png";

import { Spinner } from "@blueprintjs/core";
import { RxComponent } from "./utils/rxComponent";
import { ThirdPageModel, ThirdPageState } from "./thirdPageModel";
import { Tab2, Tabs2 } from "@blueprintjs/core";

export class ThirdPage extends RxComponent<ThirdPageState, ThirdPageModel> {
    public render() {
        let onTrainingClick = (_: any) => { 
          if (this.state.status === "UNTRAINED" || this.state.status === "TRAINED") {
            this.props.model.trainingStarted();
          } else {
            this.props.model.trainingAborted();
          }
        }
        let intent = "pt-intent-primary";
        let icon = ""
        let trainButtonText = "Train";
        if (this.state.status === "TRAINING") {
          intent = "pt-intent-danger";
          trainButtonText = "Abort Training";
        } else if (this.state.status === "TRAINED") {
            intent = "pt-intent-primary";
            trainButtonText = "Re-train";
            icon="pt-icon-refresh";
        }

        let onFinished = (_: any) => {
          return;
        };
        let finishButtonStatus = (this.state.status === "TRAINED") ? "" : "pt-disabled";
        return (
            <div>
               <h2>Choose the model</h2>
               <p className="ui-text">
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper, tellus et accumsan faucibus, justo metus facilisis libero, sit amet mollis enim enim imperdiet libero. Aliquam mollis velit eget est tincidunt mattis. Suspendisse ultrices mollis odio eget aliquet. Duis et dapibus metus, quis dignissim est. Pellentesque a pretium magna. Phasellus interdum mi facilisis orci suscipit, consectetur condimentum purus ultrices. Cras purus ligula, fermentum sed turpis vel, cursus porta ante. Duis rhoncus ipsum eros, eget convallis metus blandit sit amet. Nullam vitae risus facilisis, ultricies diam vitae, feugiat elit. Sed tincidunt lectus nec convallis sodales.
               </p>
               <Tabs2 id="foo" onChange={()=>{return}}>
                  <Tab2 id="FCNN"  className="strong" title="Fully Connected Neural Network"   panel={this.generateFCNNDescription()} />
                  <Tab2 id="CNN"   className="strong" title="Convolutional Neural Network" panel={this.generateCNNDescription()} />
                  <Tab2 id="LSTM"  className="strong" title="LSTM" panel={this.generateLSTMDescription()} />
                  <Tab2 id="SLSTM" className="strong" title="Stacked LSTM" panel={this.generateSLSTMDescription()} />
                  <Tab2 id="Advanced" className="strong" title="Advanced" panel={this.renderAdvancedPanel()} />
              </Tabs2>
              <a className={`train-button pt-button ${intent} ${icon}`} onClick={onTrainingClick}>{trainButtonText}</a>
              <a className={`finish-button pt-button pt-intent-success ${finishButtonStatus}`} onClick={onFinished}>Save Model To Application And Exit</a>
          </div>  
        );
    }

    private generateFCNNDescription() {
      let content = (this.state.status === "TRAINING")
        ? <div className="spinner">
            <Spinner className="pt-large" />
          </div>
        : <p className="pt-ui-text-large normal">
          The most general neural network architecture. In each layer every neuron is connected to all neurons in the previous layer, and each connection has it's own weight.
It makes no assumptions about the features in the data which makes it able to approximate any function, however it can get quite expensive in terms of used memory and computation.
        </p>;
      return (
        <div className="description">
          <div className="content">
            <h3>Stacked LSTM</h3>
            {content}
            </div>
          <img className="shift-right" src="../res/FCNN.png" />
        </div>
       );
    }

    private generateCNNDescription() {
      let content = (this.state.status === "TRAINING")
        ? <div className="spinner">
            <Spinner className="pt-large" />
          </div>
        : <p className="pt-ui-text-large normal">
          In a convolutional layer each neuron is only connected to a few nearby neurons in the previous layer, and the same set of weights is used for every neuron. This connection pattern makes sense for cases where we are looking for specific patterns or shapes in the time series data.
        </p>;
      return (
        <div className="description">
          <div className="content">
            <h3>Stacked LSTM</h3>
            {content}
            </div>
          <img className="shift-right" src="../res/CNN.png" />
        </div>
       );
    }

    private generateLSTMDescription() {
      let content = (this.state.status === "TRAINING")
        ? <div className="spinner">
            <Spinner className="pt-large" />
          </div>
        : <p className="pt-ui-text-large normal">
          LSTMs are a kind of recurrent neural networks, which are good at discovering long-term relationships in time series. This is enabled by being able to use longer window sizes, which would be unfeasible in the fully connected networks due to a very large number of weights.
        </p>;
      return (
        <div className="description">
          <div className="content">
            <h3>Stacked LSTM</h3>
            {content}
            </div>
          <img className="shift-right" src="../res/LSTM.png" />
        </div>
       );
    }

    private generateSLSTMDescription() {
      let content = (this.state.status === "TRAINING")
        ? <div className="spinner">
            <Spinner className="pt-large" />
          </div>
        : <p className="pt-ui-text-large normal">
        Stacked LSTMs are similar to LSTMs in principle but are able to find more complex relationships in data. Because of that, they will take slightly longer to optimize.
        </p>;
      return (
        <div className="description">
          <div className="content">
            <h3>Stacked LSTM</h3>
            {content}
            </div>
          <img className="shift-right" src="../res/SLSTM.png" />
        </div>
      );
    }

    private renderAdvancedPanel() {
      let content = (this.state.status === "TRAINING")
      ? <div className="spinner">
          <Spinner className="pt-large" />
        </div>
      : <textarea rows={8} cols={200} className="font-code">Write your code here...</textarea>
      return (
        <div>
          <h3>Advanced</h3>
          <p className="pt-ui-text-large normal">Write your own classifier using <a target="_blank" href="https://www.tensorflow.org/get_started/tflearn">Tensorflow high level api</a>.</p> 
          <div>
          </div>
          <span className="pt-ui-text-large normal">Example: </span>
          <code> estimator = DNNClassifier(feature_columns=[sparse_feature_a_emb, sparse_feature_b_emb],hidden_units=[1024, 512, 256]) </code>
          <div className="description">
            {content}
          </div>
        </div>
      );
    }
}