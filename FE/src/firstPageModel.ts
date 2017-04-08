import * as Rx from "rxjs";

import { RxModel } from "./utils/rxComponent";

export interface FirstPageState {
    numOfClasses: number;
};

export class FirstPageModel implements RxModel<FirstPageState> {
    private numOfClasses$ = new Rx.BehaviorSubject<number>(2);
    public state$: Rx.Observable<FirstPageState>;

    constructor() {
        this.state$ = this.numOfClasses$.map(n => ({ numOfClasses: n }));
    }

    public changeNumOfClasses = (n: number) => {
        this.numOfClasses$.next(n);
    }
}
