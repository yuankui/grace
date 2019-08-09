import {Widget, WidgetConfig, WidgetProp} from "./core";
import * as React from "react";
import {ReactNode} from "react";

interface Props extends WidgetProp {
    href: string,
    children: Array<WidgetConfig>
}

export class LinkWidget extends Widget<Props, any>{
    private readonly children: React.ReactElement<any, string | React.JSXElementConstructor<any>>[];

    constructor(props: Props, context: any) {
        super(props, context);
        this.children = props.children.map((c) => props.factory(c));
    }

    render(): ReactNode {
        return <a href={this.props.href}>{this.children}</a>
    }
}