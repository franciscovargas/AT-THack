import * as Rx from "rxjs";
import * as _ from "lodash";

export interface FirstPageDataSource {
    getData: () => Rx.Observable<_.Dictionary<number[]>>;
};

export class FirstPageDataSourceImpl implements FirstPageDataSource {
    public getData = () => {
        return Rx.Observable.of({
            "gyro_1": [1, 2, 3, 2, 2, 1],
            "gyro_2": [2, 2, 2, 2, 2, 2],
            "gyro_3": [2, 2, 2, 2, 2, 2],
            "acc_1": [2, 2, 2, 2, 2, 2],
            "acc_2": [2, 2, 2, 2, 2, 2]
        });
    };
}
