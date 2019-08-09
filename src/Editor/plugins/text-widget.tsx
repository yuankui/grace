import * as React from "react";
import {ReactNode} from "react";
import {Widget, WidgetProp} from "./core";

interface Props extends WidgetProp{
    value: string,
}
export class TextWidget extends Widget<Props, any> {

    render(): ReactNode {
        return <span>{this.props.value}</span>
    }
}