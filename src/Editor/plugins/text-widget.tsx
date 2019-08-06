// @ts-ignore
import {EmptyModel, Model, Widget} from "./core";
import * as React from "react";

interface Props {
    value: string,
}
export class TextWidget implements Widget<Props> {
    private model: Model<Props> = EmptyModel;
    render(): any {
        return <span>{this.model.prop.value}</span>
    }

    init(model: Model<Props>): void {
        this.model = model;
    }
}