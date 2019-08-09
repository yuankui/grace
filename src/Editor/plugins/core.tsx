import {Component} from "react";
import {WidgetFactory} from "./factory";


export interface Selection {
    widget?: Widget<any, any>,
    range: any,
}

export interface WidgetProps<P> {
    onChange?: ChangeCallback<WidgetValue<P>>,
    key?: number
    value: WidgetValue<P>,
    parent?: Widget<any, any>,
    factory: WidgetFactory,
}



/**
 * P: params
 */
export interface WidgetValue<P> {
    type: string,
    params: P,
    selection: Selection|null,
}

export interface ChangeCallback<V> {
    (v: V): void,
}

export class Widget<P, S> extends Component<WidgetProps<P>, S> {

}

