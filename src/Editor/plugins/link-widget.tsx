import {Widget, WidgetConfig, WidgetProp} from "./core";
import * as React from "react";
import {ReactNode} from "react";

interface Props {
    href: string,
    children: Array<WidgetConfig>
}

export class LinkWidget extends Widget<Props, any>{
    private readonly children: React.ReactElement<any, string | React.JSXElementConstructor<any>>[];


    constructor(props: WidgetProp<Props>, context: any) {
        super(props, context);
        this.children = props.props.children.map((c,i) => props.factory(c, i));
    }

    render(): ReactNode {
        return <a href={this.props.props.href}>{this.children}</a>
    }
}