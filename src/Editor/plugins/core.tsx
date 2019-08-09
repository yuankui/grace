import {Component} from "react";
import {WidgetFactory} from "./factory";
export interface WidgetConfig {
    type: string,
    props: object,
}

interface ChangeCallback<V> {
    (v: V): void,
}
export interface WidgetProp<V> {
    factory: WidgetFactory,
    props: V
    onChange?: ChangeCallback<V>,
}

export class Widget<V, S> extends Component<WidgetProp<V>, S> {

}

