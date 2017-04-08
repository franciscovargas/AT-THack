import * as Rx from "rxjs";
import * as _ from "lodash";

export interface SecondPageDataSource {
    getData: () => Rx.Observable<_.Dictionary<number[]>>;
};

export class SecondPageDataSourceImpl implements SecondPageDataSource {
    public getData = () => {
        return Rx.Observable.of({
            "Accelerometer A": [1, 1, 90, 1, 1, 1, -1, -2, -50, 0, 0],
            "Accelerometer B": [5, 1, 50, 6, 7, 8,  8, 10, -10, 2, 1],
            "Heartbeat": [70, 70, 10, 0, 0, 5, 10, 10, 50, 70, 70],
            "Gyroscope 1": [5, 6, 2, 5, 7, 3, 4, 8, 9, 4, 5],
            "Gyroscope 2": [-1, 0, 3, 5, -3, 4, 6, 7, 1, -1, 5]
        });
    };
}
