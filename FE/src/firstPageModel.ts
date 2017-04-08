import * as Rx from "rxjs";
import * as _ from "lodash";

import { FirstPageDataSource, FirstPageDataSourceImpl } from "./firstPageDataSource";
import { RxModel } from "./utils/rxComponent";

export interface FirstPageState {
    numOfClasses: number;
    data: _.Dictionary<number[]>;
    selectedKeys: string[];
    dataToRender: _.Dictionary<number[]>;
};

export class FirstPageModel implements RxModel<FirstPageState> {
    private numOfClasses$ = new Rx.BehaviorSubject<number>(0);
    public state$: Rx.Observable<FirstPageState>;

    constructor(dataSource: FirstPageDataSource = new FirstPageDataSourceImpl()) {
        this.state$ = dataSource.getData().map((rawData: _.Dictionary<number[]>) => {
            let numOfClasses = _.size(_.keys(rawData));
            let selectedKeys = [_.keys(rawData)[0], _.keys(rawData)[1]]; // TODO
            let dataToRender = _.pick(rawData, selectedKeys);
            return {
                numOfClasses,
                data: rawData,
                selectedKeys, 
                dataToRender
            };
        }).combineLatest(this.numOfClasses$, (state: FirstPageState, n: number) => {
            return _.assign({}, state, { numOfClasses: n });
        }).do(s => console.log(s.numOfClasses));

    }

    public changeNumOfClasses = (n: number) => {
        console.log("Putting: " + n);
        this.numOfClasses$.next(n);
    }
}
