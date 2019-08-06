import {EmptyModel, Model, Widget} from "./core";
import {ReactNode} from "react";
import * as React from "react";
import {WidgetFactory} from "./factory";

export class LineWidget implements Widget<any> {
    private model: Model<any> = EmptyModel;

    init(model: Model<any>, factory: WidgetFactory): void {
        this.model = model;
    }

    render(): ReactNode {
        return <div>

        </div>
    }
}