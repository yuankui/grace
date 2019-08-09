import {Widget, WidgetConfig, WidgetProp} from "./core";
import * as React from "react";
import {ReactNode} from "react";

interface Comment {
    time: string,
    name: string,
    content: string,
}

interface Props extends WidgetProp{
    children: Array<WidgetConfig>,
    comments: Array<Comment>,
    expand: boolean,
}

export class CommentWidget extends Widget<Props, any>{
    private readonly children: React.ReactElement<any, string | React.JSXElementConstructor<any>>[];

    constructor(props: Props, context: any) {
        super(props, context);
        this.children = props.children.map(c => props.factory(c));
    }

    render(): ReactNode {
        return <span style={{
            fontStyle: 'italic',
            cursor: 'crosshair'
        }}>{this.children}</span>
    }
}