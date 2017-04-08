import * as Rx from "rxjs";

import { RxModel } from "./utils/rxComponent";

export interface ThirdPageState {
    numOfClasses: number;
};

export class ThirdPageModel implements RxModel<ThirdPageState> {
    private numOfClasses$ = new Rx.BehaviorSubject<number>(2);
    public state$: Rx.Observable<ThirdPageState>;

    constructor() {
        this.state$ = this.numOfClasses$.map(n => ({ numOfClasses: n }));
    }

    public changeNumOfClasses = (n: number) => {
        this.numOfClasses$.next(n);
    }
}
