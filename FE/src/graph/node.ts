import * as _ from 'lodash';

import { generateUuid } from "../utils/uuidGenerator";
import { Graph } from "./graph";

export type NodeId = string;

export type NodeValueState = "empty" | "value" | "error" | "completed";

export interface NodeState {
    name: string;
    operation: string;
    state: NodeValueState;
    value: any;
    lastUpdated: number;
}

export class Node {
    public readonly uuid: NodeId = generateUuid();

    constructor(private readonly graph: Graph) {}

    public static createState(operation: string): NodeState {
        return {
            name: "",
            operation,
            state: "empty",
            value: undefined,
            lastUpdated: new Date().getTime()
        };
    }

    public createChild(operation: string): Node {
        return this.graph.createNode(operation, this.uuid);
    }

    public setName(name: string): void {
        this.graph.updateNode(this.uuid, <NodeState>{name});
    }

    public setParents(nodes: Node[]){
        this.graph.setParents(this.uuid, _.map(nodes, node => node.uuid));
    }

    public setValue(value: any): void {
        this.graph.updateNode(this.uuid, <NodeState>{
            state: "value",
            value,
            lastUpdated: new Date().getTime()
        });
    }

    public setError(value: any): void {
        this.graph.updateNode(this.uuid, <NodeState>{
            state: "error",
            value,
            lastUpdated: new Date().getTime()
        });
    }

    public setCompleted(): void {
        this.graph.updateNode(this.uuid, <NodeState>{
            state: "completed",
            value: undefined,
            lastUpdated: new Date().getTime()
        });
    }
}
