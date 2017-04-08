import * as React from "react";
import * as _ from "lodash";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Checkbox } from "@blueprintjs/core";

import { RxComponent } from "./utils/rxComponent"
import { SecondPageModel, SecondPageState } from "./secondPageModel"

const COLORS = ["#1F4B99", "#6C9FA1", "#FFE39F", "#D88742", "#9E2B0E"];

export class SecondPage extends RxComponent<SecondPageState, SecondPageModel> {
    public render() {
        return (
            <div className="chart">
                <h2>Choose important sensors</h2>
                <p className="ui-text">
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper, tellus et accumsan faucibus, justo metus facilisis libero, sit amet mollis enim enim imperdiet libero. Aliquam mollis velit eget est tincidunt mattis. Suspendisse ultrices mollis odio eget aliquet. Duis et dapibus metus, quis dignissim est. Pellentesque a pretium magna. Phasellus interdum mi facilisis orci suscipit, consectetur condimentum purus ultrices. Cras purus ligula, fermentum sed turpis vel, cursus porta ante. Duis rhoncus ipsum eros, eget convallis metus blandit sit amet. Nullam vitae risus facilisis, ultricies diam vitae, feugiat elit. Sed tincidunt lectus nec convallis sodales.
                </p>
                {this.renderCheckboxes()}
                {this.renderLineChart()}
            </div>
        );
    }

    public componentDidMount() {
        this.props.model.toggleChecked("gyro_1");
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
}