import {ReactNode} from "react";

export interface Model {
    type: string;
    prop: any;
    children?: Array<Model>;
}

export interface Widget {
    init(model: Model): void;
    render(): ReactNode;
}

