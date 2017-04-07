import * as chroma from "chroma-js";
import * as _ from "lodash";
import * as React from "react";

import { Spinner } from "@blueprintjs/core"

import { Graph, GraphSnapshot, GraphState } from "./graph";
import { RxComponent } from "../utils/rxComponent";
import { LayoutNode, LayoutEdge } from "./layout";
import { Tooltip } from "./tooltip"
import { NodeId } from "./node"

const HIGHLIGHT_FADE_TIME = 1000;

interface ITooltipState {    
    nodeId: NodeId;
    text: string;
    visible: boolean;
    x: number;
    y: number;
}

export class Renderer extends RxComponent<GraphState, Graph> {
    private sigma: SigmaJs.Sigma;
    private tooltip: ITooltipState = { nodeId: "", text: "", x: 0, y: 0, visible: false };
    private nodePopovers: JSX.Element[] = [];
    private nodePopoverValues: _.Dictionary<ITooltipState> = {};
    private numOfSnapshotToReplay = 1;

    public render() {
        this.layout();
        return (
            <div>
                <Spinner />
                <div className="line">Line</div>
            </div>
        );
    }

    private getSnapshotToRender() {
        if (this.state.index < 0) {
            return _.last(this.state.snapshots);
        } else {
            let index = this.state.index % this.numOfSnapshotToReplay;
            return this.state.snapshots[index];
        }
    }

    private layout() {
        let snapshot = this.getSnapshotToRender();
        if (!snapshot || !this.sigma) {
            return;
        }
        let layout = snapshot.layout;
        this.sigma.graph.clear();
        layout.nodes().forEach(this.renderNode(snapshot));
        layout.edges().forEach(this.renderEdge(snapshot));
        this.setupEvents();
        if (!_.isEmpty(this.tooltip.nodeId)) {
            this.setTooltipText(this.tooltip.nodeId);
        }
        this.sigma.refresh();
        this.nodePopovers = _.map(_.values(this.nodePopoverValues), (tooltipState: ITooltipState) => {
            let value = JSON.stringify(this.getSnapshotToRender().nodes[tooltipState.nodeId].value, null, 2);
            return <Tooltip key={tooltipState.nodeId}
                            text={value}
                            visible={true}
                            x={tooltipState.x}
                            y={tooltipState.y} />;
        });
    }

    private setupEvents() {
        this.sigma.bind('overNode', (e) => {
            this.setTooltipText(e.data.node.id);
            this.tooltip.x = e.data.node["renderer1:x"];
            this.tooltip.y = e.data.node["renderer1:y"];
            this.tooltip.visible = true;
        });
        this.sigma.bind('outNode', () => {
            this.tooltip.nodeId = "";
            this.tooltip.text = "";
            this.tooltip.visible = false;
        });
        this.sigma.bind('clickNode', (e) => {
            if (!_.has(this.nodePopoverValues, e.data.node.id)) {
                this.nodePopoverValues[e.data.node.id] = {
                    nodeId: e.data.node.id,
                    text: JSON.stringify(this.getSnapshotToRender().nodes[e.data.node.id].value, null, 2),
                    visible: true,
                    x: e.data.node["renderer1:x"],
                    y: e.data.node["renderer1:y"]
                }
            }
        });
        this.sigma.bind('rightClickNode', (e) => {
            if (_.has(this.nodePopoverValues, e.data.node.id)) {
                delete this.nodePopoverValues[e.data.node.id];
            }
        });
    }

    private setTooltipText(nodeId: NodeId) {
        this.tooltip.nodeId = nodeId;
        let node = this.getSnapshotToRender().nodes[nodeId];
        this.tooltip.text = JSON.stringify(node.value, null, 2);
    }

    private renderNode(snapshot: GraphSnapshot) {
        return (layoutNode: LayoutNode) => {
            let {id} = layoutNode;
            let nodeState = snapshot.nodes[id];
            this.sigma.graph.addNode({
                id,
                size: 1,
                label: nodeState.name,
                x: layoutNode.x,
                y: layoutNode.y,
                color: getColor(nodeState.lastUpdated)
            });
        };
    }

    private renderEdge(snapshot: GraphSnapshot) {
        return (layoutEdge: LayoutEdge) => {
            let {source, target} = layoutEdge;
            let sourceState = snapshot.nodes[source];
            let targetState = snapshot.nodes[source];
            this.sigma.graph.addEdge({
                id: `${source} -> ${target}`,
                source: source,
                target: target,
                size: 1,
                color: getColor(Math.max(sourceState.lastUpdated, targetState.lastUpdated))
            });
        };
    }
}

function getColor(lastUpdate: number): string {
    let elapsed = new Date().getTime() - lastUpdate;
    let frac = Math.min(elapsed, HIGHLIGHT_FADE_TIME) / HIGHLIGHT_FADE_TIME;
    let lower = Math.cbrt(-.5);
    let upper = Math.cbrt(.5);
    let eased = (Math.cbrt(frac - .5) - lower) / (upper - lower);
    return chroma.mix("#00B3A4", "#CED9E0", eased).hex();
}
