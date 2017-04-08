import * as Rx from "rxjs";
import * as _ from "lodash";

export interface SecondPageDataSource {
    getData: () => Rx.Observable<_.Dictionary<number[]>>;
};

export class SecondPageDataSourceImpl implements SecondPageDataSource {
    public getData = () => {
        return Rx.Observable.of({
            "gyro_1": [1, 2, 3, 2, 2, 1],
            "gyro_2": [2, 2, 2, 2, 2, 2],
            "gyro_3": [0, 0, 1, 1, 2, 2],
            "acc_1": [1, 1, 1, 3, 2, 1],
            "acc_2": [4, 3, 2, 0, 0, 0]
        });
    };
}
