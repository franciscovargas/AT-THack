import * as dagre from "dagre";
import * as _ from 'lodash'
import { NodeId } from "./node";
import {GraphSnapshot} from "./graph";

export interface LayoutNode {
    id: NodeId;
    x: number;
    y: number;
}

export interface LayoutEdge {
    source: NodeId;
    target: NodeId;
}

export class Layout {
    private readonly layoutGraph = new dagre.graphlib.Graph();

    constructor() {
        this.layoutGraph.setGraph({});
        this.layoutGraph.setDefaultEdgeLabel(() => ({}));
    }

    public onCreateNode(child: NodeId, parentIds: NodeId[]) {
        this.layoutGraph.setNode(child, { id: child });
        parentIds.forEach(parent => {
            this.layoutGraph.setEdge(parent, child, {
                source: parent,
                target: child
            });
        });
        dagre.layout(this.layoutGraph);
    }

    public nodes(): LayoutNode[] {
        return this.layoutGraph.nodes().map(node => this.layoutGraph.node(node) as LayoutNode);
    }

    public edges(): LayoutEdge[] {
        return this.layoutGraph.edges().map(edge => this.layoutGraph.edge(edge) as LayoutEdge);
    }

    public static from(snapshot: GraphSnapshot): Layout {
        let layout = new Layout();
        _.forEach(snapshot.parents, (parentIds, node: NodeId) => {
            layout.onCreateNode(node, parentIds);
        });
        return layout;
    }
}
