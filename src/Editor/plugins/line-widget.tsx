import {Widget, WidgetConfig, WidgetProp} from "./core";
import * as React from "react";
import {ReactNode} from "react";

interface Props {
    children: Array<WidgetConfig>,
}

export class LineWidget extends Widget<Props, any> {
    private readonly children: React.ReactElement<any, string | React.JSXElementConstructor<any>>[];


    constructor(props: WidgetProp<Props>, context: any) {
        super(props, context);
        this.children = props.props.children.map((c, i) => props.factory(c, i));
    }

    render(): ReactNode {
        return <div>
            {this.children}
        </div>
    }
}