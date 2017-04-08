import * as _ from "lodash";
import { Node, NodeId, NodeState } from "./node";
import { Layout } from "./layout";

import { Observable, Subject } from "rxjs/Rx";

export interface GraphState {
    snapshots: GraphSnapshot[];
    index: number
}

export interface GraphSnapshot {
    nodes: _.Dictionary<NodeState>;
    children: _.Dictionary<NodeId[]>;
    parents: _.Dictionary<NodeId[]>;
    layout: Layout;
}

type GraphSnapshotUpdate = (snapshot: GraphSnapshot) => void;

const EMPTY_STATE: GraphState = {
    snapshots: [],
    index: -1
}

const EMPTY_SNAPSHOT: GraphSnapshot = {
    nodes: {},
    children: {},
    parents: {},
    layout: new Layout()
}

type SnapshotIndexUpdate = (index: number) => number;

export class Graph {
    private liveOrReplay$ = new Subject<SnapshotIndexUpdate>();
    private snapshotIndex$: Observable<GraphState>;
    private readonly updateEvents$ = new Subject<GraphSnapshotUpdate>();
    public readonly state$: Observable<GraphState>;

    constructor() {
        this.snapshotIndex$ = Observable.interval(1000)
            .map(() => this.incrementIfNonNegative)
            .merge(this.liveOrReplay$)
            .scan((index: number, update: SnapshotIndexUpdate) => update(index), -1)
            .map((index: number) => ({ index }));

        this.state$ = this.updateEvents$
            .scan(this.reduceSnapshot, EMPTY_SNAPSHOT)
            .scan(this.reduceState, EMPTY_STATE)
            .combineLatest(Observable.interval(10), (state) => state)
            .merge(this.snapshotIndex$)
            .scan(_.assign, {})
            .startWith(EMPTY_STATE);
    }

    public live(): void {
        this.liveOrReplay$.next(_.constant(-1));
    }

    public replay(): void {
        this.liveOrReplay$.next(_.constant(0));
    }

    public back(): void {
        this.liveOrReplay$.next(this.decrementIfNonNegative);
    }

    public next(): void {
        this.liveOrReplay$.next(this.incrementIfNonNegative);
    }

    private incrementIfNonNegative(index: number) {
        return (index < 0) ? index : index + 1;
    }

    private decrementIfNonNegative(index: number) {
        return (index < 0) ? index : index - 1;
    }

    public createNode(operation: string, ...parentIds: NodeId[]): Node {
        let child = new Node(this);
        this.updateEvents$.next(snapshot => {
            parentIds.forEach(parentId => {
                let children = _.get(snapshot.children, parentId, <NodeId[]>[]);
                children.push(child.uuid);
                snapshot.children[parentId] = children;
            });
            snapshot.parents[child.uuid] = parentIds;
            snapshot.nodes[child.uuid] = Node.createState(operation);
        });
        return child;
    }

    public updateNode(uuid: NodeId, partialState: NodeState) {
        this.updateEvents$.next(snapshot => {
            _.assign(snapshot.nodes[uuid], partialState);
        });
    }

    public setParents(uuid: NodeId, parentIds: NodeId[]) {
        this.updateEvents$.next(snapshot => {
            let previouslyChildrenOf = snapshot.children[uuid];
            snapshot.parents[uuid] = parentIds;
            _.each(previouslyChildrenOf, previousChildOf => {
                snapshot.children[previousChildOf] = _.without(snapshot.children[previousChildOf], uuid);
            });
        });
    }

    private readonly reduceSnapshot = (snapshot: GraphSnapshot, update: GraphSnapshotUpdate): GraphSnapshot => {
        let copy = _.cloneDeep(snapshot);
        update(copy);
        copy.layout = Layout.from(copy);
        return copy;
    };

    private readonly reduceState = (state: GraphState, snapshot: GraphSnapshot): GraphState => {
        return <GraphState> {snapshots: _.concat(state.snapshots, snapshot)};
    }

}
