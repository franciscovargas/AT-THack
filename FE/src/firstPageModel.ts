import * as Rx from "rxjs";
import * as _ from "lodash";

import { FirstPageDataSource, FirstPageDataSourceImpl } from "./firstPageDataSource";
import { RxModel } from "./utils/rxComponent";

export interface FirstPageState {
    numOfClasses: number;
};

export class FirstPageModel implements RxModel<FirstPageState> {
    private numOfClasses$ = new Rx.BehaviorSubject<number>(2);
    public state$: Rx.Observable<FirstPageState>;

    constructor(dataSource: FirstPageDataSource = new FirstPageDataSourceImpl()) {
        this.state$ = dataSource.getData().map((rawData: _.Dictionary<number[]>) => {
            let numOfClasses = _.size(_.keys(rawData));
            let selectedKeys = [] as string[];
            let dataToRender = {};
            return {
                numOfClasses,
                data: rawData,
                selectedKeys, 
                dataToRender
            };
        }).combineLatest(this.numOfClasses$, (state: FirstPageState, n: number) => {
            return _.assign({}, state, { numOfClasses: n });
        });
    }

    public changeNumOfClasses = (n: number) => {
        this.numOfClasses$.next(n);
    }
}
