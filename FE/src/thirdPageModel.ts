import * as Rx from "rxjs";

import { RxModel } from "./utils/rxComponent";

export type Status = "UNTRAINED" | "TRAINING" | "TRAINED";

export interface ThirdPageState {
    status: Status;
};

export class ThirdPageModel implements RxModel<ThirdPageState> {
    private status$ = new Rx.BehaviorSubject<Status>("UNTRAINED");
    public state$: Rx.Observable<ThirdPageState>;

    constructor() {
        this.state$ = this.status$.map(s => ({ status: s }));
    }

    public trainingStarted = () => {
        this.status$.next("TRAINING");
        setTimeout(this.trainingFinished, 2000);
    }

    public trainingAborted = () => {
        this.status$.next("UNTRAINED");
    }

    public trainingFinished = () => {
        this.status$.next("TRAINED");
    }
}
