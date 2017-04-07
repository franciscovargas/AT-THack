import "./tooltip.less";

import * as React from "react";

export interface ITooltipProps {
    text: string;
    x: number;
    y: number;
    visible: boolean;
}

const TOOLTIP_OFFSET = 20;

export class Tooltip extends React.Component<ITooltipProps, {}> {
    public render() {
        let tooltipStyle = {
            top: (this.props.y + TOOLTIP_OFFSET) + "px",
            left: (this.props.x + TOOLTIP_OFFSET) + "px"
        };
        return (this.props.visible)
            ? <div className="tooltip"
                   style={tooltipStyle} >
                   {this.props.text}
                   </div>
            : null;
    }
}