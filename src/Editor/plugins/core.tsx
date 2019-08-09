import {Component} from "react";
import {WidgetFactory} from "./factory";

export interface WidgetProps<P> {
    onChange?: ChangeCallback<WidgetValue<P>>,
    key?: number
    value: WidgetValue<P>,
    factory: WidgetFactory,
}

/**
 * P: params
 */
export interface WidgetValue<P> {
    type: string,
    params: P,
}

export interface ChangeCallback<V> {
    (v: V): void,
}

export class Widget<P, S> extends Component<WidgetProps<P>, S> {

}

