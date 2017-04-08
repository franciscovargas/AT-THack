import * as Rx from "rxjs";
import * as _ from "lodash";

import { SecondPageDataSource, SecondPageDataSourceImpl } from "./secondPageDataSource";
import { RxModel } from "./utils/rxComponent";

export interface SecondPageState {
    numOfClasses: number;
    data: _.Dictionary<number[]>;
    selectedKeys: string[];
    dataToRender: _.Dictionary<number[]>;
};

export class SecondPageModel implements RxModel<SecondPageState> {
    private toggledKeys$ = new Rx.Subject<string>();
    public state$: Rx.Observable<SecondPageState>;

    constructor(dataSource: SecondPageDataSource = new SecondPageDataSourceImpl()) {
        let selectedKeys$ = this.toggledKeys$.scan((acc: string[], key: string) => {
            if (_.includes(acc, key)) {
                return _.pull(acc, key);
            } else {
                return _.concat(acc, [key]);
            }
        }, []).startWith([]);

        this.state$ = dataSource.getData().map((rawData: _.Dictionary<number[]>) => {
            let selectedKeys = [] as string[];
            let dataToRender = {};
            return {
                data: rawData,
                selectedKeys, 
                dataToRender
            };
        }).combineLatest(selectedKeys$, (state: SecondPageState, selectedKeys: string[]) => {
             return _.assign({}, state, { selectedKeys, dataToRender: _.pick(state.data, selectedKeys) });
        });
    }

    public toggleChecked(key: string) {
        this.toggledKeys$.next(key);
    }
}
