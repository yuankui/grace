import * as React from "react";
import {ReactNode} from "react";
import {Widget} from "./core";

interface Props{
    value: string,
}
export class TextWidget extends Widget<Props, any> {

    render(): ReactNode {
        return <span>{this.props.props.value}</span>
    }
}