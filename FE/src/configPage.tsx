import * as React from "react";
import { Link } from "react-router";

import { RxComponent } from "./utils/rxComponent"
import { ConfigPageModel, ConfigPageState } from "./configPageModel"

export class ConfigPage extends RxComponent<ConfigPageState, ConfigPageModel> {
    public render(){
        return (
            <div>
                {this.renderTable()}
                <Link to="/page-two">Next</Link>
            </div>
        );
    }

    private renderTable() {
        return (
            <table className="pt-table pt-striped">
                <thead>
                    <th>Input Variable</th>
                </thead>
                <tbody>
                    <tr>
                        <td>Gyro X</td>
                    </tr>
                    <tr>
                        <td>Gyro Y</td>
                    </tr>
                    <tr>
                        <td>Gyro Z</td>
                    </tr>
                    <tr>
                        <td>Accelerometer X</td>
                    </tr>
                    <tr>
                        <td>Accelerometer Y</td>
                    </tr>
                    <tr>
                        <td>Accelerometer Z</td>
                    </tr>
                    <tr>
                        <td>{this.state.x}</td>
                    </tr>                          
                </tbody>
            </table>
        );
    }
}