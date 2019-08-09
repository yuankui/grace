import {Widget, WidgetConfig, WidgetProp} from "./core";
import * as React from "react";
import {ReactNode} from "react";

interface Comment {
    time: string,
    name: string,
    content: string,
}

interface Props {
    children: Array<WidgetConfig>,
    comments: Array<Comment>,
    expand: boolean,
}

export class CommentWidget extends Widget<Props, any> {
    private readonly children: React.ReactElement<any, string | React.JSXElementConstructor<any>>[];


    constructor(props: WidgetProp<Props>, context: any) {
        super(props, context);
        this.children = props.props.children.map((c, i) => props.factory(c, i));
    }

    render(): ReactNode {
        return <span style={{
            fontStyle: 'italic',
            cursor: 'crosshair'
        }}>{this.children}</span>
    }
}