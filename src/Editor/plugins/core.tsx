import {ReactNode} from "react";

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
    init(model: Model<P>): void;
    render(): ReactNode;
}

