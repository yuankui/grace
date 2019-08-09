import {Widget, WidgetProp} from "./core";
import * as React from "react";
import {ReactNode} from "react";

interface Props extends WidgetProp {
    id: string,
    name: string,
}

export class MentionWidget extends Widget<Props, any> {

    render(): ReactNode {
        return <span className='mention-plugin'>@{this.props.name}({this.props.id})</span>
    }
}