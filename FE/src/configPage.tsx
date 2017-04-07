import * as React from "react";

export class ConfigPage extends React.Component<{}, {}> {
    public render(){
        return (
            <div>
                {this.renderTable()}
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
                </tbody>
            </table>
        );
    }
}