import {Widget, WidgetProp} from "./core";
import * as React from "react";
import {ReactNode} from "react";

interface Props extends WidgetProp {
    id: string,
    name: string,
}

export class MentionWidget extends Widget<Props, any> {

    render(): ReactNode {
        return <span style={{
            padding: 2,
            background: 'purple',
            borderRadius: 5,
        }}>{this.props.name}({this.props.id})</span>
    }
}