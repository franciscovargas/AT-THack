import * as React from "react";
import * as _ from "lodash";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { NumericInput, Checkbox } from "@blueprintjs/core";

import { RxComponent } from "./utils/rxComponent"
import { FirstPageModel, FirstPageState } from "./firstPageModel"

const MAX_CLASSES=5;
const COLORS = ["#1F4B99", "#6C9FA1", "#FFE39F", "#D88742", "#9E2B0E"];

export class FirstPage extends RxComponent<FirstPageState, FirstPageModel> {
    public render(){
        return (
            <div>
                <h1>Page One</h1>
                {this.renderNumOfClasses()}
                {this.renderChart()}
            </div>
        );
    }

    public componentDidMount() {
        this.props.model.toggleChecked("gyro_1");
    }
    private renderNumOfClasses = () => {
        let onValueChange = (n: number) => {
            this.props.model.changeNumOfClasses(n);
        }
        let labelInputs = _.map(_.range(this.state.numOfClasses), (i: number) => (
            <input key={i} className="pt-input" dir="auto" placeholder={`Class ${i+1}`} />
        ));
        return (
            <div className="num-of-classes-container pt-elevation-1">
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

    private renderChart() {
        return (
            <div className="chart">
                <h2>Choose important sensors</h2>
                {this.renderCheckboxes()}
                {this.renderLineChart()}
            </div>
        );
    }

    private renderCheckboxes() {
        let checkBoxes = _.map(_.keys(this.state.data), (key: string) => {
            let onChange = () => {
                this.props.model.toggleChecked(key); // TODO create
            }
            return <Checkbox className="checkbox" key={key} checked={_.includes(this.state.selectedKeys, key)} label={key} onChange={onChange} />;
        });
        return (
            <div className="checkbox-container">
                {checkBoxes}  
            </div>
        );
    }

    private renderLineChart() {
        // TODO - hack
        let data = _.range((_.values(this.state.data)[0]).length).map(
            (n: number) => ({timestamp: n})
        );

        _.forOwn(this.state.dataToRender, (values: number[], key: string) => {
            _.forEach(values, (val, i) => {
                data[i][key] = val;
            });
        });
        
        let lines = _.map(this.state.selectedKeys, (key: string, i: number) =>
            <Line type="monotone" key={key} dataKey={key} stroke={COLORS[i]} />
        );

        console.log(lines);

        return (
          <LineChart width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
               <XAxis dataKey="timestamp"/>
               <YAxis/>
               <CartesianGrid strokeDasharray="3 3"/>
               <Tooltip/>
               <Legend />
               {lines}
          </LineChart>  
        );
        
    }
    // private renderImportantSeries() {

    // }
}