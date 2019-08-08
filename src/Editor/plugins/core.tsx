import {Component} from "react";
import {WidgetFactory} from "./factory";

export interface WidgetProp {
    factory: WidgetFactory,
    type: string,
}

export abstract class Widget<P extends WidgetProp, S> extends Component<P, S> {

}

