// @ts-ignore
import {EmptyModel, Model, Widget} from "./core";
import * as React from "react";
import {WidgetFactory} from "./factory";

interface Props {
    value: string,
}
export class TextWidget implements Widget<Props> {
    private model: Model<Props> = EmptyModel;
    init(model: Model<any>, factory: WidgetFactory): void {
        this.model = model;
    }

    render(): any {
        console.log(this.model.prop.value);
        return <span>{this.model.prop.value}</span>
    }
}