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
    private toggledKeys$ = new Rx.Subject<string>();
    private numOfClasses$ = new Rx.BehaviorSubject<number>(0);
    public state$: Rx.Observable<FirstPageState>;

    constructor(dataSource: FirstPageDataSource = new FirstPageDataSourceImpl()) {
        let selectedKeys$ = this.toggledKeys$.scan((acc: string[], key: string) => {
            if (_.includes(acc, key)) {
                return _.pull(acc, key);
            } else {
                return _.concat(acc, [key]);
            }
        }, []).startWith([]);

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
        }).combineLatest(selectedKeys$, (state: FirstPageState, selectedKeys: string[]) => {
             return _.assign({}, state, { selectedKeys, dataToRender: _.pick(state.data, selectedKeys) });
        });
    }

    public toggleChecked(key: string) {
        this.toggledKeys$.next(key);
    }
    public changeNumOfClasses = (n: number) => {
        this.numOfClasses$.next(n);
    }
}
