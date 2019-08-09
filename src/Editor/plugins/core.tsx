import {Component} from "react";
import {WidgetFactory} from "./factory";
export interface WidgetConfig {
    type: string,
    props: object,
}
export interface WidgetProp {
    factory: WidgetFactory,
    [other:string]: any,
}

export class Widget<P extends WidgetProp, S> extends Component<P, S> {

}

