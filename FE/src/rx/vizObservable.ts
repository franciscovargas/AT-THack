import * as _ from 'lodash';

import { Graph } from "../graph/graph";
import { Node } from "../graph/node";
import { Observable as RxObservable, Subscription } from 'rxjs/Rx';

export class Observable<T> {
    public readonly observable: RxObservable<T>

    constructor(public readonly node: Node, observable: RxObservable<T>) {
        this.observable = observable.do(
            value => this.node.setValue(value),
            error => this.node.setError(error),
            () => this.node.setCompleted());
    }

    // Static interface

    public static of<T>(...values: T[]): Observable<T> {
        return new Observable(createNode("of"), RxObservable.of(...values));
    }

    public static interval(period: number): Observable<number> {
        return new Observable(createNode("interval"), RxObservable.interval(period));
    }

    public static combineLatest<T>(...observables: Observable<T>[]): Observable<T[]> {
        let node = createNode("combineLatest", observables);
        let rxObservables = observables.map(obs => obs.observable);
        return new Observable(node, RxObservable.combineLatest(...rxObservables));
    }

    // Instance interface

    public map<U>(mappingFn: (value: T) => U): Observable<U> {
        return new Observable(this.node.createChild("map"), this.observable.map(mappingFn));
    }

    public scan<U>(accumulator: (acc: U, value: T, index: number) => U, seed?: U): Observable<U> {
        return new Observable(this.node.createChild("scan"), this.observable.scan(accumulator, seed));
    }

    public startWith(...values: T[]): Observable<T> {
        return new Observable(this.node.createChild("startWith"), this.observable.startWith(...values));
    }

    public flatMap<U>(fn: (value: T) => Observable<U>): Observable<U> {
        let flatMapNode = this.node.createChild("flatMap");
        return new Observable(flatMapNode, this.observable.flatMap((value => {
            let newObservable = fn(value);
            flatMapNode.setParents(_.concat([this.node], newObservable.node));
            return newObservable.observable;
        })))
    }

    public subscribe(onNext: (value: T) => void,
                     onError?: (error: any) => void,
                     onCompleted?: () => void): Subscription {
        return this.observable.subscribe(onNext, onError, onCompleted);
    }

    public name(name: string): Observable<T> {
        this.node.setName(name);
        return this;
    }
}

function createNode<T>(operation: string, observables: Observable<T>[] = []) {
    return graph.createNode(operation, ...observables.map(obs => obs.node.uuid))
}

export let graph = new Graph();
