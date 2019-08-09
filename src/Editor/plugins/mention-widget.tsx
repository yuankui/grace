import {Widget} from "./core";
import * as React from "react";
import {ReactNode} from "react";

interface Props {
    id: string,
    name: string,
}

export class MentionWidget extends Widget<Props, any> {

    render(): ReactNode {
        return <span className='mention-plugin'>@{this.props.props.name}({this.props.props.id})</span>
    }
}