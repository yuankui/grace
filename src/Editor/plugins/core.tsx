import {ReactNode} from "react";
import {WidgetFactory} from "./factory";

export interface Model<P> {
    type: string;
    prop: P;
    children?: Array<Model<any>>;
}

export let EmptyModel: Model<any> = {
    type: "empty",
    prop: null,
};

export interface Widget<P> {
    init(model: Model<P>, factory: WidgetFactory): void;
    render(): ReactNode;
}

